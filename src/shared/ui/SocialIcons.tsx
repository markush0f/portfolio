import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

const socialIconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

interface SocialIconProps {
  name: string;
  className?: string;
}

export function SocialIcon({ name, className = "h-5 w-5" }: SocialIconProps) {
  const Icon = socialIconMap[name.toLowerCase()] ?? Mail;
  return <Icon className={className} strokeWidth={1.75} />;
}
