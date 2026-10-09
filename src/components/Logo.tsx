import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/brand/logo-circle.png";

export function Logo({ href, tone = "light" }: { href: string; tone?: "light" | "dark" }) {
  return (
    <Link href={href} className="group flex items-center gap-3" aria-label="PT Aditya Andhika Utama">
      <span className="rounded-full bg-white p-0.5">
        <Image src={logo} alt="" width={44} height={44} className="size-11" preload />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-2xl font-extrabold tracking-tight ${tone === "light" ? "text-white" : "text-ink"}`}
        >
          PT.<span className="text-signal [-webkit-text-stroke:0.5px_var(--color-ink)]">AAU</span>
        </span>
        <span
          className={`font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${tone === "light" ? "text-white/70" : "text-steel"}`}
        >
          Aditya Andhika Utama
        </span>
      </span>
    </Link>
  );
}
