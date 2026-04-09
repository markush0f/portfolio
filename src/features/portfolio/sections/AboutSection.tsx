import { aboutContent } from "../../../data/about";
import { educationItems } from "../../../data/education";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { HighlightedText } from "../../../shared/ui/HighlightedText";
import { SectionHeading } from "../../../shared/ui/SectionHeading";
import { Timeline, TimelineItem } from "../../../shared/ui/Timeline";

export function AboutSection() {
  const { language, t } = useLanguage();

  return (
    <div className="px-5 py-6 md:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t("sections.about")} icon="/icons/code.svg" />

        <div className="group relative mb-8">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

          <div className="relative rounded-2xl border border-gray-800 bg-gray-900/80 p-4 transition-colors duration-200 hover:border-gray-700 md:p-6">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p
                key={`${language}-about-${index}`}
                className="text-sm leading-relaxed text-gray-300 md:text-base"
              >
                <HighlightedText
                  text={getLocalizedText(paragraph, language)}
                  highlights={aboutContent.highlightWords}
                />
              </p>
            ))}
          </div>
        </div>

        <SectionHeading
          title={t("sections.education")}
          icon="/icons/certificate.svg"
          compact
        />

        <Timeline>
          {educationItems.map((item) => (
            <TimelineItem key={item.id}>
              <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
                  {getLocalizedText(item.title, language)}
                </h3>
                <span className="inline-flex w-fit items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                  {item.years}
                </span>
              </div>
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {item.institution}
              </p>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
