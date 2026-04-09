import { projects } from "../../../data/projects";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { SectionHeading } from "../../../shared/ui/SectionHeading";
import { TechnologyIconBadge } from "../../../shared/ui/TechnologyIconBadge";
import { ProjectCarousel } from "../components/ProjectCarousel";

export function ProjectsSection() {
  const { language, t } = useLanguage();

  return (
    <div className="px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t("sections.projects")} icon="/icons/code.svg" />

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, index) => (
            <div key={project.id} className="group">
              {index > 0 ? (
                <div className="mb-8 md:hidden">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                </div>
              ) : null}

              <div
                className={`grid grid-cols-1 items-center gap-4 lg:grid-cols-2 ${
                  index % 2 !== 0 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div
                  className={
                    index % 2 !== 0 ? "relative lg:col-start-2" : "relative"
                  }
                >
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden rounded-2xl border border-gray-800 transition-colors duration-200 group-hover:border-gray-700"
                  >
                    <img
                      src={`/${project.image}`}
                      alt={project.name}
                      className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-40 lg:h-48"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex translate-y-4 transform items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                        <span>{t("common.viewProject")}</span>
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                <div
                  className={`space-y-2 ${
                    index % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-400 md:text-xl">
                      {project.name}
                    </h3>
                    <div className="h-0.5 w-16 rounded-full bg-blue-500" />
                  </div>

                  <div className="relative">
                    <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-4 transition-colors duration-200 group-hover:border-gray-700">
                      <p className="text-sm leading-relaxed text-gray-300">
                        {getLocalizedText(project.description, language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.technologies.map((technology) => (
                      <TechnologyIconBadge
                        key={`${project.id}-${technology}`}
                        icon={technology}
                        size="sm"
                      />
                    ))}
                  </div>

                  <div className="pt-4 lg:hidden">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-600 hover:text-white"
                    >
                      <span>{t("common.viewProject")}</span>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ProjectCarousel />
        </div>
      </div>
    </div>
  );
}
