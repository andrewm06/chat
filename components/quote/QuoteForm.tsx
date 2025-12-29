import React from "react";

type QuoteFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
};

type Props = {
  values: QuoteFormValues;
  onChange: (key: keyof QuoteFormValues, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  error?: string | null;
};

export function QuoteForm({ values, onChange, onSubmit, loading, error }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[32px] bg-white/90 p-6 shadow-xl ring-2 ring-white/60"
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-700">Step 1</p>
          <h2 className="text-2xl font-black text-lime-950">Confirm your details</h2>
          <p className="text-sm text-lime-800/80">
            Address is required so we can retrieve pricing for your home.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            label="First name"
            value={values.firstName}
            onChange={(val) => onChange("firstName", val)}
            autoComplete="given-name"
          />
          <InputField
            label="Last name"
            value={values.lastName}
            onChange={(val) => onChange("lastName", val)}
            autoComplete="family-name"
          />
          <InputField
            label="Phone"
            value={values.phone}
            onChange={(val) => onChange("phone", val)}
            autoComplete="tel"
          />
          <InputField
            label="Email"
            type="email"
            value={values.email}
            onChange={(val) => onChange("email", val)}
            autoComplete="email"
          />
        </div>

        <InputField
          label="Address *"
          required
          value={values.address}
          onChange={(val) => onChange("address", val)}
          placeholder="123 Main St, Lexington KY"
          autoComplete="street-address"
        />

        {error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!values.address || loading}
          className="w-full rounded-full bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-4 text-base font-extrabold uppercase tracking-[0.18em] text-lime-950 shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Fetching quotes..." : "Get Quote"}
        </button>
      </div>
    </form>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

function InputField({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: InputFieldProps) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-lime-900">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-lime-200 bg-white px-4 py-3 text-sm font-semibold text-lime-950 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-lime-400"
      />
    </label>
  );
}

QuoteForm.displayName = "QuoteForm";
