import { Cpu } from "lucide-react";

import { technologyCategories } from "../../../data/technologyCategories";
import { technologyGroups } from "../../../data/technologies";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { SectionHeading } from "../../../shared/ui/SectionHeading";
import { TechnologyIconBadge } from "../../../shared/ui/TechnologyIconBadge";

export function TechnologiesSection() {
  const { language, t } = useLanguage();

  return (
    <div className="px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t("sections.technologies")} icon={Cpu} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {technologyCategories.map((category) => (
            <div key={category.key} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-5 text-center">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                  {getLocalizedText(category.label, language)}
                </h3>
              </div>
              <ul className="flex flex-wrap justify-center gap-4">
                {technologyGroups[category.key].map((technology) => (
                  <li key={technology}>
                    <TechnologyIconBadge icon={technology} size="md" tooltip />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
