# Lime Window Cleaning Quote App

A conversion-focused Next.js (App Router) experience that mirrors the Lime Window Cleaning brand and funnels visitors into the **Quarterly Cleaning** plan. The flow covers quote capture, plan selection, mock scheduling, and a confirmation page—optimized for Wix redirects.

## Features
- **Brand-true UI:** Lime gradients, rounded cards, and Lime Membership cards styled like the Wix site. Quarterly plan is pre-selected and highlighted.
- **Quote flow:** `/quote` accepts an optional `address` query param from Wix. Collects address (required) plus optional first/last name, phone, and email.
- **API-backed pricing:** `POST /api/quote` calls an n8n webhook (configurable) with Zod validation, timeout, and a mock mode.
- **Plan selection:** Bi-Annual, Quarterly (most popular), and Monthly cards with checklist features and clear value framing.
- **Scheduling:** Local mock scheduling for the next 30 days and four time slots. `POST /api/schedule` is ready for future Google Calendar integration.
- **Confirmation:** `/success` summarizes address, plan, price, and scheduled time with a link back to limelx.com.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   # Defaults use mock quotes and mock scheduling
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
4. Open the quote flow:
   ```
   http://localhost:3000/quote
   ```

## Environment variables
`USE_MOCK_QUOTES` and `USE_MOCK_SCHEDULING` are `true` by default for local development.

```
N8N_QUOTE_WEBHOOK_URL=""   # Set for live pricing; leave blank for mock quotes
USE_MOCK_QUOTES=true
USE_MOCK_SCHEDULING=true   # Set to false when Google Calendar is wired
GOOGLE_CALENDAR_CLIENT_ID=""
GOOGLE_CALENDAR_CLIENT_SECRET=""
GOOGLE_CALENDAR_REDIRECT_URI=""
GOOGLE_CALENDAR_ID=""
```

## API routes
- `POST /api/quote` – sends `{ address, firstName?, lastName?, phone?, email?, source }` to the n8n webhook or returns mock quotes. Validates responses with Zod and times out after 10s.
- `POST /api/schedule` – mock scheduler that returns a combined ISO timestamp. Includes TODOs for Google Calendar using the provided OAuth env vars.

## Notes for production
- Set `USE_MOCK_QUOTES=false` and provide `N8N_QUOTE_WEBHOOK_URL` to enable live pricing.
- Implement Google Calendar inside `/api/schedule` and set `USE_MOCK_SCHEDULING=false` when ready.
- The homepage (`/`) redirects to `/quote` to keep the funnel focused.
