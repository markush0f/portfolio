export class ChatService {
    private baseUrl: string = import.meta.env.PUBLIC_API_URL;

    async createChat(userId: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}chat/create/${userId}`, {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Failed to create chat");
        }

        const data = await response.json();
        return data.chat_id;
    }

    async sendMessage(chatId: string, userId: string, message: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}chat/send/${chatId}/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error("Failed to send message");
        }

        const data = await response.json();
        return data.reply || data.message || data;
    }
}
