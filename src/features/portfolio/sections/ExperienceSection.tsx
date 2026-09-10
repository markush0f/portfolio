import { BriefcaseBusiness, CalendarDays } from "lucide-react";

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
        <SectionHeading title={t("sections.experience")} icon={BriefcaseBusiness} />
        <Timeline>
          {experienceItems.map((experience) => (
            <TimelineItem key={experience.id}>
              <div className="mb-3 space-y-1">
                <h3 className="text-lg font-semibold text-sky-300 md:text-xl">
                  {getLocalizedText(experience.title, language)}
                </h3>
                <div className="flex items-center gap-2 text-white/45">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  <span className="text-xs md:text-sm">
                    {getLocalizedText(experience.period, language)}
                  </span>
                </div>
              </div>
              <ul className="space-y-1.5">
                {experience.description[language].map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-white/70">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                    <HighlightedText text={item} highlights={experienceHighlightWords} className="flex-1" />
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
