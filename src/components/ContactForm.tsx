"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/lib/actions/contact";
import type { Dictionary, Locale } from "@/lib/content";

const input =
  "w-full border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-colors focus:border-signal focus:bg-white/10";

export function ContactForm({ locale, labels }: { locale: Locale; labels: Dictionary["contactForm"] }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="flex items-center gap-4 border-l-4 border-signal bg-white/5 p-8" role="status">
        <span className="grid size-12 shrink-0 place-items-center bg-signal text-2xl text-ink" aria-hidden>
          ✓
        </span>
        <p className="text-lg">{labels.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Field label={labels.name}>
        <input name="name" required maxLength={120} autoComplete="name" className={input} />
      </Field>
      <Field label={labels.company} hint={labels.optional}>
        <input name="company" maxLength={160} autoComplete="organization" className={input} />
      </Field>
      <Field label={labels.email}>
        <input name="email" type="email" maxLength={200} autoComplete="email" className={input} />
      </Field>
      <Field label={labels.phone}>
        <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={input} />
      </Field>
      <Field label={labels.message} className="sm:col-span-2">
        <textarea name="message" required rows={5} maxLength={4000} className={input} />
      </Field>

      {state.status !== "idle" && (
        <p className="text-sm text-signal sm:col-span-2" role="alert">
          {state.status === "need-contact" ? labels.needContact : labels.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-signal px-8 py-4 font-display text-lg font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
      >
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}

function Field({
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
      <span className="eyebrow mb-2 block text-white/60">
        {label} {hint && <span className="normal-case tracking-normal text-white/35">({hint})</span>}
      </span>
      {children}
    </label>
  );
}
