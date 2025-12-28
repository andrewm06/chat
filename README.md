# ClearView Window Cleaning Quotes

An end-to-end Next.js (App Router) app that provides instant window cleaning quotes, optional scheduling, and an admin dashboard with Clerk authentication and Prisma/PostgreSQL persistence.

## Step-by-step plan
1. Scaffold a Next.js App Router project with Tailwind CSS v4 and shared UI components.
2. Model data with Prisma (User, Quote, Appointment) and implement reusable pricing/validation helpers.
3. Build public experience: instant price calculation, server-validated quote creation, optional scheduling.
4. Add authenticated admin dashboard to review quotes and manage appointment statuses.
5. Wire API routes for quote capture and admin appointment updates; enforce server-side validation and auth.
6. Document environment variables, database setup, and Vercel deployment steps.

## File structure
```
app/
  api/
    admin/appointments/route.ts    # Admin-only status updates
    quotes/route.ts                # Public quote capture
  admin/page.tsx                   # Admin dashboard (Clerk-protected)
  layout.tsx                       # Root layout with ClerkProvider
  globals.css
  page.tsx                         # Public landing + quote form
components/
  admin/
    AdminAppointments.tsx
    AppointmentList.tsx
    QuotesTable.tsx
  layout/Header.tsx
  quote/
    QuoteForm.tsx
    QuoteSummary.tsx
  ui/
    badge.tsx
    button.tsx
    card.tsx
    input.tsx
    label.tsx
lib/
  auth.ts
  pricing.ts
  prisma.ts
  validation.ts
middleware.ts
prisma/
  schema.prisma
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   # Update DATABASE_URL, Clerk keys, and NEXT_PUBLIC_APP_URL
   ```
3. Generate Prisma client:
   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/window_quotes" npx prisma generate
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

## Deployment (Vercel)
1. Set environment variables in Vercel: `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`.
2. Provision a PostgreSQL database (e.g., Vercel Postgres, Neon, Supabase) and apply migrations when added.
3. Deploy via `vercel` CLI or GitHub integration; Vercel will build with `npm run build` and start with `next start`.

## Notes
- Pricing is enforced at $8/window with a $199 minimum.
- All inputs are validated server-side with Zod; invalid requests return structured errors.
- Admin access requires the Clerk user to have `privateMetadata.role = "admin"` or a database role of `ADMIN`.
