import {
  experienceHighlightWords,
  experienceItems,
} from "../../../data/experience";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { HighlightedText } from "../../../shared/ui/HighlightedText";
import { SectionHeading } from "../../../shared/ui/SectionHeading";
import { Timeline, TimelineItem } from "../../../shared/ui/Timeline";

export function ExperienceSection() {
  const { language, t } = useLanguage();

  return (
    <div className="px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title={t("sections.experience")}
          icon="/icons/work.svg"
        />

        <Timeline>
          {experienceItems.map((experience) => (
            <TimelineItem key={experience.id}>
              <div className="mb-3 space-y-1">
                <h3 className="text-lg font-semibold text-blue-400 transition-colors duration-300 group-hover:text-blue-300 md:text-xl">
                  {getLocalizedText(experience.title, language)}
                </h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg
                    className="h-3 w-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs md:text-sm">
                    {getLocalizedText(experience.period, language)}
                  </span>
                </div>
              </div>

              <ul className="space-y-1">
                {experience.description[language].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-gray-300"
                  >
                    <span className="mt-1.5 shrink-0 text-blue-500">▹</span>
                    <HighlightedText
                      text={item}
                      highlights={experienceHighlightWords}
                      className="flex-1"
                    />
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
