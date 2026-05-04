export const freelanceProfile = {
  hero: {
    name: "Markus Abramian Medina",
    title: "Desarrollo web y aplicaciones",
    subtitle: "Proyectos concretos para negocios y equipos técnicos.",
    cta: "Escribeme",
    ctaHref: "mailto:abramianmedina@gmail.com",
  },
  services: [
    {
      title: "Webs para negocios",
      description: "Landing pages, webs corporativas y catálogos para negocios locales.",
      icon: "Globe",
    },
    {
      title: "Apps operativas",
      description: "Reservas, membresías, pedidos y gestión diaria para gimnasios, clínicas y retail.",
      icon: "Dumbbell",
    },
    {
      title: "Producto técnico",
      description: "Dashboards, portales y MVPs para equipos de software.",
      icon: "Blocks",
    },
  ],
  projects: [
    {
      name: "App de gestión de clases",
      description: "Aplicación para gestionar clases, reservas y membresías de un gimnasio. Incluye panel de administración y app para clientes.",
      tech: ["React", "FastAPI", "PostgreSQL", "Docker"],
      status: "Completado",
    },
  ],
  contact: {
    email: "abramianmedina@gmail.com",
    linkedin: "https://www.linkedin.com/in/markus-abramian-medina-1b0281273/",
    availability: "Disponible para proyectos",
  },
} as const;