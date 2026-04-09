import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ChatService,
  ChatServiceError,
  normalizeChatBaseUrl,
} from "../src/services/chat/chatService";

describe("ChatService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("normalizes the configured base url", () => {
    expect(normalizeChatBaseUrl("https://api.example.com///")).toBe(
      "https://api.example.com",
    );
    expect(normalizeChatBaseUrl("")).toBeNull();
  });

  it("throws an unavailable error when the API is missing", async () => {
    const service = new ChatService("");

    await expect(service.createChat("user-1")).rejects.toMatchObject({
      code: "unavailable",
    } satisfies Partial<ChatServiceError>);
  });

  it("creates a chat and parses the reply payload", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ chat_id: "chat-1" }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ reply: "Hello from the bot" }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

    const service = new ChatService("https://api.example.com/");
    const chatId = await service.createChat("user-1");
    const reply = await service.sendMessage(chatId, "user-1", "Hi");

    expect(chatId).toBe("chat-1");
    expect(reply).toBe("Hello from the bot");
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://api.example.com/chat/create/user-1",
      { method: "POST" },
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.example.com/chat/send/chat-1/user-1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Hi" }),
      },
    );
  });
});
