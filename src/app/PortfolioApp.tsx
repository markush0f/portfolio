import { LanguageProvider } from "../i18n/LanguageProvider";
import { RevealSection } from "../shared/ui/RevealSection";
import { ChatbotBubble } from "../features/chatbot/components/ChatbotBubble";
import { PortfolioNavbar } from "../features/navigation/PortfolioNavbar";
import { AboutSection } from "../features/portfolio/sections/AboutSection";
import { CertificatesSection } from "../features/portfolio/sections/CertificatesSection";
import { ExperienceSection } from "../features/portfolio/sections/ExperienceSection";
import { HomeSection } from "../features/portfolio/sections/HomeSection";
import { PortfolioFooter } from "../features/portfolio/sections/PortfolioFooter";
import { ProjectsSection } from "../features/portfolio/sections/ProjectsSection";
import { TechnologiesSection } from "../features/portfolio/sections/TechnologiesSection";

function PortfolioShell() {
  return (
    <>
      <PortfolioNavbar />
      <main className="relative">
        <ChatbotBubble />
        <HomeSection />
        <RevealSection id="about">
          <AboutSection />
        </RevealSection>
        <RevealSection id="experience">
          <ExperienceSection />
        </RevealSection>
        <RevealSection id="projects">
          <ProjectsSection />
        </RevealSection>
        <RevealSection id="certificates">
          <CertificatesSection />
        </RevealSection>
        <RevealSection id="technologies">
          <TechnologiesSection />
        </RevealSection>
      </main>
      <PortfolioFooter />
    </>
  );
}

export default function PortfolioApp() {
  return (
    <LanguageProvider>
      <PortfolioShell />
    </LanguageProvider>
  );
}
