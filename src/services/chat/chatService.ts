export type ChatServiceErrorCode =
  | "unavailable"
  | "request_failed"
  | "invalid_response";

interface CreateChatResponse {
  chat_id?: string;
}

type SendMessageResponse = string | { reply?: string; message?: string };

export class ChatServiceError extends Error {
  constructor(
    public readonly code: ChatServiceErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "ChatServiceError";
  }
}

export function normalizeChatBaseUrl(baseUrl?: string): string | null {
  if (!baseUrl) {
    return null;
  }

  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, "");
  return normalizedBaseUrl.length > 0 ? normalizedBaseUrl : null;
}

export class ChatService {
  private readonly baseUrl: string | null;

  constructor(baseUrl = import.meta.env.PUBLIC_API_URL) {
    this.baseUrl = normalizeChatBaseUrl(baseUrl);
  }

  get isConfigured() {
    return this.baseUrl !== null;
  }

  private getRequiredBaseUrl() {
    if (!this.baseUrl) {
      throw new ChatServiceError(
        "unavailable",
        "Chat service is unavailable because PUBLIC_API_URL is missing.",
      );
    }

    return this.baseUrl;
  }

  async createChat(userId: string): Promise<string> {
    const baseUrl = this.getRequiredBaseUrl();

    let response: Response;

    try {
      response = await fetch(`${baseUrl}/chat/create/${userId}`, {
        method: "POST",
      });
    } catch {
      throw new ChatServiceError("request_failed", "Failed to create chat.");
    }

    if (!response.ok) {
      throw new ChatServiceError("request_failed", "Failed to create chat.");
    }

    const data = (await response.json()) as CreateChatResponse;

    if (!data.chat_id) {
      throw new ChatServiceError(
        "invalid_response",
        "Chat service returned an invalid chat id.",
      );
    }

    return data.chat_id;
  }

  async sendMessage(
    chatId: string,
    userId: string,
    message: string,
  ): Promise<string> {
    const baseUrl = this.getRequiredBaseUrl();

    let response: Response;

    try {
      response = await fetch(`${baseUrl}/chat/send/${chatId}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
    } catch {
      throw new ChatServiceError("request_failed", "Failed to send message.");
    }

    if (!response.ok) {
      throw new ChatServiceError("request_failed", "Failed to send message.");
    }

    const data = (await response.json()) as SendMessageResponse;

    if (typeof data === "string") {
      return data;
    }

    if (typeof data.reply === "string") {
      return data.reply;
    }

    if (typeof data.message === "string") {
      return data.message;
    }

    throw new ChatServiceError(
      "invalid_response",
      "Chat service returned an invalid message payload.",
    );
  }
}
