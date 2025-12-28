"use client";

import { useMemo, useState, useTransition } from "react";
import { formatISO } from "date-fns";
import { calculatePrice, MINIMUM_PRICE, PRICE_PER_WINDOW } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuoteSummary } from "@/components/quote/QuoteSummary";

type QuoteResponse = {
  quote: {
    id: string;
    address: string;
    windowCount: number;
    price: number;
    createdAt: string;
  };
  appointment?: {
    id: string;
    scheduledDate: string;
    status: string;
  };
};

type FormState = {
  address: string;
  windowCount: number;
  scheduledDate?: string;
};

const initialForm: FormState = {
  address: "",
  windowCount: 10,
  scheduledDate: undefined,
};

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  const price = useMemo(() => calculatePrice(form.windowCount), [form.windowCount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: form.address,
            windowCount: form.windowCount,
            scheduledDate: form.scheduledDate
              ? formatISO(new Date(form.scheduledDate))
              : undefined,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error ?? "Unable to save quote. Please try again.");
          return;
        }

        setQuoteResponse(data);
      } catch (submitError) {
        console.error(submitError);
        setError("Something went wrong. Please try again.");
      }
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setQuoteResponse(null);
    setError(null);
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-cyan-50/60" />
      <div className="relative grid gap-10 p-10 md:grid-cols-[1fr,1.1fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Instant quote
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Enter your details to see your price in seconds.
          </h2>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-900">
            <p className="font-medium">Pricing policy</p>
            <ul className="mt-2 space-y-1 text-blue-800">
              <li>${PRICE_PER_WINDOW} per window</li>
              <li>${MINIMUM_PRICE} minimum visit</li>
            </ul>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main Street, Springfield"
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
                required
              />
            </label>
            <label className="space-y-2">
              <Label htmlFor="windows">Number of windows</Label>
              <Input
                id="windows"
                name="windows"
                type="number"
                min={1}
                max={500}
                value={form.windowCount}
                onChange={(event) =>
                  setForm({
                    ...form,
                    windowCount: Number(event.target.value) || 0,
                  })
                }
                required
              />
            </label>
          </div>

          <label className="space-y-2">
            <Label htmlFor="scheduledDate">Schedule (optional)</Label>
            <Input
              id="scheduledDate"
              name="scheduledDate"
              type="datetime-local"
              value={form.scheduledDate ?? ""}
              onChange={(event) =>
                setForm({ ...form, scheduledDate: event.target.value || undefined })
              }
              min={new Date().toISOString().slice(0, 16)}
            />
            <p className="text-xs text-slate-500">
              Pick a preferred date and time. You can always reschedule with us later.
            </p>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Estimated</p>
              <p className="text-2xl font-semibold text-slate-900">${price}</p>
            </div>
            <div className="flex items-center gap-3">
              {quoteResponse && (
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Start over
                </Button>
              )}
              <Button type="submit" size="lg" isLoading={isPending}>
                Save quote
              </Button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          {quoteResponse && <QuoteSummary data={quoteResponse} />}
        </form>
      </div>
    </div>
  );
}
