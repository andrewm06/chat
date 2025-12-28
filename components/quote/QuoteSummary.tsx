import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

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

export function QuoteSummary({ data }: { data: QuoteResponse }) {
  const { quote, appointment } = data;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-emerald-700">
            Quote saved
          </p>
          <p className="text-lg font-semibold text-emerald-900">${quote.price}</p>
        </div>
        <Badge variant="success">ID: {quote.id.slice(0, 8)}</Badge>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <InfoLine label="Address" value={quote.address} />
        <InfoLine label="Windows" value={`${quote.windowCount}`} />
        <InfoLine label="Created" value={format(new Date(quote.createdAt), "PPpp")} />
        {appointment ? (
          <InfoLine
            label="Scheduled"
            value={`${format(new Date(appointment.scheduledDate), "PPpp")} (${appointment.status.toLowerCase()})`}
          />
        ) : (
          <InfoLine label="Schedule" value="Not scheduled yet" />
        )}
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-sm">
      <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
