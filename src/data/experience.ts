import type { ExperienceItem } from "../types/content";

export const experienceHighlightWords = [
  "React",
  "NestJS",
  "MySQL",
  "BDD",
  "TDD",
  "Spring",
  "Boot",
  "Docker",
  "Linux",
  "Angular",
  "Python",
  "Java",
  "TypeScript",
  "FastAPI",
  "Rust",
  "PostgreSQL",
];

export const experienceItems: ExperienceItem[] = [
  {
    id: 1,
    title: {
      en: "Internship at Seahorse",
      es: "Prácticas en Seahorse",
    },
    period: {
      en: "April 2024 - July 2024 (4 months)",
      es: "Abril 2024 - Julio 2024 (4 meses)",
    },
    description: {
      en: [
        "Developed solutions using Angular for the frontend and NestJS for the backend.",
        "Managed relational and non-relational databases, focusing on MySQL.",
        "Implemented unit and integration testing to ensure software quality.",
        "Contributed to designing new architectures for upcoming projects.",
        "Applied BDD and TDD methodologies for efficient and agile development.",
      ],
      es: [
        "Desarrollé soluciones usando Angular para el frontend y NestJS para el backend.",
        "Gestioné bases de datos relacionales y no relacionales, enfocándome en MySQL.",
        "Implementé pruebas unitarias y de integración para asegurar la calidad del software.",
        "Contribuí al diseño de nuevas arquitecturas para próximos proyectos.",
        "Apliqué metodologías BDD y TDD para un desarrollo eficiente y ágil.",
      ],
    },
  },
  {
    id: 2,
    title: {
      en: "Full Stack Developer at Eviden",
      es: "Desarrollador Full Stack en Eviden",
    },
    period: {
      en: "September 2024 - March 2025 (7 months)",
      es: "Septiembre 2024 - Marzo 2025 (7 meses)",
    },
    description: {
      en: [
        "Developed web applications using Spring Boot and Java.",
        "Managed MySQL databases with a focus on performance tuning and schema optimization.",
        "Implemented unit tests to ensure code reliability and maintainability.",
        "Worked under agile methodologies, collaborating with cross-functional teams.",
        "Used Docker for containerization and efficient CI/CD pipeline integration.",
        "Configured and maintained Linux-based environments for deployment and monitoring.",
      ],
      es: [
        "Desarrollé aplicaciones web usando Spring Boot y Java.",
        "Gestioné bases de datos MySQL enfocado en la optimización de rendimiento y esquemas.",
        "Implementé pruebas unitarias para asegurar la fiabilidad y mantenibilidad del código.",
        "Trabajé bajo metodologías ágiles, colaborando con equipos multidisciplinares.",
        "Utilicé Docker para la contenerización e integración eficiente en pipelines de CI/CD.",
        "Configuré y mantuve entornos basados en Linux para despliegue y monitoreo.",
      ],
    },
  },
  {
    id: 3,
    title: {
      en: "Software Developer at Metrotenerife",
      es: "Desarrollador de Software en Metrotenerife",
    },
    period: {
      en: "April 2025 - Present",
      es: "Abril 2025 - Actualidad",
    },
    description: {
      en: [
        "Developed web applications using Spring Boot, Java, and TypeScript following clean architecture principles.",
        "Built dynamic and responsive UIs using React, ensuring usability and accessibility.",
        "Integrated Python-based AI/ML solutions into backend services.",
        "Designed and optimized SQL databases for performance and scalability.",
        "Used Docker for reproducible development and production environments.",
        "Administered Linux servers for application hosting, deployments, and networking configurations.",
      ],
      es: [
        "Desarrollé aplicaciones de software utilizando Java, Python y TypeScript, siguiendo principios de arquitectura limpia.",
        "Construí interfaces de usuario dinámicas y responsivas con React, garantizando usabilidad y accesibilidad.",
        "Integré soluciones de IA/ML en servicios backend.",
        "Diseñé y optimicé bases de datos SQL enfocadas en rendimiento y escalabilidad.",
        "Utilicé Docker para crear entornos de desarrollo y producción reproducibles.",
        "Administré servidores Linux para el alojamiento de aplicaciones, despliegues y configuraciones de red.",
      ],
    },
  },
];
