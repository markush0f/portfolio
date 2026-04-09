import type { Language } from "../types/content";

export const languages: Record<Language, string> = {
  en: "English",
  es: "Español",
};

export const defaultLang: Language = "es";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.certificates": "Certificates",
    "nav.technologies": "Technologies",
    "nav.resume": "Resume",
    "sections.about": "About Me",
    "sections.education": "Education",
    "sections.experience": "Experience",
    "sections.projects": "Projects",
    "sections.moreProjects": "More Projects",
    "sections.certificates": "Certificates",
    "sections.technologies": "Technologies",
    "common.viewProject": "View Project",
    "common.clickToView": "Click to view",
    "common.verifiedCertificate": "Verified Certificate",
    "common.downloadResume": "Download resume",
    "common.downloadCertificate": "Download certificate",
    "common.scrollNext": "Scroll to next section",
    "chatbot.title": "Assistant",
    "chatbot.quickQuestions": "Quick questions",
    "chatbot.initialMessage": "Hi! Ask me something about Markus.",
    "chatbot.statusOnline": "Online",
    "chatbot.statusOffline": "Unavailable",
    "chatbot.placeholder": "Type a message...",
    "chatbot.placeholderUnavailable": "Assistant unavailable right now",
    "chatbot.unavailable":
      "The assistant is unavailable because the API is not configured.",
    "chatbot.error":
      "The assistant could not answer right now. Please try again in a moment.",
    "chatbot.toggleOpen": "Open assistant",
    "chatbot.toggleClose": "Close assistant",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.certificates": "Certificados",
    "nav.technologies": "Tecnologías",
    "nav.resume": "CV",
    "sections.about": "Sobre mí",
    "sections.education": "Educación",
    "sections.experience": "Experiencia",
    "sections.projects": "Proyectos",
    "sections.moreProjects": "Más proyectos",
    "sections.certificates": "Certificados",
    "sections.technologies": "Tecnologías",
    "common.viewProject": "Ver proyecto",
    "common.clickToView": "Ver certificado",
    "common.verifiedCertificate": "Certificado verificado",
    "common.downloadResume": "Descargar CV",
    "common.downloadCertificate": "Descargar certificado",
    "common.scrollNext": "Ir a la siguiente sección",
    "chatbot.title": "Asistente",
    "chatbot.quickQuestions": "Preguntas rápidas",
    "chatbot.initialMessage": "Hola. Pregúntame algo sobre Markus.",
    "chatbot.statusOnline": "Activo",
    "chatbot.statusOffline": "No disponible",
    "chatbot.placeholder": "Escribe un mensaje...",
    "chatbot.placeholderUnavailable":
      "El asistente no está disponible ahora mismo",
    "chatbot.unavailable":
      "El asistente no está disponible porque la API no está configurada.",
    "chatbot.error":
      "El asistente no pudo responder ahora mismo. Inténtalo de nuevo en un momento.",
    "chatbot.toggleOpen": "Abrir asistente",
    "chatbot.toggleClose": "Cerrar asistente",
  },
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
