export type Quadrant = "TL" | "TR" | "BL" | "BR";
export type ChatRole = "user" | "assistant";
export type ChatStatus = "idle" | "loading" | "error" | "unavailable";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}
