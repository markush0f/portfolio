import { useRef } from "react";
import type { MotionValue } from "framer-motion";

import type { Quadrant } from "../types";

export function useResize(
  quadrant: Quadrant,
  width: MotionValue<number>,
  height: MotionValue<number>,
  updateQuadrant: () => void,
) {
  const isResizing = useRef(false);

  const startResize = (event: React.PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();
    isResizing.current = true;

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = width.get();
    const startHeight = height.get();

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      if (!isResizing.current) {
        return;
      }

      const deltaX = pointerEvent.clientX - startX;
      const deltaY = pointerEvent.clientY - startY;

      let nextWidth = startWidth;
      let nextHeight = startHeight;

      switch (quadrant) {
        case "BR":
          nextWidth = startWidth - deltaX;
          nextHeight = startHeight - deltaY;
          break;
        case "BL":
          nextWidth = startWidth + deltaX;
          nextHeight = startHeight - deltaY;
          break;
        case "TR":
          nextWidth = startWidth - deltaX;
          nextHeight = startHeight + deltaY;
          break;
        case "TL":
          nextWidth = startWidth + deltaX;
          nextHeight = startHeight + deltaY;
          break;
      }

      width.set(Math.max(250, Math.min(600, nextWidth)));
      height.set(Math.max(300, Math.min(700, nextHeight)));
    };

    const handlePointerUp = () => {
      isResizing.current = false;
      window.setTimeout(updateQuadrant, 20);

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return { startResize };
}
