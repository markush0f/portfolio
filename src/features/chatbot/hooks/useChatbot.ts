import { useEffect, useRef, useState } from "react";

import {
  ChatService,
  ChatServiceError,
} from "../../../services/chat/chatService";
import type { ChatMessage, ChatRole, ChatStatus } from "../types";

const USER_ID = "1fa771ed-bc5e-4925-8676-5bae31f2d84e";

interface UseChatbotOptions {
  initialMessage: string;
  errorMessage: string;
  unavailableMessage: string;
}

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    role,
    content,
  };
}

export function useChatbot({
  initialMessage,
  errorMessage,
  unavailableMessage,
}: UseChatbotOptions) {
  const serviceRef = useRef(new ChatService());
  const isAvailable = serviceRef.current.isConfigured;

  const [chatId, setChatId] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatStatus>(
    isAvailable ? "idle" : "unavailable",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      "assistant",
      isAvailable ? initialMessage : unavailableMessage,
    ),
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setMessages((currentMessages) => {
      if (chatId || currentMessages.length !== 1) {
        return currentMessages;
      }

      return [
        createMessage(
          "assistant",
          isAvailable ? initialMessage : unavailableMessage,
        ),
      ];
    });
  }, [chatId, initialMessage, isAvailable, unavailableMessage]);

  const sendMessage = async (forcedContent?: string) => {
    const content = (forcedContent ?? inputValue).trim();

    if (!content || status === "loading") {
      return;
    }

    if (!isAvailable) {
      setStatus("unavailable");
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage("user", content),
    ]);
    setInputValue("");
    setStatus("loading");

    try {
      let activeChatId = chatId;

      if (!activeChatId) {
        activeChatId = await serviceRef.current.createChat(USER_ID);
        setChatId(activeChatId);
      }

      const reply = await serviceRef.current.sendMessage(
        activeChatId,
        USER_ID,
        content,
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", reply),
      ]);
      setStatus("idle");
    } catch (error) {
      if (error instanceof ChatServiceError && error.code === "unavailable") {
        setStatus("unavailable");
        setMessages((currentMessages) => [
          ...currentMessages,
          createMessage("assistant", unavailableMessage),
        ]);
        return;
      }

      setStatus("error");
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", errorMessage),
      ]);
    }
  };

  return {
    inputValue,
    isAvailable,
    messages,
    sendMessage,
    setInputValue,
    status,
  };
}
