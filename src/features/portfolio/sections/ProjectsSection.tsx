import { ArrowUpRight, Layers3 } from "lucide-react";

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
        <SectionHeading title={t("sections.projects")} icon={Layers3} />
        <div className="space-y-10 md:space-y-14">
          {projects.map((project, index) => (
            <div key={project.id} className="group">
              <div className={`grid grid-cols-1 items-center gap-6 lg:grid-cols-2 ${index % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
                <div className={index % 2 !== 0 ? "relative lg:col-start-2" : "relative"}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden rounded-3xl border border-white/10 transition hover:border-white/20">
                    <img src={`/${project.image}`} alt={project.name} className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 md:h-44 lg:h-52" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-[#071018]">
                        <span>{t("common.viewProject")}</span>
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                      </div>
                    </div>
                  </a>
                </div>
                <div className={`space-y-3 ${index % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white transition group-hover:text-sky-300">{project.name}</h3>
                    <div className="h-px w-12 bg-sky-400/80" />
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm leading-relaxed text-white/70">{getLocalizedText(project.description, language)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {project.technologies.map((technology) => (
                      <TechnologyIconBadge key={`${project.id}-${technology}`} icon={technology} size="sm" />
                    ))}
                  </div>
                  <div className="pt-3 lg:hidden">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-[#071018]">
                      <span>{t("common.viewProject")}</span>
                      <ArrowUpRight className="h-4 w-4" />
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
