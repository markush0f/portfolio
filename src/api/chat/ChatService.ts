export class ChatService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async createChat(userId: string): Promise<string> {
        const res = await fetch(`${this.baseUrl}/chat/create/${userId}`, {
            method: "POST"
        });

        if (!res.ok) {
            throw new Error("Failed to create chat");
        }

        const data = await res.json();

        // IMPORTANT FIX
        return data.chat_id;
    }

    async sendMessage(chatId: string, userId: string, message: string): Promise<string> {
        const res = await fetch(`${this.baseUrl}/chat/send/${chatId}/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        if (!res.ok) {
            throw new Error("Failed to send message");
        }

        const data = await res.json();

        return data.reply || data.message || data;
    }
}
