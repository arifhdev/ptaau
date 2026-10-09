"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = { eyebrow: string; title: string[]; image: string };

export function HeroSlider({
  slides,
  primary,
  secondary,
}: {
  slides: Slide[];
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearTimeout(t);
  }, [index, paused, slides.length]);

  return (
    <section
      className="relative isolate flex h-[100svh] max-h-[62rem] min-h-[40rem] items-end overflow-hidden bg-ink text-white"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt=""
            fill
            sizes="100vw"
            preload={i === 0}
            className={`object-cover ${i === index ? "animate-hero-zoom" : ""}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-ink/70 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-8">
        <div className="max-w-4xl" aria-live="polite">
          {slides.map((s, i) => (
            <div key={s.image} hidden={i !== index}>
              <p className="eyebrow flex items-center gap-3 text-signal">
                <span className="h-px w-10 bg-signal" aria-hidden />
                {s.eyebrow}
              </p>
              <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
                {s.title.map((line, j) => (
                  <span key={line} className={`block ${j === 1 ? "text-signal" : ""}`}>
                    {line}
                  </span>
                ))}
              </h1>
            </div>
          ))}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={primary.href}
              className="bg-signal px-7 py-4 font-display font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white"
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="border border-white/40 px-7 py-4 font-display font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              {secondary.label}
            </Link>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-4">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index}
              className="group flex items-center gap-2 py-2 font-display text-sm font-bold"
            >
              <span className={i === index ? "text-signal" : "text-white/50 group-hover:text-white"}>0{i + 1}</span>
              <span className="relative h-0.5 w-12 overflow-hidden bg-white/25 sm:w-20">
                <span
                  key={`${index}-${paused}`}
                  className={`absolute inset-y-0 left-0 bg-signal ${
                    i === index ? (paused ? "w-full" : "w-full origin-left animate-[grow_6.5s_linear]") : "w-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
