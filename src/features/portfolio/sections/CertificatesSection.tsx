import { certificates } from "../../../data/certificates";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { SectionHeading } from "../../../shared/ui/SectionHeading";

export function CertificatesSection() {
  const { language, t } = useLanguage();

  return (
    <div className="px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title={t("sections.certificates")}
          icon="/icons/certificate.svg"
          compact
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="group relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

              <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 transition-colors duration-200 hover:border-gray-700">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={certificate.image}
                    alt={certificate.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />

                  <a
                    href={certificate.downloadLink}
                    download
                    aria-label={`${t("common.downloadCertificate")} ${certificate.name}`}
                    className="absolute right-3 top-3 z-10 rounded-full bg-blue-500 p-2 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-blue-600 hover:text-white hover:shadow-blue-500/50"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14M19 12l-7 7-7-7"
                      />
                    </svg>
                  </a>

                  <div className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-blue-500/90 px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {t("common.clickToView")}
                  </div>
                </div>

                <div className="space-y-1 p-2">
                  <h3 className="line-clamp-1 text-sm font-bold text-white transition-colors duration-300 group-hover:text-blue-400 md:text-base">
                    {certificate.name}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                    {getLocalizedText(certificate.description, language)}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-gray-500">
                      {t("common.verifiedCertificate")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
