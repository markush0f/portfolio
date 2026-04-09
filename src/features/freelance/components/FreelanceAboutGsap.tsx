import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface FreelanceAboutGsapProps {
  paragraphs: string[];
}

export function FreelanceAboutGsap({ paragraphs }: FreelanceAboutGsapProps) {
  const rootRef = useRef<HTMLElement | null>(null);

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
            defaults: {
              ease: "power2.out",
            },
            onComplete: () => {
              gsap.set(overlay, { opacity: 0 });
            },
          })
          .to(line, {
            scaleX: 0,
            duration: 0.22,
          })
          .to(
            surface,
            {
              scaleY: 0,
              duration: 0.28,
            },
            0.06,
          );
      }

      gsap.set("[data-freelance-photo]", {
        opacity: 0,
        y: 12,
      });
      gsap.set("[data-freelance-copy]", { opacity: 0, y: 14 });
      gsap.set("[data-freelance-paragraph]", { opacity: 0, y: 12 });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      });

      timeline
        .to("[data-freelance-photo]", {
          opacity: 1,
          y: 0,
          duration: 0.32,
        })
        .to(
          "[data-freelance-copy]",
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.05,
          },
          "-=0.18",
        )
        .to(
          "[data-freelance-paragraph]",
          {
            opacity: 1,
            y: 0,
            duration: 0.26,
            stagger: 0.05,
          },
          "-=0.12",
        );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-10 md:px-10 md:py-14"
    >
      <a
        href="/"
        className="inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-blue)] transition hover:text-[var(--accent-blue-light)]"
      >
        Volver
      </a>

      <section className="flex flex-1 flex-col justify-center py-16 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12">
          <div className="flex justify-start">
            <img
              data-freelance-photo="true"
              src="/profile.jpeg"
              alt="Foto de Markus Abramian Medina"
              className="h-32 w-32 rounded-2xl border border-[var(--border-color)] object-cover md:h-36 md:w-36"
            />
          </div>

          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <p
                data-freelance-copy="true"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-blue)]"
              >
                Freelancer
              </p>
              <h1
                data-freelance-copy="true"
                className="text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl"
              >
                About me
              </h1>
            </div>

            <div className="space-y-5 border-l border-[var(--border-color)] pl-5 md:pl-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  data-freelance-paragraph="true"
                  className="max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
