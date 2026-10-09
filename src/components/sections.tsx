import Image from "next/image";
import Link from "next/link";
import { company, projects, testimonials, type Dictionary, type Project } from "@/lib/content";
import { projectHref, routes, type Locale } from "@/lib/routes";
import { DownloadIcon } from "./Footer";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  tone = "dark",
  className = "",
}: {
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-signal" : "text-steel"}`}>
        <span className={`h-0.5 w-8 ${tone === "light" ? "bg-signal" : "bg-ink"}`} aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

export function PageHero({ eyebrow, title, image }: { eyebrow: string; title: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-40 text-white sm:pb-20 sm:pt-48">
      <Image src={image} alt="" fill sizes="100vw" preload className="-z-10 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink to-ink/30" />
      <Container>
        <p className="eyebrow flex items-center gap-3 text-signal">
          <span className="h-0.5 w-8 bg-signal" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-7xl">
          {title}
        </h1>
      </Container>
      <div className="hazard absolute inset-x-0 bottom-0 h-1.5" aria-hidden />
    </section>
  );
}

export function StatsBar({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-signal text-ink">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {dict.stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-8 pr-4 sm:py-10 ${i % 2 === 1 ? "pl-4 sm:pl-8" : ""} ${i > 1 ? "border-t border-ink/15 lg:border-t-0" : ""} ${
              i > 0 ? "lg:border-l lg:border-ink/15 lg:pl-8" : ""
            }`}
          >
            <p className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">{s.value}</p>
            <p className="mt-2 text-sm font-medium leading-snug text-ink/75">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

const serviceIcons = [
  // Truk trailer
  <svg key="a" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-12" aria-hidden>
    <path d="M3 30V14h24v16M27 20h9l7 8v2" strokeLinejoin="round" />
    <path d="M3 30h40v4H3z" strokeLinejoin="round" />
    <circle cx="11" cy="37" r="3.5" />
    <circle cx="20" cy="37" r="3.5" />
    <circle cx="37" cy="37" r="3.5" />
  </svg>,
  // Kontainer
  <svg key="b" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-12" aria-hidden>
    <path d="M4 14h40v22H4z" strokeLinejoin="round" />
    <path d="M11 18v14M18 18v14M25 18v14M32 18v14M39 18v14" />
    <path d="M14 14 24 6l10 8" strokeLinejoin="round" />
  </svg>,
  // Kargo berat
  <svg key="c" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-12" aria-hidden>
    <path d="M10 42V6h4l18 10M14 6v8" strokeLinejoin="round" />
    <path d="M32 16v8" />
    <path d="M26 24h12v10H26z" strokeLinejoin="round" />
    <path d="M4 42h40" />
  </svg>,
];

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.services.eyebrow} title={dict.services.title} tone="light" />
        <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
          {dict.services.items.map((s, i) => (
            <article key={s.title} className="group relative bg-ink p-8 transition-colors hover:bg-ink-2 sm:p-10">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="text-signal">{serviceIcons[i]}</span>
                <span className="font-display text-sm font-bold text-white/30">0{i + 1}</span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-white/65">{s.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AboutIntro({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/projects/Alutsista-Project-To-PT.DI-Bandung-3-scaled.jpg"
              alt="Armada trailer PT AAU mengangkut alutsista ke PT DI Bandung"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 bg-signal p-6 sm:-right-6 sm:p-8">
            <p className="font-display text-6xl font-extrabold leading-none sm:text-7xl">30+</p>
            <p className="mt-1 max-w-[9rem] text-sm font-semibold leading-tight">
              {locale === "id" ? "Tahun pengalaman sejak 1994" : "Years of experience since 1994"}
            </p>
          </div>
          <div className="hazard absolute -left-3 -top-3 -z-10 size-28" aria-hidden />
        </div>
        <div>
          <SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
            {dict.about.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {dict.about.pillars.map((p) => (
              <li key={p.title} className="border-t-2 border-ink pt-4">
                <p className="font-display text-lg font-bold uppercase">{p.title}</p>
                <p className="mt-1 text-sm text-steel">{p.body}</p>
              </li>
            ))}
          </ul>
          <Link
            href={routes[locale].about}
            className="mt-10 inline-flex items-center gap-3 font-display font-bold uppercase tracking-wider text-ink"
          >
            <span className="border-b-2 border-signal pb-1">{dict.about.more}</span>
            <Arrow />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function ProjectCard({ project, locale, dict, large = false }: { project: Project; locale: Locale; dict: Dictionary; large?: boolean }) {
  return (
    <Link href={projectHref(locale, project.slug)} className="group relative block overflow-hidden bg-ink">
      <div className={`relative ${large ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem]" : "aspect-[4/3]"}`}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes={large ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow text-signal">{project.cargo[locale]}</p>
        <h3 className={`mt-2 font-display font-bold uppercase leading-tight text-white ${large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
          {project.title}
        </h3>
        {project.destination && (
          <p className="mt-1 text-sm text-white/70">
            {dict.projectsSection.destination}: {project.destination}
          </p>
        )}
      </div>
      <span className="absolute right-4 top-4 grid size-11 -translate-y-2 place-items-center bg-signal text-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        <Arrow />
      </span>
    </Link>
  );
}

export function ProjectsPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [first, ...rest] = projects.slice(0, 5);
  return (
    <section className="bg-paper-2 py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.projectsSection.eyebrow} title={dict.projectsSection.title} />
          <Link
            href={routes[locale].projects}
            className="inline-flex items-center gap-3 font-display font-bold uppercase tracking-wider"
          >
            <span className="border-b-2 border-signal pb-1">
              {dict.projectsSection.all} ({projects.length})
            </span>
            <Arrow />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <div className="lg:col-span-2 lg:row-span-2">
            <ProjectCard project={first} locale={locale} dict={dict} large />
          </div>
          {rest.slice(0, 2).map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} dict={dict} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rest.slice(2).map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} dict={dict} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.testimonialsSection.eyebrow} title={dict.testimonialsSection.title} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between border border-line bg-white p-8 sm:p-10">
              <blockquote className="relative">
                <span className="absolute -left-1 -top-6 font-display text-7xl font-extrabold leading-none text-signal" aria-hidden>
                  “
                </span>
                <p className="relative text-xl leading-relaxed text-ink sm:text-2xl">{t.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-12 place-items-center bg-ink font-display text-lg font-bold text-signal" aria-hidden>
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-steel">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CtaBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src="/images/hero/slide2.jpeg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
      <Container className="grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            {dict.cta.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/75">{dict.cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-signal px-7 py-5 font-display text-lg font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white"
          >
            <WhatsAppIcon /> {dict.cta.whatsapp}
          </a>
          <a
            href={company.profilePdf[locale]}
            download
            className="flex items-center justify-center gap-3 border border-white/40 px-7 py-5 font-display text-lg font-bold uppercase tracking-wider transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            <DownloadIcon /> {dict.cta.profile}
          </a>
        </div>
      </Container>
    </section>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden>
      <path d="M4 10h12m0 0-5-5m5 5-5 5" strokeLinecap="square" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
    </svg>
  );
}
