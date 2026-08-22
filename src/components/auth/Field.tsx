export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-ink/60">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-grey-line bg-paper px-4 py-3 font-body text-base text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}

export function SubmitButton({
  children,
  pending,
}: {
  children: React.ReactNode;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full disabled:opacity-60"
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}

export function Alert({
  kind,
  children,
}: {
  kind: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border-l-2 px-4 py-3 font-body text-sm ${
        kind === "error"
          ? "border-ink bg-grey-light text-ink"
          : "border-purple bg-purple/5 text-ink"
      }`}
    >
      {children}
    </div>
  );
}
