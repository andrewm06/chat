"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuoteForm } from "./QuoteForm";
import { MembershipCard } from "./MembershipCard";
import { SchedulePicker } from "./SchedulePicker";
import { LimeLogo } from "../branding/LimeLogo";
import type { QuotePlan, QuoteResponse } from "@/lib/schemas";

const timeSlots = ["09:00", "11:00", "13:00", "15:00"];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type QuoteFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
};

function formatTimeLabel(time: string) {
  if (!time) return "";
  const [hourStr, minute] = time.split(":");
  let hour = Number(hourStr);
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${suffix}`;
}

function nextThirtyDays() {
  const days: { value: string; label: string }[] = [];
  const today = new Date();

  for (let i = 0; i < 30; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const value = date.toISOString().split("T")[0];
    const label = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    days.push({ value, label });
  }

  return days;
}

export function QuoteFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formValues, setFormValues] = useState<QuoteFormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: searchParams.get("address") ?? "",
  });
  const [quoteData, setQuoteData] = useState<QuoteResponse | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const [scheduleDate, setScheduleDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [scheduling, setScheduling] = useState(false);

  const source: "wix_redirect" | "direct" =
    searchParams.get("source") === "wix_redirect" || searchParams.has("address")
      ? "wix_redirect"
      : "direct";

  useEffect(() => {
    const address = searchParams.get("address");
    if (address) {
      setFormValues((prev) => ({ ...prev, address }));
    }
  }, [searchParams]);

  const dateOptions = useMemo(() => nextThirtyDays(), []);

  const selectedPlan: QuotePlan | null =
    quoteData?.quotes.find((plan) => plan.planId === selectedPlanId) ??
    quoteData?.quotes.find((plan) => plan.planId === "quarterly") ??
    null;

  async function fetchQuotes(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuoteError(null);
    setLoadingQuotes(true);
    setQuoteData(null);
    setSelectedPlanId(null);
    setScheduleDate("");
    setTimeSlot("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, source }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.error ?? "Unable to fetch quotes right now.");
      }

      const json = (await response.json()) as QuoteResponse;
      setQuoteData(json);
      const recommended =
        json.quotes.find((q) => q.planId === "quarterly") ??
        json.quotes.find((q) => q.recommended) ??
        json.quotes[0];
      setSelectedPlanId(recommended.planId);
    } catch (error) {
      console.error(error);
      setQuoteError(
        error instanceof Error
          ? error.message
          : "Something went wrong fetching your quote. Please try again.",
      );
    } finally {
      setLoadingQuotes(false);
    }
  }

  function updateFormValues(key: keyof QuoteFormValues, value: string) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSchedule() {
    if (!quoteData || !selectedPlan || !scheduleDate || !timeSlot) {
      setScheduleError("Please select a plan, date, and time to continue.");
      return;
    }

    setScheduleError(null);
    setScheduling(true);

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: quoteData.addressNormalized || formValues.address,
          planId: selectedPlan.planId,
          planName: selectedPlan.planName,
          price: selectedPlan.pricePerVisit,
          currency: quoteData.currency,
          date: scheduleDate,
          timeSlot,
          contact: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phone: formValues.phone,
            email: formValues.email,
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.error ?? "Unable to schedule right now.");
      }

      const scheduled = (await response.json()) as {
        scheduledAt: string;
        planName: string;
        price: number;
        currency: string;
        address: string;
      };

      const params = new URLSearchParams({
        plan: scheduled.planName,
        price: scheduled.price.toString(),
        currency: scheduled.currency,
        address: scheduled.address,
        time: scheduled.scheduledAt,
      });
      router.push(`/success?${params.toString()}`);
    } catch (error) {
      console.error(error);
      setScheduleError(
        error instanceof Error
          ? error.message
          : "We couldn’t schedule that slot. Please try again.",
      );
    } finally {
      setScheduling(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-10">
      <header className="space-y-4 text-center">
        <p className="inline-flex rounded-full bg-lime-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-lime-800 shadow-md">
          Lime Memberships
        </p>
        <h1 className="text-4xl font-black leading-tight text-lime-950 md:text-5xl">
          Save Big With Lime Memberships.
        </h1>
        <p className="text-lg font-semibold text-lime-900/80 md:text-xl">
          Quarterly Cleaning is our most popular pick—best shine, best value, all year long.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.05fr]">
        <QuoteForm
          values={formValues}
          onChange={updateFormValues}
          onSubmit={fetchQuotes}
          loading={loadingQuotes}
          error={quoteError}
        />
        <div className="flex justify-center">
          <LimeLogo />
        </div>
      </div>

      {quoteData ? (
        <section className="space-y-6 rounded-[36px] bg-gradient-to-r from-lime-200 to-lime-50 p-6 shadow-xl ring-2 ring-white/70 md:p-8">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-800">
              Step 2
            </p>
            <h2 className="text-3xl font-black text-lime-950">Choose your Lime plan</h2>
            <p className="text-sm font-semibold text-lime-800/80">
              Quarterly is pre-selected because it saves the most every year.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quoteData.quotes.map((plan) => (
              <MembershipCard
                key={plan.planId}
                plan={plan}
                selected={selectedPlanId === plan.planId}
                onSelect={() => setSelectedPlanId(plan.planId)}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-[28px] bg-white/80 px-6 py-5 text-center text-sm font-semibold text-lime-900 shadow-inner ring-1 ring-white/50">
          Plans will appear once you request your quote.
        </section>
      )}

      {quoteData ? (
        <section className="space-y-5">
          <SchedulePicker
            dates={dateOptions}
            timeSlots={timeSlots.map(formatTimeLabel)}
            selectedDate={scheduleDate}
            selectedTime={formatTimeLabel(timeSlot || "")}
            onDateChange={(value) => setScheduleDate(value)}
            onTimeChange={(displayValue) => {
              const normalized = timeSlots.find((slot) => formatTimeLabel(slot) === displayValue);
              setTimeSlot(normalized ?? "");
            }}
          />

          {scheduleError ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
              {scheduleError}
            </p>
          ) : null}

          <div className="flex flex-col items-center gap-3 text-center">
            {selectedPlan ? (
              <p className="text-sm font-semibold text-lime-900/80">
                Selected plan:{" "}
                <span className="font-black text-lime-950">
                  {selectedPlan.planName} · {formatter.format(selectedPlan.pricePerVisit)} / visit
                </span>
              </p>
            ) : (
              <p className="text-sm font-semibold text-lime-800/80">
                Select a plan to lock in your schedule.
              </p>
            )}
            <button
              type="button"
              onClick={handleSchedule}
              disabled={!selectedPlan || !scheduleDate || !timeSlot || scheduling}
              className="w-full max-w-md rounded-full bg-gradient-to-r from-lime-400 to-lime-500 px-8 py-4 text-base font-extrabold uppercase tracking-[0.18em] text-lime-950 shadow-xl transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {scheduling ? "Scheduling..." : "Schedule Your Cleaning"}
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-800">
              Address: {quoteData.addressNormalized || formValues.address}
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
