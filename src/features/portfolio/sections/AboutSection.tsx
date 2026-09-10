import { GraduationCap, Landmark, UserRound } from "lucide-react";

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
    <div className="px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t("sections.about")} icon={UserRound} />
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
          {aboutContent.paragraphs.map((paragraph, index) => (
            <p
              key={`${language}-about-${index}`}
              className="text-sm leading-relaxed text-white/70 md:text-base"
            >
              <HighlightedText
                text={getLocalizedText(paragraph, language)}
                highlights={aboutContent.highlightWords}
              />
            </p>
          ))}
        </div>
        <SectionHeading title={t("sections.education")} icon={GraduationCap} compact />
        <Timeline>
          {educationItems.map((item) => (
            <TimelineItem key={item.id}>
              <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <h3 className="text-base font-semibold text-white">
                  {getLocalizedText(item.title, language)}
                </h3>
                <span className="inline-flex w-fit items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-0.5 text-xs font-medium text-sky-300">
                  {item.years}
                </span>
              </div>
              <p className="flex items-center gap-2 text-sm text-white/50">
                <Landmark className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {item.institution}
              </p>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
