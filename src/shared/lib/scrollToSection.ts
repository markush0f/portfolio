const DEFAULT_NAV_OFFSET = 88;

export function scrollToSection(
  sectionId: string,
  offset = DEFAULT_NAV_OFFSET,
) {
  if (typeof document === "undefined") {
    return;
  }

  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    return;
  }

  const top =
    targetSection.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}
