import { profile } from "../../../data/profile";

export function PortfolioFooter() {
  return (
    <footer className="px-4 py-6 text-gray-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm sm:text-left">
          <span className="font-bold text-white">{profile.fullName}</span>
        </p>

        <div className="flex items-center justify-center gap-3 sm:justify-end">
          {profile.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              aria-label={link.label}
              className="transition-opacity duration-200 hover:opacity-80"
            >
              <img src={link.icon} alt={link.label} className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
