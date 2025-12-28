import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentStatusSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const parsed = appointmentStatusSchema.safeParse(json);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { appointmentId, status } = parsed.data;

    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
      include: { quote: true },
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("[ADMIN_APPOINTMENT_ERROR]", error);
    return NextResponse.json({ error: "Unable to update appointment" }, { status: 500 });
  }
}
