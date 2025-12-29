type Props = {
  dates: { value: string; label: string }[];
  timeSlots: string[];
  selectedDate?: string;
  selectedTime?: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

export function SchedulePicker({
  dates,
  timeSlots,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: Props) {
  return (
    <div className="rounded-[26px] bg-white/90 p-6 shadow-xl ring-2 ring-white/60">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-700">
            Schedule
          </p>
          <p className="text-lg font-extrabold text-lime-950">Pick your first cleaning</p>
          <p className="text-sm text-lime-800/80">
            Local mock scheduling for now — we&apos;ll drop this into Google Calendar next.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="block text-sm font-semibold text-lime-900">Date (next 30 days)</span>
          <div className="relative">
            <select
              value={selectedDate ?? ""}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full rounded-2xl border border-lime-200 bg-white px-4 py-3 text-sm font-semibold text-lime-950 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-lime-400"
            >
              <option value="" disabled>
                Select a date
              </option>
              {dates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
        </label>

        <div className="space-y-2">
          <span className="block text-sm font-semibold text-lime-900">Time slot</span>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = slot === selectedTime;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                    isSelected
                      ? "border-lime-500 bg-gradient-to-r from-lime-200 to-lime-100 text-lime-900 shadow-lg"
                      : "border-lime-200 bg-white/80 text-lime-800 hover:border-lime-400"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
