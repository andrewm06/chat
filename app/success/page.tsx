import Link from "next/link";
import { LimeLogo } from "@/components/branding/LimeLogo";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

function formatCurrency(value: string | undefined, currency: string | undefined) {
  if (!value || !currency) return "—";
  const amount = Number(value);
  if (Number.isNaN(amount)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function SuccessPage({ searchParams }: Props) {
  const plan = typeof searchParams.plan === "string" ? searchParams.plan : "Quarterly Cleaning";
  const address = typeof searchParams.address === "string" ? searchParams.address : "Your address";
  const price = formatCurrency(
    typeof searchParams.price === "string" ? searchParams.price : undefined,
    typeof searchParams.currency === "string" ? searchParams.currency : undefined,
  );
  const scheduledTime =
    typeof searchParams.time === "string" && !Number.isNaN(Date.parse(searchParams.time))
      ? new Date(searchParams.time)
      : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-lime-100/60 via-white to-lime-100/60 px-6 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <div className="space-y-3">
          <p className="inline-flex rounded-full bg-lime-200 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-lime-900">
            You&apos;re booked
          </p>
          <h1 className="text-4xl font-black text-lime-950">Welcome to the Lime family!</h1>
          <p className="text-lg font-semibold text-lime-900/80">
            We locked in your {plan} and will see you soon.
          </p>
        </div>

        <div className="w-full rounded-[28px] bg-white/90 p-6 text-left shadow-xl ring-2 ring-white/70">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-lime-800">Details</h2>
          <dl className="mt-4 grid gap-4 text-lime-950 md:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-700">
                Address
              </dt>
              <dd className="text-base font-bold">{address}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-700">
                Plan
              </dt>
              <dd className="text-base font-bold">{plan}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-700">
                Price per visit
              </dt>
              <dd className="text-base font-bold">{price}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-700">
                Scheduled
              </dt>
              <dd className="text-base font-bold">
                {scheduledTime
                  ? scheduledTime.toLocaleString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "Pending confirmation"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/quote"
            className="rounded-full bg-gradient-to-r from-lime-400 to-lime-500 px-8 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-lime-950 shadow-lg transition hover:scale-[1.01]"
          >
            Back to quotes
          </Link>
          <Link
            href="https://limelx.com"
            className="text-sm font-semibold text-lime-900 underline underline-offset-4"
          >
            Return to limelx.com
          </Link>
        </div>

        <LimeLogo />
      </div>
    </main>
  );
}
