import { useState } from "react";
import type { Quadrant } from "../types";

export function useQuadrant() {
    const [quadrant, setQuadrant] = useState<Quadrant>("BR");

    const updateQuadrant = (el: HTMLDivElement | null) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const mx = window.innerWidth / 2;
        const my = window.innerHeight / 2;

        const isTop = cy < my;
        const isLeft = cx < mx;

        if (isTop && isLeft) setQuadrant("TL");
        else if (isTop && !isLeft) setQuadrant("TR");
        else if (!isTop && isLeft) setQuadrant("BL");
        else setQuadrant("BR");
    };

    return { quadrant, updateQuadrant };
}
