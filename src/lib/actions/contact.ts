"use server";

import { createPublicClient } from "@/lib/supabase/public";
import { hasSupabase } from "@/lib/supabase/env";

export type ContactState = { status: "idle" | "success" | "error" | "need-contact" };

const field = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max) || null;

export async function sendMessage(_prev: ContactState, fd: FormData): Promise<ContactState> {
  // Honeypot: bot biasanya mengisi semua field, termasuk yang tersembunyi.
  if (fd.get("website")) return { status: "success" };

  const row = {
    name: field(fd, "name", 120),
    company: field(fd, "company", 160),
    email: field(fd, "email", 200),
    phone: field(fd, "phone", 40),
    message: field(fd, "message", 4000),
    locale: fd.get("locale") === "en" ? "en" : "id",
  };
  if (!row.name || !row.message) return { status: "error" };
  if (!row.email && !row.phone) return { status: "need-contact" };
  if (!hasSupabase) return { status: "error" };

  const { error } = await createPublicClient().from("messages").insert(row);
  if (error) {
    console.error("sendMessage", error.message);
    return { status: "error" };
  }
  return { status: "success" };
}
