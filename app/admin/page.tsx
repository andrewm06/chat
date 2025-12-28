import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { QuotesTable } from "@/components/admin/QuotesTable";
import { Header } from "@/components/layout/Header";
import { AdminAppointments } from "@/components/admin/AdminAppointments";

export default async function AdminPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const dbUser = await prisma.user.findUnique({ where: { id: userId } });
  const isAdmin = user?.privateMetadata?.role === "admin" || dbUser?.role === "ADMIN";

  if (!isAdmin) {
    redirect("/");
  }

  const [quotes, appointments] = await Promise.all([
    prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      include: { appointment: true },
    }),
    prisma.appointment.findMany({
      orderBy: { scheduledDate: "asc" },
      include: {
        quote: true,
      },
    }),
  ]);

  const appointmentItems = appointments.map((appt) => ({
    id: appt.id,
    scheduledDate: appt.scheduledDate.toISOString(),
    status: appt.status,
    quote: {
      address: appt.quote.address,
      price: appt.quote.price,
      windowCount: appt.quote.windowCount,
    },
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Quotes & appointments</h1>
          <p className="mt-2 text-slate-600">
            Track incoming quotes, pricing, and schedules.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
            Quotes
          </h2>
          <QuotesTable quotes={quotes} />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
            Appointments
          </h2>
          <AdminAppointments initialAppointments={appointmentItems} />
        </section>
      </main>
    </div>
  );
}
