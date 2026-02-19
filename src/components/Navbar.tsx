import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#aboutme", label: "About me" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

const Navbar = () => {
  const navbarRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  // Track scroll position to toggle styling and profile visibility.
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track viewport width to decide when the menu should stay open.
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 640;
      setIsDesktop(desktop);
      setMenuOpen(desktop);

      // Keep mobile menu aligned below the navbar height.
      setNavHeight(navbarRef.current?.offsetHeight ?? 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuVisible = useMemo(() => isDesktop || menuOpen, [isDesktop, menuOpen]);
  const menuTop = useMemo(() => (!isDesktop && navHeight ? navHeight : undefined), [isDesktop, navHeight]);

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      const navbarHeight = navbarRef.current?.offsetHeight ?? 0;
      const offset = 20;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight - offset;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }

    if (!isDesktop) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    if (isDesktop) return;
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav
      ref={navbarRef}
      id="navbar"
      className={`fixed top-0 inset-x-0 flex justify-between items-center gap-4 p-2 z-50 transition-all duration-300
        sm:justify-start px-3 lg:px-6 max-w-full
        ${scrolled ? "shadow-lg border-b border-gray-800/50" : ""}`}
      style={
        scrolled
          ? {
            backgroundColor: "#141518",
          }
          : {
            background: "transparent",
          }
      }
    >
      <div
        id="scroll-content"
        className={`mr-auto lg:ml-20 flex items-center gap-3 transform transition-all duration-300
          ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r rounded-full opacity-75 blur" />
          <img
            src="profile.jpeg"
            alt="Markus Abramian Medina"
            className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-gray-800"
          />
        </div>
        <h1 className="text-xs md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Markus Abramian Medina
        </h1>
      </div>

      <button
        id="menu-toggle"
        className="sm:hidden p-2 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-110"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <svg
          id="menu-icon"
          className={`w-7 h-7 text-gray-300 ${menuOpen ? "hidden" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          id="close-icon"
          className={`w-7 h-7 text-gray-300 ${menuOpen ? "" : "hidden"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        id="menu"
        className={`${menuVisible ? "flex" : "hidden"} fixed left-0 right-0 w-full border-b border-gray-800
          sm:flex sm:flex-row sm:static sm:bg-transparent sm:border-none sm:w-auto
          flex-col items-center gap-1 sm:gap-2 lg:gap-4 py-4 sm:py-0 shadow-lg sm:shadow-none`}
        style={
          menuVisible && !isDesktop
            ? {
              backgroundColor: "#141518",
              top: menuTop,
            }
            : (menuTop
              ? ({
                top: menuTop,
              } as CSSProperties)
              : undefined)
        }
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={handleNavClick(item.href)}
            className="nav-item group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium"
          >
            <span className="relative z-10 text-sm">{item.label}</span>
            <div
              className="absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 opacity-50"
              style={{
                backgroundColor: "#1d1f24",
              }}
            />
          </a>
        ))}

        <div className="relative group sm:ml-2">
          <a
            href="/Resume.pdf"
            download="MARKUS-RESUME.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-300 hover:scale-105 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="hidden sm:inline">CV</span>
          </a>

          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl border border-gray-700">
              Download CV
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
