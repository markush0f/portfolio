import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Blocks, Dumbbell, Globe, Mail, Linkedin } from "lucide-react";

import { freelanceProfile } from "../../../data/freelanceProfile";

const icons: Record<string, React.ElementType> = {
  Globe,
  Dumbbell,
  Blocks,
};

export function FreelanceAboutGsap() {
  const rootRef = useRef<HTMLElement | null>(null);

  const handleReturnNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
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

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const targetHref = event.currentTarget.href;
    event.preventDefault();

    try {
      const overlay = document.getElementById("page-transition-overlay");
      const surface = overlay?.querySelector<HTMLElement>(".page-transition-surface");
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
      gsap.set(line, { scaleX: 0, transformOrigin: "left center", opacity: 1 });

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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      const surface = overlay?.querySelector<HTMLElement>(".page-transition-surface");
      const line = overlay?.querySelector<HTMLElement>(".page-transition-line");

      if (overlay && surface && line) {
        gsap.set(overlay, { opacity: 1, pointerEvents: "none" });
        gsap.set(surface, { scaleY: 1, transformOrigin: "bottom center" });
        gsap.set(line, { scaleX: 1, transformOrigin: "right center" });

        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => gsap.set(overlay, { opacity: 0 }),
          })
          .to(line, { scaleX: 0, duration: 0.22 })
          .to(surface, { scaleY: 0, duration: 0.28 }, 0.06);
      }

      gsap.set("[data-animate]", { opacity: 0, y: 16 });
      gsap.timeline({ defaults: { ease: "power2.out" } }).to("[data-animate]", {
        opacity: 1,
        y: 0,
        duration: 0.38,
        stagger: 0.08,
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative mx-auto min-h-screen max-w-5xl px-6 py-12 md:px-10"
    >
      <a
        href="/"
        onClick={handleReturnNavigation}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#12161b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/20 hover:bg-[#161b21]"
      >
        ← Volver
      </a>

      <section className="mt-16 flex items-center gap-6" data-animate>
        <img
          src="/profile.jpeg"
          alt="Markus Abramian Medina"
          className="h-20 w-20 rounded-full object-cover"
        />
        <div className="text-left">
          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            {freelanceProfile.hero.name}
          </h1>
          <p className="mt-1 text-base text-white/72">
            {freelanceProfile.hero.title}
          </p>
          <p className="mt-1 text-sm text-white/56">
            {freelanceProfile.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/58" data-animate>
          Servicios
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {freelanceProfile.services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.title}
                data-animate
                className="rounded-2xl border border-white/10 bg-[#12161b] p-6 text-center"
              >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/8">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-white/72">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/58" data-animate>
          Proyecto
        </h2>
        <article
          data-animate
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#12161b]"
        >
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{freelanceProfile.projects[0].name}</h3>
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/78">
                {freelanceProfile.projects[0].status}
              </span>
            </div>
            <p className="mt-3 text-white/72">{freelanceProfile.projects[0].description}</p>
          </div>
          <div className="flex flex-wrap gap-2 border-b border-white/10 bg-[#0f1317] px-6 py-4">
            {freelanceProfile.projects[0].tech.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/68">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4 p-6">
            <a
              href={freelanceProfile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/68 transition hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${freelanceProfile.contact.email}`}
              className="inline-flex items-center gap-2 text-sm text-white/68 transition hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {freelanceProfile.contact.email}
            </a>
          </div>
        </article>
      </section>

      <section className="mt-20 py-12 text-center" data-animate>
        <p className="text-sm text-white/56">{freelanceProfile.contact.availability}</p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href={`mailto:${freelanceProfile.contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0c0f13] transition hover:bg-[#e9edf2]"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href={freelanceProfile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#12161b] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-[#161b21]"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}