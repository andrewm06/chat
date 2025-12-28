import { z } from "zod";

const futureDate = z
  .string()
  .datetime({ message: "Date must be in ISO format" })
  .transform((value) => new Date(value))
  .refine((date) => date.getTime() > Date.now(), {
    message: "Scheduled date must be in the future",
  });

export const quoteRequestSchema = z.object({
  address: z.string().min(5, "Address is required"),
  windowCount: z
    .number({ invalid_type_error: "Window count must be a number" })
    .int("Window count must be an integer")
    .positive("Window count must be greater than zero")
    .max(500, "Please contact us directly for 500+ windows"),
  scheduledDate: futureDate.optional(),
});

export const appointmentSchema = z.object({
  quoteId: z.string().cuid("Invalid quote reference"),
  scheduledDate: futureDate,
  status: z
    .enum(["SCHEDULED", "COMPLETED", "CANCELLED"], {
      invalid_type_error: "Status is invalid",
    })
    .optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const appointmentStatusSchema = z.object({
  appointmentId: z.string().cuid("Invalid appointment"),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]),
});
