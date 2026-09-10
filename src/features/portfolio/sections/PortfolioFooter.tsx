import { profile } from "../../../data/profile";
import { SocialIcon } from "../../../shared/ui/SocialIcons";

export function PortfolioFooter() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 text-white/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm sm:text-left">
          <span className="font-medium text-white">{profile.fullName}</span>
        </p>
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          {profile.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-sky-400/40 hover:text-sky-300"
            >
              <SocialIcon name={link.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
