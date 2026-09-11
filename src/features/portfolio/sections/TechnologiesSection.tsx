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
        <SectionHeading
          title={t("sections.technologies")}
          icon="/icons/technology.svg"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {technologyCategories.map((category) => (
            <div key={category.key} className="group relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

              <div className="relative h-full rounded-2xl border border-gray-800 bg-gray-900/80 p-4 transition-colors duration-200 hover:border-gray-700">
                <div className="mb-4 text-center">
                  <h3 className="text-base font-bold text-blue-400 transition-colors duration-300 group-hover:text-blue-300 md:text-lg">
                    {getLocalizedText(category.label, language)}
                  </h3>
                  <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-blue-500" />
                </div>

                <ul className="flex flex-wrap justify-center gap-6">
                  {technologyGroups[category.key].map((technology) => (
                    <li key={technology}>
                      <TechnologyIconBadge
                        icon={technology}
                        size="md"
                        tooltip
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
