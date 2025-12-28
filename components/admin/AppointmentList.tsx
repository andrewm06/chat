"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type AppointmentItem = {
  id: string;
  scheduledDate: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  quote: {
    address: string;
    price: number;
    windowCount: number;
  };
};

type Props = {
  appointments: AppointmentItem[];
  isUpdating?: boolean;
  onUpdateStatus: (appointmentId: string, status: AppointmentItem["status"]) => Promise<void>;
};

const statusLabel: Record<AppointmentItem["status"], string> = {
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function AppointmentList({ appointments, onUpdateStatus, isUpdating = false }: Props) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
        No appointments yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {appointment.quote.address}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span>{appointment.quote.windowCount} windows</span>
              <span>${appointment.quote.price}</span>
              <span>{format(new Date(appointment.scheduledDate), "PPpp")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={appointment.status === "SCHEDULED" ? "default" : "success"}>
              {statusLabel[appointment.status]}
            </Badge>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUpdateStatus(appointment.id, "COMPLETED")}
              disabled={isUpdating}
            >
              Mark done
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateStatus(appointment.id, "CANCELLED")}
              disabled={isUpdating}
            >
              Cancel
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
