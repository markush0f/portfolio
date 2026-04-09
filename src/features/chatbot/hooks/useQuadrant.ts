import { useState } from "react";

import type { Quadrant } from "../types";

export function useQuadrant() {
  const [quadrant, setQuadrant] = useState<Quadrant>("BR");

  const updateQuadrant = (element: HTMLDivElement | null) => {
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    if (centerY < middleY && centerX < middleX) {
      setQuadrant("TL");
      return;
    }

    if (centerY < middleY && centerX >= middleX) {
      setQuadrant("TR");
      return;
    }

    if (centerY >= middleY && centerX < middleX) {
      setQuadrant("BL");
      return;
    }

    setQuadrant("BR");
  };

  return { quadrant, updateQuadrant };
}
