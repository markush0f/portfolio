import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";

import { LanguageProvider } from "../src/i18n/LanguageProvider";
import { useLanguage } from "../src/i18n/useLanguage";

function LanguageProbe() {
  const { language, t, toggleLanguage } = useLanguage();

  return (
    <button type="button" onClick={toggleLanguage}>
      {language}:{t("nav.home")}
    </button>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "es";
  });

  it("loads the stored language and updates the document language", async () => {
    window.localStorage.setItem("preferred-lang", "en");

    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    );

    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveTextContent("en:Home"),
    );

    expect(document.documentElement.lang).toBe("en");
  });

  it("toggles and persists the selected language", async () => {
    const user = userEvent.setup();

    render(
      <LanguageProvider>
        <LanguageProbe />
      </LanguageProvider>,
    );

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("en:Home");
    expect(window.localStorage.getItem("preferred-lang")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });
});
