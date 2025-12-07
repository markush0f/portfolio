import { useRef } from "react";
import { useDragControls } from "framer-motion";

export function useDragPosition(updateQuadrant: () => void) {
    const dragControls = useDragControls();
    const isDragging = useRef(false);

    const startDrag = (e: React.PointerEvent) => {
        dragControls.start(e);
    };

    const handleDragStart = () => {
        isDragging.current = true;
    };

    const handleDragEnd = () => {
        setTimeout(() => {
            updateQuadrant();
            isDragging.current = false;
        }, 20);
    };

    return { dragControls, isDragging, startDrag, handleDragStart, handleDragEnd };
}
