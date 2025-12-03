import { useRef } from "react";
import { MotionValue } from "framer-motion";
import type { Quadrant } from "../types";

export function useResize(
    quadrant: Quadrant,
    width: MotionValue<number>,
    height: MotionValue<number>,
    updateQuadrant: () => void
) {
    const isResizing = useRef(false);

    const startResize = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = width.get();
        const startHeight = height.get();

        const onMove = (ev: PointerEvent) => {
            if (!isResizing.current) return;

            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;

            let newW = startWidth;
            let newH = startHeight;

            switch (quadrant) {
                case "BR":
                    newW = startWidth - dx;
                    newH = startHeight - dy;
                    break;
                case "BL":
                    newW = startWidth + dx;
                    newH = startHeight - dy;
                    break;
                case "TR":
                    newW = startWidth - dx;
                    newH = startHeight + dy;
                    break;
                case "TL":
                    newW = startWidth + dx;
                    newH = startHeight + dy;
                    break;
            }

            width.set(Math.max(250, Math.min(600, newW)));
            height.set(Math.max(300, Math.min(700, newH)));
        };

        const onUp = () => {
            isResizing.current = false;
            setTimeout(updateQuadrant, 20);

            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
    };

    return { startResize };
}
