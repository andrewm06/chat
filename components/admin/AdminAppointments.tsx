"use client";

import { useMemo, useState, useTransition } from "react";
import { AppointmentList, type AppointmentItem } from "@/components/admin/AppointmentList";

type Props = {
  initialAppointments: AppointmentItem[];
};

export function AdminAppointments({ initialAppointments }: Props) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isPending, startTransition] = useTransition();

  const sortedAppointments = useMemo(
    () =>
      [...appointments].sort(
        (a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime(),
      ),
    [appointments],
  );

  const handleUpdateStatus = async (
    appointmentId: string,
    status: AppointmentItem["status"],
  ) => {
    startTransition(async () => {
      const previous = [...appointments];
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === appointmentId ? { ...appt, status } : appt)),
      );

      try {
        const response = await fetch("/api/admin/appointments", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId, status }),
        });

        if (!response.ok) {
          setAppointments(previous);
        }
      } catch {
        setAppointments(previous);
      }
    });
  };

  return (
    <AppointmentList
      appointments={sortedAppointments}
      onUpdateStatus={handleUpdateStatus}
      isUpdating={isPending}
    />
  );
}
