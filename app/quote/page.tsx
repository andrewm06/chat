import { QuoteFlow } from "@/components/quote/QuoteFlow";

export const revalidate = 0;

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-100/60 via-lime-50 to-lime-100/60">
      <QuoteFlow />
    </div>
  );
}
