export const projects = [
  {
    id: 1,
    name: "ENTITY GENERATOR",
    descriptionEn:
      "Web application created to generate entities for Spring projects. It allows defining attributes and relationships, validates data in real-time, and offers the download of the generated Java code.",
    descriptionEs:
      "Aplicación web creada para generar entidades para proyectos Spring. Permite definir atributos y relaciones, valida datos en tiempo real y ofrece la descarga del código Java generado.",
    img: "projects/entity-generator.png",
    url: "http://entity-generator.vercel.app",
    technologies: ["astro.svg", "react.svg", "tailwind.svg"],
  },
  {
    id: 2,
    name: "NEXT CALL DEV",
    descriptionEn:
      "The NextCallDev backend consists of microservices developed in Spring Boot and Node.js that work together to provide real-time web video calls for the development world.",
    descriptionEs:
      "El backend de NextCallDev consiste en microservicios desarrollados en Spring Boot y Node.js que trabajan juntos para proporcionar videollamadas web en tiempo real para el mundo del desarrollo.",
    img: "projects/next-call-dev.png",
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
    descriptionEn:
      "Chatbot RAG is an intelligent assistant developed with FastAPI, PostgreSQL, and Next.js, capable of answering questions based on documents selected by the user. It integrates a RAG system. The system allows you to manage and upload documents, automatically generate their vector representations, and maintain chats linked to them.",
    descriptionEs:
      "Chatbot RAG es un asistente inteligente desarrollado con FastAPI, PostgreSQL y Next.js, capaz de responder preguntas basadas en documentos seleccionados por el usuario. Integra un sistema RAG. El sistema permite gestionar y subir documentos, generar automáticamente sus representaciones vectoriales y mantener chats vinculados a ellos.",
    img: "projects/chatbot.png",
    url: "https://github.com/markush0f/rag-chatbot",
    technologies: ["fastapi.svg", "postgresql.svg", "docker.svg"],
  },
  {
    id: 4,
    name: "Architecture Generator",
    descriptionEn:
      "An application that streamlines project creation and management with AI, organizing information, enabling smart retrieval, and generating meaningful insights to support the development process.",
    descriptionEs:
      "Una aplicación que agiliza la creación y gestión de proyectos con IA, organizando información, permitiendo recuperación inteligente y generando insights significativos para apoyar el proceso de desarrollo.",
    img: "projects/generator-archinfra.png",
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
    descriptionEn:
      "IRANet is a read-only observability and system introspection platform for Linux servers, designed for developers and technical teams who need real visibility into what is actually running on a host.",
    descriptionEs:
      "IRANet es una plataforma de observabilidad e introspección de sistemas de solo lectura para servidores Linux, diseñada para desarrolladores y equipos técnicos que necesitan visibilidad real de lo que se está ejecutando en un host.",
    img: "projects/iranet.png",
    url: "https://github.com/markush0f/IRANet",
    technologies: [
      "fastapi.svg",
      "docker.svg",
      "postgresql.svg",
      "vitejs.svg",
      "react.svg",
    ],
  },
];
