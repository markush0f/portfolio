import { BadgeCheck, Download, Medal } from "lucide-react";

import { certificates } from "../../../data/certificates";
import { useLanguage } from "../../../i18n/useLanguage";
import { getLocalizedText } from "../../../i18n/utils";
import { SectionHeading } from "../../../shared/ui/SectionHeading";

export function CertificatesSection() {
  const { language, t } = useLanguage();

  return (
    <div className="px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={t("sections.certificates")} icon={Medal} compact />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-white/20">
              <div className="relative aspect-video overflow-hidden">
                <img src={certificate.image} alt={certificate.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent opacity-60" />
                <a href={certificate.downloadLink} download aria-label={`${t("common.downloadCertificate")} ${certificate.name}`} className="absolute right-3 top-3 z-10 rounded-full bg-sky-400 p-2 text-[#071018] transition hover:scale-110" onClick={(event) => event.stopPropagation()}>
                  <Download className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
              <div className="space-y-1 p-3">
                <h3 className="line-clamp-1 text-sm font-semibold text-white md:text-base">{certificate.name}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/50">{getLocalizedText(certificate.description, language)}</p>
                <div className="flex items-center gap-1.5 pt-1 text-sky-300">
                  <BadgeCheck className="h-4 w-4" strokeWidth={1.75} />
                  <span className="text-xs text-white/45">{t("common.verifiedCertificate")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
