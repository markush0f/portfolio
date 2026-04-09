import { useEffect, useState } from "react";

import { profile } from "../../data/profile";
import { useLanguage } from "../../i18n/useLanguage";
import { cn } from "../../shared/lib/cn";
import { scrollToSection } from "../../shared/lib/scrollToSection";

const navigationItems = [
  { id: "home", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "certificates", labelKey: "nav.certificates" },
  { id: "technologies", labelKey: "nav.technologies" },
] as const;

function getActiveSection() {
  const offset = 160;

  for (let index = navigationItems.length - 1; index >= 0; index -= 1) {
    const section = document.getElementById(navigationItems[index].id);

    if (section && section.getBoundingClientRect().top <= offset) {
      return navigationItems[index].id;
    }
  }

  return "home";
}

export function PortfolioNavbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
      setActiveSection(getActiveSection());
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent px-3 py-3 transition-all duration-300 lg:px-6",
        scrolled && "border-gray-800/70 bg-[#101114]/95 backdrop-blur-lg",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <button
          type="button"
          onClick={toggleLanguage}
          className="shrink-0 rounded-md border border-gray-700 bg-gray-800/50 px-2.5 py-1.5 text-[10px] font-medium text-gray-300 transition-all duration-300 hover:border-gray-600 hover:bg-gray-700/50 hover:text-white md:text-xs"
        >
          <span className={cn(language === "en" && "font-bold text-blue-400")}>
            EN
          </span>
          <span className="mx-1 text-gray-500">|</span>
          <span className={cn(language === "es" && "font-bold text-blue-400")}>
            ES
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className={cn(
            "mr-auto hidden items-center gap-3 overflow-hidden rounded-full border border-transparent px-2 py-1 text-left transition-all duration-300 sm:flex",
            scrolled ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <img
            src={profile.profileImage}
            alt={profile.fullName}
            className="h-9 w-9 rounded-full border-2 border-gray-800 object-cover"
          />
          <span className="max-w-[180px] truncate text-sm font-semibold text-white">
            {profile.fullName}
          </span>
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-300 transition-colors duration-200 hover:bg-gray-800/50 hover:text-white sm:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((currentState) => !currentState)}
        >
          <svg
            className={cn("h-6 w-6", menuOpen && "hidden")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={cn("h-6 w-6", !menuOpen && "hidden")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div
          className={cn(
            "absolute left-0 right-0 top-full hidden flex-col gap-1 border-b border-gray-800 bg-[#101114]/95 px-4 py-4 shadow-lg backdrop-blur-lg sm:static sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-2 sm:border-none sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none",
            menuOpen && "flex",
          )}
        >
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={cn(
                "rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-gray-800/70 hover:text-white sm:text-center",
                activeSection === item.id && "bg-gray-800/70 text-white",
              )}
            >
              {t(item.labelKey)}
            </button>
          ))}

          <a
            href={profile.resumePath}
            download="MARKUS-RESUME.pdf"
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-500 px-3 py-2 text-xs font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-600 hover:text-white sm:ml-2 sm:mt-0"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {t("nav.resume")}
          </a>
        </div>
      </div>
    </nav>
  );
}
