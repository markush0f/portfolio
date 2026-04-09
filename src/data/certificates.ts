import type { Certificate } from "../types/content";

export const certificates: Certificate[] = [
  {
    id: 1,
    name: "Microservice Spring Boot and Spring Cloud",
    description: {
      en: "Certified in Microservice Architecture using Spring Boot and Spring Cloud.",
      es: "Certificado en Arquitectura de Microservicios usando Spring Boot y Spring Cloud.",
    },
    image: "/spring-microservice-certificate.jpg",
    downloadLink: "/spring-microservice-certificate.jpg",
  },
  {
    id: 2,
    name: "React and Next.js",
    description: {
      en: "Certified in React and Next.js.",
      es: "Certificado en React y Next.js.",
    },
    image: "/react-certificate.jpg",
    downloadLink: "/react-certificate.jpg",
  },
];
