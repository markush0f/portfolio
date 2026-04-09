import { useState } from "react";

import { projectCarouselItems } from "../../../data/projectCarousel";
import { useLanguage } from "../../../i18n/useLanguage";

export function ProjectCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projectCarouselItems[currentIndex];

  const showPreviousProject = () => {
    setCurrentIndex((current) =>
      current === 0 ? projectCarouselItems.length - 1 : current - 1,
    );
  };

  const showNextProject = () => {
    setCurrentIndex((current) =>
      current === projectCarouselItems.length - 1 ? 0 : current + 1,
    );
  };

  const openCurrentProject = () => {
    window.open(currentProject.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-lg">
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-bold text-white md:text-xl">
            {t("sections.moreProjects")}
          </h3>
          <div className="h-0.5 w-16 rounded-full bg-blue-500" />
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

          <div
            className="relative h-40 cursor-pointer overflow-hidden rounded-2xl border border-gray-800 transition-colors duration-200 group-hover:border-gray-700 md:h-56 lg:h-64"
            onClick={openCurrentProject}
          >
            <img
              src={`/${currentProject.image}`}
              alt={currentProject.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/90" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
              <div className="translate-y-2 transform transition-all duration-300 group-hover:translate-y-0">
                <h4 className="mb-1 text-base font-bold md:text-lg">
                  {currentProject.title}
                </h4>
                <p className="text-xs font-medium text-blue-300 md:text-sm">
                  {currentProject.technologies.join(" · ")}
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

            <button
              type="button"
              aria-label="Previous project"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousProject();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 transition-all duration-200 hover:scale-110 hover:bg-black/70 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next project"
              onClick={(event) => {
                event.stopPropagation();
                showNextProject();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 transition-all duration-200 hover:scale-110 hover:bg-black/70 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {projectCarouselItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to project ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-200 hover:scale-125 ${
                  index === currentIndex
                    ? "w-8 bg-blue-500"
                    : "w-1.5 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
