import { NextResponse } from "next/server";
import { scheduleRequestSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = scheduleRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const useMockScheduling = process.env.USE_MOCK_SCHEDULING !== "false";

  // Combine date + time slot into an ISO timestamp for UI display.
  const scheduledAt = new Date(`${data.date}T${data.timeSlot}:00`).toISOString();

  if (useMockScheduling) {
    return NextResponse.json({
      scheduledAt,
      planName: data.planName,
      price: data.price,
      currency: data.currency,
      address: data.address,
    });
  }

  // TODO: Add Google Calendar OAuth + event creation
  // Use GOOGLE_CALENDAR_CLIENT_ID, GOOGLE_CALENDAR_CLIENT_SECRET,
  // GOOGLE_CALENDAR_REDIRECT_URI, and GOOGLE_CALENDAR_ID to authorize and
  // insert events for the selected time slot.
  return NextResponse.json(
    {
      error:
        "Google Calendar integration not configured. Set USE_MOCK_SCHEDULING=true for local testing.",
    },
    { status: 501 },
  );
}
