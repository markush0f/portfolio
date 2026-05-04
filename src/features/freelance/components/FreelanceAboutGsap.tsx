import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  Building2,
  Dumbbell,
  Globe,
  Quote,
  Store,
} from "lucide-react";

import { freelanceProfile } from "../../../data/freelanceProfile";

const audienceIcons = [Store, Building2] as const;
const serviceIcons = [Globe, Dumbbell, Blocks] as const;
const engagementIcons = [Store, Dumbbell, Building2, BriefcaseBusiness] as const;

const highlightPanels = [
  "border-white/10 bg-[#12161b]",
  "border-white/10 bg-[#12161b]",
  "border-white/10 bg-[#12161b]",
] as const;

const casePanels = [
  "border-white/10 bg-[#12161b]",
  "border-white/10 bg-[#12161b]",
  "border-white/10 bg-[#12161b]",
] as const;

function getAudienceTone(label: string) {
  if (/Negocio/i.test(label)) {
    return {
      chip: "border-white/12 bg-white/6 text-white/78",
      panel: "border-white/10 bg-[#12161b]",
      tag: "border-white/10 bg-white/6 text-white/80",
      ring: "bg-white/6 text-white/80",
      line: "border-white/10",
    } as const;
  }

  return {
    chip: "border-[rgba(96,165,250,0.22)] bg-[rgba(96,165,250,0.08)] text-[#bfdbfe]",
    panel: "border-[rgba(96,165,250,0.16)] bg-[#12161b]",
    tag: "border-[rgba(96,165,250,0.18)] bg-[rgba(96,165,250,0.07)] text-[#dbeafe]",
    ring: "bg-[rgba(96,165,250,0.08)] text-[#dbeafe]",
    line: "border-[rgba(96,165,250,0.14)]",
  } as const;
}

