import type { Language } from "../../types/content";

const monthNames: Record<Language, string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
};

function parseYearMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function getInclusiveMonths(startDate: string, endDate: string) {
  const start = parseYearMonth(startDate);
  const end = parseYearMonth(endDate);

  return Math.max(
    1,
    (end.year - start.year) * 12 + (end.month - start.month) + 1,
  );
}

function formatMonthYear(value: string, language: Language) {
  const { year, month } = parseYearMonth(value);
  return `${monthNames[language][month - 1]} ${year}`;
}

function currentYearMonth() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}

export function formatExperiencePeriod(
  startDate: string,
  endDate: string | undefined,
  language: Language,
) {
  const resolvedEndDate = endDate ?? currentYearMonth();
  const months = getInclusiveMonths(startDate, resolvedEndDate);
  const startLabel = formatMonthYear(startDate, language);
  const endLabel = endDate
    ? formatMonthYear(endDate, language)
    : language === "es"
      ? "Actualidad"
      : "Present";
  const monthsLabel =
    language === "es"
      ? months === 1
        ? "1 mes"
        : `${months} meses`
      : months === 1
        ? "1 month"
        : `${months} months`;

  return `${startLabel} - ${endLabel} (${monthsLabel})`;
}
