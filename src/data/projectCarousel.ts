import type { CarouselProject } from "../types/content";

export const projectCarouselItems: CarouselProject[] = [
  {
    id: 1,
    title: "LLM DB CONNECTOR",
    technologies: ["FastAPI", "PostgreSQL"],
    url: "https://github.com/markush0f/LLM-DB-CONECTOR",
    image: "projects/llmdb.png",
  },
  {
    id: 2,
    title: "Virtual Assistant",
    technologies: ["Python", "PostgreSQL", "Docker", "Alembic"],
    url: "https://github.com/markush0f/virtual-assistant",
    image: "projects/assistant.png",
  },
  {
    id: 3,
    title: "TrainTrack",
    technologies: ["VueJS", "Django", "MySQL", "TailwindCSS"],
    url: "https://github.com/markush0f/traintrack",
    image: "projects/train-track.png",
  },
];
