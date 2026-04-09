export type Language = "en" | "es";

export type LocalizedText = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

export type TechnologyCategoryKey =
  | "frameworks"
  | "databases"
  | "languages"
  | "others";

export interface Project {
  id: number;
  name: string;
  description: LocalizedText;
  image: string;
  url: string;
  technologies: string[];
}

export interface CarouselProject {
  id: number;
  title: string;
  technologies: string[];
  url: string;
  image: string;
}

export interface ExperienceItem {
  id: number;
  title: LocalizedText;
  period: LocalizedText;
  description: LocalizedList;
}

export interface EducationItem {
  id: number;
  title: LocalizedText;
  years: string;
  institution: string;
}

export interface Certificate {
  id: number;
  name: string;
  description: LocalizedText;
  image: string;
  downloadLink: string;
}

export interface TechnologyGroup {
  frameworks: string[];
  databases: string[];
  languages: string[];
  others: string[];
}

export interface TechnologyCategory {
  key: TechnologyCategoryKey;
  label: LocalizedText;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Profile {
  fullName: string;
  shortName: string;
  role: LocalizedText;
  email: string;
  profileImage: string;
  resumePath: string;
  socialLinks: SocialLink[];
}

export interface AboutContent {
  paragraphs: LocalizedText[];
  highlightWords: string[];
}

export interface AiAgent {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}