export function FreelanceAboutGsap() {
  const rootRef = useRef<HTMLElement | null>(null);

  const handleReturnNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const targetHref = event.currentTarget.href;

    event.preventDefault();

    try {
      const overlay = document.getElementById("page-transition-overlay");
      const surface = overlay?.querySelector<HTMLElement>(
        ".page-transition-surface",
      );
      const line = overlay?.querySelector<HTMLElement>(".page-transition-line");

      if (!overlay || !surface || !line) {
        window.location.assign(targetHref);
        return;
      }

      const fallbackNavigation = window.setTimeout(() => {
        window.location.assign(targetHref);
      }, 420);

      gsap.killTweensOf([overlay, surface, line]);
      gsap.set(overlay, { opacity: 1, pointerEvents: "auto" });
      gsap.set(surface, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(line, {
        scaleX: 0,
        transformOrigin: "left center",
        opacity: 1,
      });

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            window.clearTimeout(fallbackNavigation);
            window.location.assign(targetHref);
          },
        })
        .to(surface, { scaleY: 1, duration: 0.26 })
        .to(line, { scaleX: 1, duration: 0.22 }, 0.04);
    } catch {
      window.location.assign(targetHref);
    }
  };

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !rootRef.current) {
      const overlay = document.getElementById("page-transition-overlay");
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
      }
      return;
    }

    const context = gsap.context(() => {
      const overlay = document.getElementById("page-transition-overlay");
      const surface = overlay?.querySelector<HTMLElement>(
        ".page-transition-surface",
      );
      const line = overlay?.querySelector<HTMLElement>(".page-transition-line");

      if (overlay && surface && line) {
        gsap.set(overlay, { opacity: 1, pointerEvents: "none" });
        gsap.set(surface, { scaleY: 1, transformOrigin: "bottom center" });
        gsap.set(line, { scaleX: 1, transformOrigin: "right center" });

        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => {
              gsap.set(overlay, { opacity: 0 });
            },
          })
          .to(line, { scaleX: 0, duration: 0.22 })
          .to(surface, { scaleY: 0, duration: 0.28 }, 0.06);
      }

      gsap.set("[data-freelance-hero]", { opacity: 0, y: 16 });
      gsap.set("[data-freelance-copy]", { opacity: 0, y: 16 });
      gsap.set("[data-freelance-card]", { opacity: 0, y: 18 });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to("[data-freelance-hero]", { opacity: 1, y: 0, duration: 0.38 })
        .to(
          "[data-freelance-copy]",
          { opacity: 1, y: 0, duration: 0.32, stagger: 0.05 },
          "-=0.2",
        )
        .to(
          "[data-freelance-card]",
          { opacity: 1, y: 0, duration: 0.28, stagger: 0.04 },
          "-=0.18",
        );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 md:px-10 md:py-12"
    >
      <a
        href="/"
        onClick={handleReturnNavigation}
        className="inline-flex w-fit items-center rounded-full border border-white/10 bg-[#12161b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/20 hover:bg-[#161b21]"
      >
        Volver
      </a>

      <section className="grid gap-10 border-b border-white/10 pb-14 pt-8 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-8">
          <div
            data-freelance-copy="true"
            className="inline-flex items-center rounded-full border border-white/10 bg-[#12161b] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70"
          >
            {freelanceProfile.banner}
          </div>

          <div data-freelance-hero="true" className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/56">
              {freelanceProfile.hero.label}
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[0.98] text-white md:text-6xl">
              {freelanceProfile.hero.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-white/74 md:text-lg">
              {freelanceProfile.hero.description}
            </p>
          </div>

          <div
            data-freelance-copy="true"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={freelanceProfile.hero.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0c0f13] transition hover:bg-[#e9edf2]"
            >
              <ArrowRight className="h-4 w-4" />
              {freelanceProfile.hero.primaryCta.label}
            </a>
            <a
              href={freelanceProfile.hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#12161b] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-[#161b21]"
            >
              {freelanceProfile.hero.secondaryCta.label}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {freelanceProfile.highlights.map((item, index) => (
              <article
                key={item.title}
                data-freelance-card="true"
                className={`rounded-[1.5rem] border p-5 ${highlightPanels[index % highlightPanels.length]}`}
              >
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <article
            data-freelance-card="true"
            className="overflow-hidden rounded-[2rem] border border-white/12 bg-[#12161b]"
          >
            <div>
              <img
                src="/profile.jpeg"
                alt="Foto de Markus Abramian Medina"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="border-t border-white/10 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">
                  Perfil freelance
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Desarrollo web y soporte tecnico con enfoque practico.
                </p>
              </div>
            </div>
          </article>

          <article
            data-freelance-card="true"
            className="rounded-[1.6rem] border border-white/10 bg-[#12161b] p-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
              {freelanceProfile.profileCard.title}
            </p>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {freelanceProfile.profileCard.items.map((item) => (
                <div key={item.label} className="space-y-1">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-white/46">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-medium text-white/84">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </aside>
      </section>

      <section className="grid gap-5 border-b border-white/10 py-14 lg:grid-cols-2">
        {freelanceProfile.audiences.map((audience, index) => {
          const tone = getAudienceTone(audience.eyebrow);
          const Icon = audienceIcons[index % audienceIcons.length];

          return (
            <article
              key={audience.title}
              data-freelance-card="true"
              className={`rounded-[2rem] border p-7 ${tone.panel}`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-2xl p-3 ${tone.ring}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <p
                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${tone.chip}`}
                  >
                    {audience.eyebrow}
                  </p>
                  <h2 className="text-2xl font-semibold leading-tight text-white">
                    {audience.title}
                  </h2>
                  <p className="text-sm leading-7 text-white/72">
                    {audience.description}
                  </p>
                </div>
              </div>

              <div className={`mt-6 border-t pt-6 ${tone.line}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">
                  Entregables frecuentes
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {audience.deliverables.map((item) => (
                    <span
                      key={item}
                      className={`rounded-full border px-3 py-2 text-sm ${tone.tag}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <ul className="mt-5 space-y-2">
                  {audience.examples.map((example) => (
                    <li key={example} className="text-sm leading-6 text-white/82">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p
            data-freelance-copy="true"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58"
          >
            Servicios
          </p>
          <h2
            data-freelance-copy="true"
            className="text-3xl font-semibold leading-tight text-white md:text-4xl"
          >
            Servicios que ofrezco con un alcance claro.
          </h2>
          <p
            data-freelance-copy="true"
            className="text-base leading-8 text-white/72"
          >
            Me enfoco en encargos donde pueda aportar bien desde el principio:
            web comercial, app operativa sencilla o apoyo a producto tecnico con
            alcance definido.
          </p>

          <div className="flex flex-wrap gap-2">
            {freelanceProfile.capabilities.map((capability) => (
              <span
                key={capability}
                data-freelance-card="true"
                className="rounded-full border border-white/10 bg-[#12161b] px-4 py-2 text-sm text-white/84"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {freelanceProfile.services.map((service, index) => {
            const tone = getAudienceTone(service.audience);
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <article
                key={service.title}
                data-freelance-card="true"
                className={`rounded-[1.7rem] border p-6 ${tone.panel}`}
              >
                <div className={`inline-flex rounded-2xl p-3 ${tone.ring}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p
                  className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${tone.chip}`}
                >
                  {service.audience}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  {service.summary}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-6 text-white/84">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-b border-white/10 py-14">
        <div className="mb-8 space-y-4">
          <p
            data-freelance-copy="true"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58"
          >
            Encargos frecuentes
          </p>
          <h2
            data-freelance-copy="true"
            className="max-w-3xl text-3xl font-semibold leading-tight text-white md:text-4xl"
          >
            Casos de uso claros para atraer negocio local y tambien producto.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {freelanceProfile.engagements.map((engagement, index) => {
            const tone = getAudienceTone(engagement.audience);
            const Icon = engagementIcons[index % engagementIcons.length];

            return (
              <article
                key={engagement.title}
                data-freelance-card="true"
                className={`rounded-[1.7rem] border p-6 ${tone.panel}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4">
                    <p
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${tone.chip}`}
                    >
                      {engagement.audience}
                    </p>
                    <div className="flex items-start gap-3">
                      <div className={`rounded-2xl p-3 ${tone.ring}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {engagement.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-white/36">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  {engagement.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {engagement.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-full border px-3 py-2 text-sm ${tone.tag}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-b border-white/10 py-14">
        <div className="mb-8 space-y-4">
          <p
            data-freelance-copy="true"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58"
          >
            Casos seleccionados
          </p>
          <h2
            data-freelance-copy="true"
            className="max-w-3xl text-3xl font-semibold leading-tight text-white md:text-4xl"
          >
            Una referencia real en lugar de varios casos inventados.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {freelanceProfile.caseStudies.map((item, index) => (
            <article
              key={item.name}
              data-freelance-card="true"
              className={`rounded-[1.7rem] border p-6 ${casePanels[index % casePanels.length]}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/58">
                {item.category}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {item.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/72">
                {item.outcome}
              </p>
              <ul className="mt-5 space-y-2">
                {item.details.map((detail) => (
                  <li key={detail} className="text-sm leading-6 text-white/84">
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p
            data-freelance-copy="true"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58"
          >
            Proceso
          </p>
          <div className="grid gap-4">
            {freelanceProfile.process.map((item) => (
              <article
                key={item.step}
                data-freelance-card="true"
                className="rounded-[1.5rem] border border-white/10 bg-[#12161b] p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="w-10 text-sm font-semibold text-white/40">
                    {item.step}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/72">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div
            data-freelance-copy="true"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/58"
          >
            <Quote className="h-4 w-4" />
            Presentacion y cierre
          </div>

          <article
            data-freelance-card="true"
            className="rounded-[1.7rem] border border-white/10 bg-[#12161b] p-6"
          >
            <p className="text-lg font-semibold text-white">
              {freelanceProfile.socialProofNote.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/72">
              {freelanceProfile.socialProofNote.description}
            </p>
          </article>

          <article
            data-freelance-card="true"
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#12161b]"
          >
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                  Cierre
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
                  {freelanceProfile.closing.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
                  {freelanceProfile.closing.description}
                </p>
              </div>

              <div className="border-t border-white/10 bg-[#0f1317] p-8 lg:border-l lg:border-t-0">
                <div className="flex h-full flex-col justify-center gap-3">
                  <a
                    href={freelanceProfile.closing.primaryCta.href}
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0c0f13] transition hover:bg-[#e9edf2]"
                  >
                    {freelanceProfile.closing.primaryCta.label}
                  </a>
                  <a
                    href={freelanceProfile.closing.secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-[#12161b] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-[#161b21]"
                  >
                    {freelanceProfile.closing.secondaryCta.label}
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
