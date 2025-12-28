import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { calculatePrice } from "@/lib/pricing";
import { ensureUserRecord } from "@/lib/auth";
import { quoteRequestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = quoteRequestSchema.safeParse(json);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { address, windowCount, scheduledDate } = parsed.data;
    const price = calculatePrice(windowCount);

    const { userId } = auth();
    const dbUser = await ensureUserRecord();

    const quote = await prisma.quote.create({
      data: {
        address,
        windowCount,
        price,
        userId: dbUser?.id ?? undefined,
        appointment: scheduledDate
          ? {
              create: {
                scheduledDate,
              },
            }
          : undefined,
      },
      include: {
        appointment: true,
      },
    });

    return NextResponse.json({
      quote: {
        id: quote.id,
        address: quote.address,
        windowCount: quote.windowCount,
        price: quote.price,
        createdAt: quote.createdAt,
      },
      appointment: quote.appointment
        ? {
            id: quote.appointment.id,
            scheduledDate: quote.appointment.scheduledDate,
            status: quote.appointment.status,
          }
        : undefined,
      userId,
    });
  } catch (error) {
    console.error("[QUOTE_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Unable to save quote right now. Please try again." },
      { status: 500 },
    );
  }
}
