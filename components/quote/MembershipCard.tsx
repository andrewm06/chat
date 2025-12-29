import type { QuotePlan } from "@/lib/schemas";

const checkIcon = (
  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
    <circle cx="10" cy="10" r="10" fill="#65d943" />
    <path d="M5 10.5l3 3 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const xIcon = (
  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
    <circle cx="10" cy="10" r="10" fill="#ff5a5f" />
    <path d="M6 6l8 8m0-8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

type Props = {
  plan: QuotePlan;
  selected: boolean;
  onSelect: () => void;
};

const featureOrder = [
  "7 Day Rain Guarantee",
  "Priority Scheduling",
  "Hydrophobic Coating",
  "20% Off Add-On Services",
] as const;

export function MembershipCard({ plan, selected, onSelect }: Props) {
  const isQuarterly = plan.planId === "quarterly";

  return (
    <div
      className={`relative flex h-full flex-col gap-4 rounded-[26px] bg-white px-6 pb-6 pt-7 text-center shadow-xl transition duration-200 ${
        isQuarterly ? "scale-105 lime-glow ring-4 ring-lime-400/70" : "ring-2 ring-white/70"
      } ${selected ? "outline outline-2 outline-lime-500/90" : ""}`}
    >
      {isQuarterly && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 px-4 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-lime-950 shadow-md">
          Most Popular
        </span>
      )}
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-lime-800">
          {plan.planName}
        </p>
        <p className="text-4xl font-black text-lime-900">{plan.headlineDiscountText}</p>
        <p className="text-sm font-semibold text-lime-700">{plan.billingCadenceText}</p>
      </div>
      <div className="space-y-1">
        <p className="text-lg font-bold text-lime-900">
          ${plan.pricePerVisit.toFixed(0)} <span className="text-sm font-semibold text-lime-700">per visit</span>
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-700">
          {plan.planId === "quarterly" ? "Best value • Save the most per year" : "Great shine & flexible cadence"}
        </p>
      </div>
      <div className="space-y-3 rounded-2xl bg-lime-50/60 px-4 py-4 text-left">
        {featureOrder.map((label) => {
          const feature = plan.features.find((f) => f.label === label);
          const included = feature?.included ?? false;

          return (
            <div key={label} className="flex items-center justify-between gap-2 text-sm font-semibold">
              <span className={`text-lime-900 ${included ? "" : "text-lime-700/70"}`}>{label}</span>
              <span aria-label={included ? "Included" : "Not included"}>{included ? checkIcon : xIcon}</span>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onSelect}
        className={`mt-auto rounded-full px-4 py-3 text-sm font-extrabold uppercase tracking-[0.14em] transition ${
          selected
            ? "bg-gradient-to-r from-lime-400 to-lime-500 text-lime-950 shadow-lg"
            : "bg-white text-lime-800 ring-2 ring-lime-200 hover:ring-lime-400"
        }`}
      >
        {selected ? "Selected" : "Select Plan"}
      </button>
    </div>
  );
}
