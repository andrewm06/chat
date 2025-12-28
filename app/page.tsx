import { Header } from "@/components/layout/Header";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  { title: "Instant pricing", description: "$8 per window with $199 minimum." },
  { title: "Trusted pros", description: "Insured, background-checked technicians." },
  { title: "Flexible scheduling", description: "Pick a time or request later follow-up." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-10">
        <section className="grid items-center gap-10 md:grid-cols-[1.05fr,1fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Window cleaning, simplified
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Get an instant window cleaning quote and schedule in seconds.
            </h1>
            <p className="text-lg text-slate-600">
              Enter your address and window count to see transparent pricing. Book a visit or
              save the quote for later—no phone tag required.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <Card key={item.title} className="bg-white/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-slate-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600">{item.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
          <QuoteForm />
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Pricing</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              ${" "}
              <span className="text-blue-600">8</span>
              <span className="text-sm text-slate-600">/window</span>
            </p>
            <p className="text-sm text-slate-500">Minimum visit: $199</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Coverage</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Greater metro area</p>
            <p className="text-sm text-slate-500">We confirm exact service area after address validation.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Support</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Real humans</p>
            <p className="text-sm text-slate-500">Reschedule or adjust quotes anytime via chat or phone.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
