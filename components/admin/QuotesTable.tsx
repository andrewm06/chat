import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export type QuoteRow = {
  id: string;
  address: string;
  windowCount: number;
  price: number;
  createdAt: string;
  appointment?: {
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  } | null;
};

export function QuotesTable({ quotes }: { quotes: QuoteRow[] }) {
  if (quotes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
        No quotes yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1.4fr,1fr,1fr,1fr] items-center border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        <span>Address</span>
        <span>Windows</span>
        <span>Price</span>
        <span>Status</span>
      </div>
      <div className="divide-y divide-slate-100">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="grid grid-cols-[1.4fr,1fr,1fr,1fr] items-center px-4 py-4 text-sm text-slate-800"
          >
            <div>
              <p className="font-semibold text-slate-900">{quote.address}</p>
              <p className="text-xs text-slate-500">{format(new Date(quote.createdAt), "PPp")}</p>
            </div>
            <span>{quote.windowCount}</span>
            <span className="font-semibold">${quote.price}</span>
            {quote.appointment ? (
              <Badge variant="default">{quote.appointment.status}</Badge>
            ) : (
              <Badge variant="warning">Not scheduled</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
