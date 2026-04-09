import type { Language, LocalizedText } from "../types/content";
import { defaultLang, type TranslationKey, ui } from "./ui";

const STORAGE_KEY = "preferred-lang";

export function isLanguage(value: string): value is Language {
  return value === "en" || value === "es";
}

export function getTranslation(
  language: Language,
  key: TranslationKey,
): string {
  return ui[language][key] ?? ui[defaultLang][key];
}

export function getLocalizedText(
  value: LocalizedText,
  language: Language,
): string {
  return value[language] ?? value[defaultLang];
}

export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return savedLanguage && isLanguage(savedLanguage) ? savedLanguage : null;
}

export function setStoredLanguage(language: Language): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, language);
}

export function applyDocumentLanguage(language: Language): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = language;
  document.documentElement.setAttribute("data-lang", language);
}

export { defaultLang };
