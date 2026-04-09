import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { HelpCircle, MessageCircle, X } from "lucide-react";

import { faqQuestions } from "../../../data/chatbot/faqQuestions";
import { getLocalizedText } from "../../../i18n/utils";
import { useLanguage } from "../../../i18n/useLanguage";
import { useChatbot } from "../hooks/useChatbot";
import { useDragPosition } from "../hooks/useDragPosition";
import { useQuadrant } from "../hooks/useQuadrant";
import { useResize } from "../hooks/useResize";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

interface ChatFAQProps {
  questions: string[];
  title: string;
  disabled: boolean;
  onSelect: (question: string) => void;
}

function ChatFAQ({ questions, title, disabled, onSelect }: ChatFAQProps) {
  return (
    <div className="border-t border-white/20 bg-white/5 p-3 backdrop-blur-xl">
      <h3 className="mb-2 text-sm font-semibold text-white">{title}</h3>
      <div className="flex flex-col gap-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(question)}
            className="rounded-lg bg-white/10 px-3 py-2 text-left text-xs text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

function getInitialWidth() {
  if (typeof window === "undefined") {
    return 320;
  }

  const screenWidth = window.innerWidth;

  if (screenWidth < 640) {
    return Math.min(280, screenWidth - 40);
  }

  if (screenWidth < 768) {
    return 300;
  }

  return 320;
}

function getInitialHeight() {
  if (typeof window === "undefined") {
    return 480;
  }

  const screenHeight = window.innerHeight;

  if (screenHeight < 640) {
    return Math.min(420, screenHeight - 120);
  }

  if (screenHeight < 768) {
    return 450;
  }

  return 480;
}

export function ChatbotBubble() {
  const { language, t } = useLanguage();
  const quickQuestions = useMemo(
    () => faqQuestions.map((question) => getLocalizedText(question, language)),
    [language],
  );
  const {
    messages,
    inputValue,
    isAvailable,
    sendMessage,
    setInputValue,
    status,
  } = useChatbot({
    initialMessage: t("chatbot.initialMessage"),
    errorMessage: t("chatbot.error"),
    unavailableMessage: t("chatbot.unavailable"),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { quadrant, updateQuadrant } = useQuadrant();
  const {
    dragControls,
    isDragging,
    startDrag,
    handleDragEnd,
    handleDragStart,
  } = useDragPosition(() => updateQuadrant(containerRef.current));

  const width = useMotionValue(getInitialWidth());
  const height = useMotionValue(getInitialHeight());
  const widthPx = useTransform(width, (value) => `${value}px`);
  const heightPx = useTransform(height, (value) => `${value}px`);
  const { startResize } = useResize(quadrant, width, height, () =>
    updateQuadrant(containerRef.current),
  );

  useEffect(() => {
    const handleResize = () => {
      const nextWidth = getInitialWidth();
      const nextHeight = getInitialHeight();

      if (width.get() > nextWidth) {
        width.set(nextWidth);
      }

      if (height.get() > nextHeight) {
        height.set(nextHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height, width]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages, status]);

  const toggleOpen = () => {
    if (isDragging.current) {
      return;
    }

    if (!isOpen) {
      updateQuadrant(containerRef.current);
    }

    setIsOpen((currentState) => !currentState);
  };

  const getDialogPosition = () => {
    const margin = "0.5rem";

    switch (quadrant) {
      case "TL":
        return {
          top: "100%",
          left: "100%",
          marginTop: margin,
          marginLeft: margin,
        };
      case "TR":
        return {
          top: "100%",
          right: "100%",
          marginTop: margin,
          marginRight: margin,
        };
      case "BL":
        return {
          bottom: "100%",
          left: "100%",
          marginBottom: margin,
          marginLeft: margin,
        };
      case "BR":
        return {
          bottom: "100%",
          right: "100%",
          marginBottom: margin,
          marginRight: margin,
        };
    }
  };

  const getTransformOrigin = () => {
    switch (quadrant) {
      case "TL":
        return "top left";
      case "TR":
        return "top right";
      case "BL":
        return "bottom left";
      case "BR":
        return "bottom right";
    }
  };

  const getHandlePosition = () => {
    switch (quadrant) {
      case "BR":
        return "top-0 left-0 cursor-nwse-resize rotate-180";
      case "BL":
        return "top-0 right-0 cursor-nesw-resize -rotate-90";
      case "TR":
        return "bottom-0 left-0 cursor-nesw-resize rotate-90";
      case "TL":
        return "bottom-0 right-0 cursor-nwse-resize";
    }
  };

  return (
    <>
      <div
        ref={constraintsRef}
        className="pointer-events-none fixed inset-2 z-0 sm:inset-4"
      />

      <motion.div
        ref={containerRef}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="fixed bottom-3 right-3 z-50 h-12 w-12 pointer-events-auto sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 md:bottom-10 md:right-10 md:h-16 md:w-16"
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                width: widthPx,
                height: heightPx,
                transformOrigin: getTransformOrigin(),
                ...getDialogPosition(),
              }}
              className="absolute flex flex-col overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-lg sm:rounded-2xl"
            >
              <ChatHeader
                title={t("chatbot.title")}
                statusLabel={
                  isAvailable
                    ? t("chatbot.statusOnline")
                    : t("chatbot.statusOffline")
                }
                isAvailable={isAvailable}
                onDragStart={startDrag}
                onClose={() => setIsOpen(false)}
              />

              <ChatMessages
                messages={messages}
                isTyping={status === "loading"}
                endRef={messagesEndRef}
              />

              <button
                type="button"
                onClick={() => setShowFAQ((currentState) => !currentState)}
                className="flex items-center gap-2 bg-white/10 px-3 py-2 text-xs text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <HelpCircle size={14} />
                {t("chatbot.quickQuestions")}
              </button>

              {showFAQ ? (
                <ChatFAQ
                  title={t("chatbot.quickQuestions")}
                  questions={quickQuestions}
                  disabled={!isAvailable || status === "loading"}
                  onSelect={sendMessage}
                />
              ) : null}

              <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSend={() => void sendMessage()}
                disabled={!isAvailable || status === "loading"}
                placeholder={
                  isAvailable
                    ? t("chatbot.placeholder")
                    : t("chatbot.placeholderUnavailable")
                }
              />

              <div
                onPointerDown={startResize}
                className={`absolute hidden h-6 w-6 items-center justify-center text-white/40 transition-colors hover:text-white/80 sm:flex ${getHandlePosition()}`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 20L20 4M13 20h7v-7"
                  />
                </svg>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggleOpen}
          aria-label={
            isOpen ? t("chatbot.toggleClose") : t("chatbot.toggleOpen")
          }
          className="flex h-full w-full items-center justify-center rounded-full border border-blue-500/30 bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:bg-blue-600"
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        >
          {isOpen ? (
            <X className="text-white" size={20} />
          ) : (
            <MessageCircle className="text-white" size={20} />
          )}
        </button>
      </motion.div>
    </>
  );
}
