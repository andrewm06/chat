import { NextResponse } from "next/server";
import { withAddress } from "@/lib/mockQuotes";
import { quoteRequestSchema, quoteResponseSchema } from "@/lib/schemas";

const REQUEST_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const useMockQuotes =
    process.env.USE_MOCK_QUOTES === "true" || !process.env.N8N_QUOTE_WEBHOOK_URL;

  if (useMockQuotes) {
    return NextResponse.json(withAddress(data.address));
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(process.env.N8N_QUOTE_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: data.address,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        source: data.source,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    const json = await response.json();
    const validated = quoteResponseSchema.safeParse(json);

    if (!validated.success) {
      throw new Error("Invalid quote payload from webhook");
    }

    return NextResponse.json(validated.data);
  } catch (error) {
    console.error("Quote webhook error:", error);
    return NextResponse.json(
      {
        error:
          "We hit a snag while fetching live pricing. Please try again, or switch to mock mode with USE_MOCK_QUOTES=true.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
