import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSlider } from "@/components/HeroSlider";
import { DownloadIcon } from "@/components/Footer";
import {
  AboutIntro,
  Arrow,
  Container,
  CtaBand,
  PageHero,
  ProjectCard,
  ProjectsPreview,
  SectionHeading,
  Services,
  StatsBar,
  Testimonials,
  WhatsAppIcon,
} from "@/components/sections";
import { companyName, dictionaries } from "@/lib/content";
import { getProject, getProjects, getSettings } from "@/lib/data";
import { ContactForm } from "@/components/ContactForm";
import { projectHref, routes, type Locale } from "@/lib/routes";

export function HomeView({ locale }: { locale: Locale }) {
  const dict = dictionaries[locale];
  const r = routes[locale];
  return (
    <>
      <HeroSlider
        slides={dict.hero}
        primary={{ href: r.projects, label: dict.heroCtaPrimary }}
        secondary={{ href: r.contact, label: dict.heroCtaSecondary }}
      />
      <StatsBar dict={dict} />
      <AboutIntro locale={locale} dict={dict} />
      <Services dict={dict} />
      <ProjectsPreview locale={locale} dict={dict} />
      <Testimonials dict={dict} />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}

export function AboutView({ locale }: { locale: Locale }) {
  const dict = dictionaries[locale];
  const a = dict.about;
  return (
    <>
      <PageHero eyebrow={dict.nav.about} title={a.eyebrow} image="/images/hero/slide3.jpeg" />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow={a.eyebrow} title={a.title} />
          <div className="space-y-5 text-lg leading-relaxed text-ink/75">
            {a.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <StatsBar dict={dict} />

      <section className="bg-ink py-20 text-white sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={a.chronologyTitle} title="26.05.1994" tone="light" />
            <div className="mt-8 space-y-5 leading-relaxed text-white/70">
              {a.chronology.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <ol className="relative border-l-2 border-white/15 pl-8 lg:mt-24">
            {a.milestones.map((m) => (
              <li key={m.year} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[2.6rem] top-1 size-5 border-4 border-ink bg-signal" aria-hidden />
                <p className="font-display text-4xl font-extrabold uppercase text-signal">{m.year}</p>
                <p className="mt-2 text-lg text-white/85">{m.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/projects/PC3000-Project-To-Palembang-2-scaled.jpg"
              alt="Pengiriman PC3000 ke Palembang"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow={locale === "id" ? "Inovasi" : "Innovation"} title={a.innovationTitle} />
            <p className="mt-8 text-lg leading-relaxed text-ink/75">{a.innovation}</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {a.pillars.map((p) => (
                <li key={p.title} className="border-t-2 border-ink pt-4">
                  <p className="font-display text-lg font-bold uppercase">{p.title}</p>
                  <p className="mt-1 text-sm text-steel">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={locale === "id" ? "Visi & Misi" : "Vision & Mission"} title={locale === "id" ? "Arah kami" : "Our direction"} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { t: a.visionTitle, b: a.vision },
              { t: a.missionTitle, b: a.mission },
            ].map((x, i) => (
              <div key={x.t} className={`p-8 sm:p-12 ${i === 0 ? "bg-signal" : "bg-ink text-white"}`}>
                <p className="eyebrow">{x.t}</p>
                <p className="mt-6 font-display text-2xl font-semibold leading-snug sm:text-3xl">{x.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}

export async function ProjectsView({ locale }: { locale: Locale }) {
  const dict = dictionaries[locale];
  const projects = await getProjects();
  return (
    <>
      <PageHero eyebrow={dict.projectsSection.eyebrow} title={dict.projectsSection.title} image="/images/hero/slide1.jpg" />
      <section className="py-20 sm:py-28">
        <Container>
          <p className="max-w-3xl text-xl leading-relaxed text-ink/75">{dict.projectsSection.intro}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} dict={dict} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}

export async function ProjectDetailView({ locale, slug }: { locale: Locale; slug: string }) {
  const [projects, company] = await Promise.all([getProjects(), getSettings()]);
  const project = await getProject(slug);
  if (!project) notFound();
  const dict = dictionaries[locale];
  const s = dict.projectsSection;
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <PageHero eyebrow={project.cargo[locale]} title={project.title} image={project.cover} />
      <section className="py-16 sm:py-24">
        <Container>
          <Link href={routes[locale].projects} className="inline-flex items-center gap-2 text-sm font-semibold text-steel hover:text-ink">
            <span className="rotate-180">
              <Arrow />
            </span>
            {s.back}
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              <Image src={project.cover} alt={project.title} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
            </div>
            <dl className="self-start border-t-4 border-ink">
              {[
                { k: s.cargo, v: project.cargo[locale] },
                ...(project.destination ? [{ k: s.destination, v: project.destination }] : []),
              ].map((row) => (
                <div key={row.k} className="border-b border-line py-5">
                  <dt className="eyebrow text-steel">{row.k}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold uppercase">{row.v}</dd>
                </div>
              ))}
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 bg-signal px-6 py-4 font-display font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-signal"
              >
                <WhatsAppIcon /> {dict.cta.whatsapp}
              </a>
            </dl>
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="eyebrow text-steel">{s.gallery}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((g) => (
                  <div key={g} className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Image src={g} alt={project.title} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <Link href={projectHref(locale, next.slug)} className="group relative isolate block overflow-hidden bg-ink text-white">
        <Image src={next.cover} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30 transition duration-700 group-hover:scale-105 group-hover:opacity-45" />
        <Container className="flex items-center justify-between gap-6 py-16 sm:py-20">
          <div>
            <p className="eyebrow text-signal">{s.next}</p>
            <p className="mt-3 font-display text-3xl font-extrabold uppercase sm:text-5xl">{next.title}</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center bg-signal text-ink transition-transform group-hover:translate-x-1">
            <Arrow />
          </span>
        </Container>
      </Link>
    </>
  );
}

export async function ContactView({ locale }: { locale: Locale }) {
  const dict = dictionaries[locale];
  const company = await getSettings();
  const c = dict.contact;
  const other: Locale = locale === "id" ? "en" : "id";
  const places = [
    { label: c.office, ...company.office },
    { label: c.warehouse, ...company.warehouse },
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} image="/images/hero/slide2.jpeg" />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="space-y-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {places.map((p) => (
                <div key={p.label} className="border-t-4 border-ink bg-white p-6">
                  <h2 className="eyebrow text-steel">{p.label}</h2>
                  <address className="mt-4 not-italic leading-relaxed">
                    {p.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a
                    href={p.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-display font-bold uppercase tracking-wider"
                  >
                    <span className="border-b-2 border-signal pb-0.5">{c.viewMaps}</span>
                    <Arrow />
                  </a>
                </div>
              ))}
            </div>

            <dl className="divide-y divide-line border-y border-line">
              {[
                { k: c.phone, v: company.phoneAlt ? `${company.phone} / ${company.phoneAlt}` : company.phone, href: `tel:${company.phone.replace(/-/g, "")}` },
                { k: c.mobile, v: company.mobile, href: `https://wa.me/${company.whatsapp}` },
                { k: c.email, v: company.email, href: `mailto:${company.email}` },
              ].map((row) => (
                <div key={row.k} className="flex flex-wrap items-baseline justify-between gap-2 py-5">
                  <dt className="eyebrow text-steel">{row.k}</dt>
                  <dd>
                    <a href={row.href} className="font-display text-2xl font-bold hover:text-signal-deep">
                      {row.v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div>
              <h2 className="eyebrow text-steel">{c.downloads}</h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={company.profilePdf[locale]}
                  download
                  className="flex flex-1 items-center justify-center gap-2 bg-ink px-5 py-4 font-display font-bold uppercase tracking-wider text-white hover:bg-ink-3"
                >
                  <DownloadIcon /> {c.profile}
                </a>
                <a
                  href={company.profilePdf[other]}
                  download
                  className="flex flex-1 items-center justify-center gap-2 border border-ink px-5 py-4 font-display font-bold uppercase tracking-wider hover:bg-ink hover:text-white"
                >
                  <DownloadIcon /> {c.profileEn}
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[26rem] overflow-hidden bg-ink-2">
            <iframe
              src={company.office.embed}
              title={`${c.office} – ${companyName}`}
              className="absolute inset-0 size-full grayscale-[0.4]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
      <section id="form" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={dict.contactForm.eyebrow} title={dict.contactForm.title} tone="light" />
            <p className="mt-6 max-w-md text-lg text-white/70">{dict.contactForm.body}</p>
          </div>
          <ContactForm locale={locale} labels={dict.contactForm} />
        </Container>
      </section>
    </>
  );
}

export async function GuestbookView({ locale }: { locale: Locale }) {
  const g = dictionaries[locale].guestbook;
  const company = await getSettings();
  return (
    <>
      <PageHero eyebrow="PT.AAU" title={g.title} image="/images/hero/slide3.jpeg" />
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-lg text-ink/75">
            {g.body}{" "}
            <Link href={routes[locale].privacy} className="underline decoration-signal decoration-2 underline-offset-4">
              {dictionaries[locale].nav.privacy}
            </Link>
          </p>
          <div className="mt-8 border border-line bg-white">
            <iframe src={company.guestbookForm} title={g.title} className="h-[1600px] w-full" loading="lazy">
              {g.loading}
            </iframe>
          </div>
        </Container>
      </section>
    </>
  );
}

export async function PrivacyView({ locale }: { locale: Locale }) {
  const p = dictionaries[locale].privacy;
  const company = await getSettings();
  return (
    <>
      <PageHero eyebrow="PT.AAU" title={p.title} image="/images/hero/slide2.jpeg" />
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-xl leading-relaxed">{p.intro}</p>
          <div className="mt-12 space-y-10">
            {p.sections.map((s, i) => (
              <section key={s.title}>
                <h2 className="flex items-baseline gap-4 font-display text-2xl font-bold uppercase">
                  <span className="text-signal-deep">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <p className="mt-3 leading-relaxed text-ink/75">{s.lead}</p>
                {s.items.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-6 text-ink/75 marker:text-signal-deep">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <p className="mt-12 border-t border-line pt-6 text-sm text-steel">
            {company.email} · {company.mobile}
          </p>
        </Container>
      </section>
    </>
  );
}
