import { useRef } from "react";
import { useDragControls } from "framer-motion";

export function useDragPosition(updateQuadrant: () => void) {
  const dragControls = useDragControls();
  const isDragging = useRef(false);

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    window.setTimeout(() => {
      updateQuadrant();
      isDragging.current = false;
    }, 20);
  };

  return {
    dragControls,
    isDragging,
    startDrag,
    handleDragStart,
    handleDragEnd,
  };
}
