import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    id: 1,
    name: "ENTITY GENERATOR",
    description: {
      en: "Web application created to generate entities for Spring projects. It allows defining attributes and relationships, validates data in real-time, and offers the download of the generated Java code.",
      es: "Aplicación web creada para generar entidades para proyectos Spring. Permite definir atributos y relaciones, valida datos en tiempo real y ofrece la descarga del código Java generado.",
    },
    image: "projects/entity-generator.png",
    url: "http://entity-generator.vercel.app",
    technologies: ["astro.svg", "react.svg", "tailwind.svg"],
  },
  {
    id: 2,
    name: "NEXT CALL DEV",
    description: {
      en: "The NextCallDev backend consists of microservices developed in Spring Boot and Node.js that work together to provide real-time web video calls for the development world.",
      es: "El backend de NextCallDev consiste en microservicios desarrollados en Spring Boot y Node.js que trabajan juntos para proporcionar videollamadas web en tiempo real para el mundo del desarrollo.",
    },
    image: "projects/next-call-dev.png",
    url: "https://github.com/markush0f/NextCallDevBack",
    technologies: [
      "spring.svg",
      "nodejs.svg",
      "docker.svg",
      "postgresql.svg",
      "mysql.svg",
    ],
  },
  {
    id: 3,
    name: "ChatBOT",
    description: {
      en: "Chatbot RAG is an intelligent assistant developed with FastAPI, PostgreSQL, and Next.js, capable of answering questions based on documents selected by the user. It integrates a RAG system. The system allows document upload, vector generation, and chats linked to the selected knowledge base.",
      es: "Chatbot RAG es un asistente inteligente desarrollado con FastAPI, PostgreSQL y Next.js, capaz de responder preguntas basadas en documentos seleccionados por el usuario. Integra un sistema RAG y permite subir documentos, generar vectores y mantener chats vinculados a la base de conocimiento elegida.",
    },
    image: "projects/chatbot.png",
    url: "https://github.com/markush0f/rag-chatbot",
    technologies: ["fastapi.svg", "postgresql.svg", "docker.svg"],
  },
  {
    id: 4,
    name: "Architecture Generator",
    description: {
      en: "An application that streamlines project creation and management with AI, organizing information, enabling smart retrieval, and generating meaningful insights to support the development process.",
      es: "Una aplicación que agiliza la creación y gestión de proyectos con IA, organizando información, permitiendo recuperación inteligente y generando insights significativos para apoyar el proceso de desarrollo.",
    },
    image: "projects/generator-archinfra.png",
    url: "https://github.com/markush0f/generator-archinfra",
    technologies: [
      "fastapi.svg",
      "docker.svg",
      "postgresql.svg",
      "vitejs.svg",
      "react.svg",
    ],
  },
  {
    id: 5,
    name: "IRANet",
    description: {
      en: "IRANet is a read-only observability and system introspection platform for Linux servers, designed for developers and technical teams who need real visibility into what is actually running on a host.",
      es: "IRANet es una plataforma de observabilidad e introspección de sistemas de solo lectura para servidores Linux, diseñada para desarrolladores y equipos técnicos que necesitan visibilidad real de lo que se está ejecutando en un host.",
    },
    image: "projects/iranet.png",
    url: "https://github.com/markush0f/IRANet",
    technologies: [
      "fastapi.svg",
      "docker.svg",
      "postgresql.svg",
      "vitejs.svg",
      "react.svg",
    ],
  },
  {
    id: 6,
    name: "Vault Secret Scanner",
    description: {
      en: "A hyper-fast local secret scanner CLI written in Rust that inspects repositories, servers, and configuration files for exposed API tokens and hardcoded keys, combining heuristic analysis, Blake3 caching, and an interactive TUI.",
      es: "Un escáner local de secretos ultrarrápido escrito en Rust que inspecciona repositorios, servidores y archivos de configuración en busca de tokens API expuestos y claves hardcodeadas, combinando análisis heurístico, caché con Blake3 y una TUI interactiva.",
    },
    image: "projects/vsc.png",
    url: "https://github.com/markush0f/vault-secret-scanner",
    technologies: ["rust.svg"],
  },
];
