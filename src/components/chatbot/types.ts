

export type Quadrant = "TL" | "TR" | "BL" | "BR";

export interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
}
