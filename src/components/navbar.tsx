import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = (): void => {
    if (window.scrollY > 400 || window.innerWidth < 680) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleMenuToggle = (): void => {
    if (window.innerWidth < 680) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const smoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string): void => {
    event.preventDefault();
    const target = document.getElementById(targetId);

    if (target) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const offset = 20;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Element with ID '${targetId}' not found!`);
    }

    if (window.innerWidth < 680) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 680) {
        setIsMenuOpen(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => { });
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed w-full flex justify-between items-center gap-4 p-5 z-50 transition-all duration-100 ${isScrolled ? "bg-[#1e1e1e]" : ""
        }`}
    >
      <div
        id="scroll-content"
        className={`mr-auto lg:ml-20 flex items-center transition-all duration-300 ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
      >
        <img src="profile.jpeg" alt="profile" className="w-14 rounded-full" />
        <h1 className="ml-4 lg:text-xl text-sm md:text-lg">
          Markus Abramian Medina
        </h1>
      </div>
      <button
        id="menu-toggle"
        className="sm:hidden p-2 focus:outline-none transform transition-all duration-300 hover:scale-110"
        onClick={handleMenuToggle}
      >
        <img src="icons/menu.svg" alt="menu" className="w-8" />
      </button>
      <div
        id="menu"
        className={`${isMenuOpen ? "flex" : "hidden"
          } fixed top-20 left-0 right-0 w-full sm:border-b-0 sm:rounded-none border-b rounded-b flex-col pb-2 bg-[#1e1e1e] items-center z-40 sm:flex sm:flex-row sm:static sm:bg-transparent sm:shadow-none sm:w-auto`}
      >
        <a
          href="#home"
          className="nav-item transform transition-all duration-300 hover:scale-110 hover:text-highlighted p-2"
          onClick={(e) => smoothScroll(e, "home")}
        >
          Home
        </a>
        <a
          href="#aboutme"
          className="nav-item p-2 transform transition-all duration-300 hover:scale-110 hover:text-highlighted flex sm:inline-flex"
          onClick={(e) => smoothScroll(e, "aboutme")}
        >
          About <span className="ml-1">me</span>
        </a>
        <a
          href="#experience"
          className="nav-item transform transition-all duration-300 hover:scale-110 hover:text-highlighted p-2"
          onClick={(e) => smoothScroll(e, "experience")}
        >
          Experience
        </a>
        <a
          href="#projects"
          className="nav-item transform transition-all duration-300 hover:scale-110 hover:text-highlighted p-2"
          onClick={(e) => smoothScroll(e, "projects")}
        >
          Projects
        </a>
        <div className="relative group transform transition-all duration-300 hover:scale-110">
          <a href="/Resume.pdf" download="MARKUS-RESUME.pdf">
            <img src="icons/cv.svg" alt="cv" className="w-8 sm:ml-4" />
          </a>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 w-auto">
            Download CV
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
