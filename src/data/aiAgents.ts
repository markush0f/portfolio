import type { AiAgent } from "../types/content";

export const aiAgents: AiAgent[] = [
  {
    name: "Personal Assistant",
    description:
      "An AI agent capable of managing tasks, scheduling, and providing personalized reminders.",
    technologies: ["Python", "OpenAI", "FastAPI"],
  },
  {
    name: "Code Reviewer",
    description:
      "Automated agent that reviews pull requests, suggesting improvements and detecting bugs.",
    technologies: ["TypeScript", "LangChain", "GitHub API"],
  },
  {
    name: "Data Analyst",
    description:
      "Processes large datasets to extract insights and generate visual reports automatically.",
    technologies: ["Python", "Pandas", "Matplotlib"],
  },
];
