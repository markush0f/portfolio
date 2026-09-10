import { useEffect, useState } from "react";
import { Code2, Download, Menu, X } from "lucide-react";

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
        "fixed inset-x-0 top-0 z-50 px-3 py-3 transition-all duration-300 lg:px-6",
        scrolled && "bg-[#07090d]/80 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <button
          type="button"
          onClick={toggleLanguage}
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-white/60 transition hover:border-white/20 hover:text-white md:text-xs"
        >
          <span className={cn(language === "en" && "font-semibold text-sky-300")}>
            EN
          </span>
          <span className="mx-1 text-white/25">/</span>
          <span className={cn(language === "es" && "font-semibold text-sky-300")}>
            ES
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className={cn(
            "mr-auto hidden items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-left transition-all duration-300 sm:flex",
            scrolled ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Code2 className="h-4 w-4 text-sky-300" strokeWidth={1.75} />
          <span className="max-w-[180px] truncate text-sm font-medium text-white">
            {profile.fullName}
          </span>
        </button>

        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-white/70 transition hover:bg-white/[0.06] hover:text-white sm:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((currentState) => !currentState)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          )}
        </button>

        <div
          className={cn(
            "absolute left-0 right-0 top-full hidden flex-col gap-1 border-b border-white/10 bg-[#07090d]/95 px-4 py-4 shadow-lg backdrop-blur-xl sm:static sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-1 sm:border-none sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none",
            menuOpen && "flex",
          )}
        >
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={cn(
                "rounded-full px-3.5 py-2 text-left text-sm font-medium text-white/55 transition hover:bg-white/[0.06] hover:text-white sm:text-center",
                activeSection === item.id && "bg-white/[0.08] text-white",
              )}
            >
              {t(item.labelKey)}
            </button>
          ))}

          <a
            href={profile.resumePath}
            download="MARKUS-RESUME.pdf"
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-sky-400 px-4 py-2 text-xs font-semibold text-[#071018] transition hover:bg-sky-300 sm:ml-2 sm:mt-0"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            {t("nav.resume")}
          </a>
        </div>
      </div>
    </nav>
  );
}
