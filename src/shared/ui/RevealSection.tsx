import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "../lib/cn";

interface RevealSectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function RevealSection({ id, className, children }: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("fade-section", isVisible && "is-visible", className)}
    >
      {children}
    </section>
  );
}
