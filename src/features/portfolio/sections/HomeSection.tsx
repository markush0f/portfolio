import { profile } from "../../../data/profile";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { scrollToSection } from "../../../shared/lib/scrollToSection";

export function HomeSection() {
  const { language, t } = useLanguage();
  const [firstName, ...restName] = profile.fullName.split(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-5 pb-10 pt-24 lg:flex-row lg:gap-20"
    >
      <div className="flex flex-col gap-6 text-center lg:text-left">
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <h1 className="text-5xl text-white md:text-7xl lg:text-6xl">
            {firstName.toUpperCase()}
          </h1>
          <p className="text-xl text-blue-500 md:text-3xl lg:text-2xl">
            {getLocalizedText(profile.role, language)}
          </p>
        </div>
        <p className="text-4xl text-white md:text-5xl lg:text-6xl">
          {restName.join(" ").toUpperCase()}
        </p>

        <ul className="flex justify-center gap-5 lg:justify-start">
          {profile.socialLinks
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="w-6 transition duration-300 hover:scale-110 hover:opacity-80 md:w-8 lg:w-7"
                  />
                </a>
              </li>
            ))}
        </ul>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-3xl" />
        <img
          src={profile.profileImage}
          alt={profile.fullName}
          className="relative h-40 w-40 rounded-full border border-gray-800 object-cover md:h-56 md:w-56 lg:h-80 lg:w-80"
        />
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          aria-label={t("common.scrollNext")}
          className="rounded-full p-2"
        >
          <img src="/down.svg" alt="" aria-hidden="true" className="w-20" />
        </button>
      </div>
    </section>
  );
}
