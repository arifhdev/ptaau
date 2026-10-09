import Link from "next/link";

export const inputClass =
  "w-full border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-steel/60 focus:border-ink focus:ring-2 focus:ring-signal/60";

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center gap-2 bg-ink px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-ink-3 disabled:opacity-50",
  accent:
    "inline-flex items-center justify-center gap-2 bg-signal px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-signal-deep disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center gap-2 border border-line bg-white px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink disabled:opacity-50",
  danger:
    "inline-flex items-center justify-center gap-2 border border-red-200 bg-white px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50",
};

export function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-steel">{hint}</span>}
    </label>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div>
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-steel">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className={buttonClass.accent}>
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-line bg-white ${className}`}>{children}</div>;
}

export function Notice({ tone, children }: { tone: "ok" | "error"; children: React.ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`border-l-4 px-4 py-3 text-sm ${
        tone === "ok" ? "border-green-600 bg-green-50 text-green-900" : "border-red-600 bg-red-50 text-red-900"
      }`}
    >
      {children}
    </p>
  );
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(
    new Date(iso),
  );
}
