import { ChevronDown } from "lucide-react";

import { profile } from "../../../data/profile";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { scrollToSection } from "../../../shared/lib/scrollToSection";
import { SocialIcon } from "../../../shared/ui/SocialIcons";

export function HomeSection() {
  const { language, t } = useLanguage();
  const [firstName, ...restName] = profile.fullName.split(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-5 pb-16 pt-24 lg:flex-row lg:gap-24"
    >
      <div className="flex flex-col gap-6 text-center lg:text-left">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-300/80">
          {getLocalizedText(profile.role, language)}
        </p>
        <div className="space-y-2">
          <h1 className="text-5xl font-light tracking-tight text-white md:text-7xl">
            {firstName}
          </h1>
          <p className="text-4xl font-semibold tracking-tight text-white/92 md:text-6xl">
            {restName.join(" ")}
          </p>
        </div>
        <ul className="flex justify-center gap-3 lg:justify-start">
          {profile.socialLinks
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:text-sky-300"
                >
                  <SocialIcon name={link.icon} />
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div className="relative">
        <div className="absolute -inset-8 rounded-full bg-sky-400/10 blur-3xl" />
        <img
          src={profile.profileImage}
          alt={profile.fullName}
          className="relative h-44 w-44 rounded-full border border-white/10 object-cover shadow-[0_0_80px_rgba(56,189,248,0.16)] md:h-60 md:w-60 lg:h-80 lg:w-80"
        />
      </div>
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          aria-label={t("common.scrollNext")}
          className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/50 transition hover:text-sky-300"
        >
          <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
