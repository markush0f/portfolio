import type { Profile } from "../types/content";

export const profile: Profile = {
  fullName: "Markus Abramian Medina",
  shortName: "MARKUS",
  role: {
    en: "Full Stack Developer",
    es: "Desarrollador Full Stack",
  },
  email: "abramianmedina@gmail.com",
  profileImage: "/profile.jpeg",
  resumePath: "/Resume.pdf",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/markush0f",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/markus-abramian-medina-1b0281273/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:abramianmedina@gmail.com",
      icon: "mail",
    },
  ],
};
