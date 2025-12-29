import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name is required")
    .optional(),
  lastName: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email").optional(),
});

export const quoteRequestSchema = z.object({
  address: z.string().trim().min(3, "Address is required"),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().optional(),
  source: z.enum(["wix_redirect", "direct"]).default("direct"),
});

export const quoteFeatureSchema = z.object({
  label: z.string(),
  included: z.boolean(),
});

export const quotePlanSchema = z.object({
  planId: z.enum(["biannual", "quarterly", "monthly"]),
  planName: z.string(),
  headlineDiscountText: z.string(),
  priceOneTime: z.number().nonnegative(),
  pricePerVisit: z.number().nonnegative(),
  billingCadenceText: z.string(),
  features: z.array(quoteFeatureSchema).length(4),
  recommended: z.boolean(),
});

export const quoteResponseSchema = z.object({
  currency: z.literal("USD"),
  addressNormalized: z.string(),
  quotes: z.array(quotePlanSchema),
});

export const scheduleRequestSchema = z.object({
  address: z.string().trim().min(3, "Address is required"),
  planId: z.enum(["biannual", "quarterly", "monthly"]),
  planName: z.string(),
  price: z.number().nonnegative(),
  currency: z.literal("USD"),
  date: z.string().refine((val) => !Number.isNaN(new Date(val).getTime()), {
    message: "Date must be valid",
  }),
  timeSlot: z.string().trim().min(1, "Time slot is required"),
  contact: z.object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    email: z.string().trim().email("Enter a valid email").optional(),
  }),
});

export const scheduleResponseSchema = z.object({
  scheduledAt: z.string(),
  planName: z.string(),
  price: z.number(),
  currency: z.literal("USD"),
  address: z.string(),
});

export type QuotePlan = z.infer<typeof quotePlanSchema>;
export type QuoteResponse = z.infer<typeof quoteResponseSchema>;
