import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Language } from "../types/content";
import { defaultLang, type TranslationKey } from "./ui";
import {
  applyDocumentLanguage,
  getStoredLanguage,
  getTranslation,
  setStoredLanguage,
} from "./utils";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLang);

  useEffect(() => {
    const storedLanguage = getStoredLanguage();

    if (storedLanguage) {
      setLanguageState(storedLanguage);
    } else {
      applyDocumentLanguage(defaultLang);
    }
  }, []);

  useEffect(() => {
    applyDocumentLanguage(language);
    setStoredLanguage(language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      toggleLanguage: () =>
        setLanguageState((currentLanguage) =>
          currentLanguage === "es" ? "en" : "es",
        ),
      t: (key) => getTranslation(language, key),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext };
