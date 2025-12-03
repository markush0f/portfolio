import { useState, useRef, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform
} from "framer-motion";
import { MessageCircle, X } from "lucide-react";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

import { useQuadrant } from "./hooks/useQuadrant";
import { useResize } from "./hooks/useResize";
import { useDragPosition } from "./hooks/useDragPositio";

import type { Message } from "./types";
import { ChatService } from "../../api/chat/ChatService";

const ChatbotBubble: React.FC = () => {
    const api = new ChatService("http://127.0.0.1:8000");

    // Chat states
    const [isOpen, setIsOpen] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const userId = "486f6d30-6431-4868-b24d-53490a710672"; // Replace with real user

    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", content: "Hello! **How can I help you today?**" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Quadrant hook
    const { quadrant, updateQuadrant } = useQuadrant();

    // Drag hook
    const {
        dragControls,
        isDragging,
        startDrag,
        handleDragStart,
        handleDragEnd
    } = useDragPosition(() => updateQuadrant(containerRef.current));

    // Resize hook
    const width = useMotionValue(320);
    const height = useMotionValue(384);
    const widthPx = useTransform(width, (v) => `${v}px`);
    const heightPx = useTransform(height, (v) => `${v}px`);

    const { startResize } = useResize(
        quadrant,
        width,
        height,
        () => updateQuadrant(containerRef.current)
    );

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    // Open / close
    const toggleOpen = () => {
        if (isDragging.current) return;
        if (!isOpen) updateQuadrant(containerRef.current);
        setIsOpen(!isOpen);
    };

    // ✔ Backend-integrated send message
    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const msg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue
        };

        setMessages((p) => [...p, msg]);
        setInputValue("");
        setIsTyping(true);

        try {
            let activeChat = chatId;

            // Create chat if needed
            if (!activeChat) {
                activeChat = await api.createChat(userId);
                setChatId(activeChat);
            }

            // Send to backend
            const botReply = await api.sendMessage(activeChat, userId, msg.content);

            setMessages((p) => [
                ...p,
                {
                    id: (Date.now() + 1).toString(),
                    role: "bot",
                    content: botReply
                }
            ]);
        } catch (err) {
            setMessages((p) => [
                ...p,
                {
                    id: (Date.now() + 2).toString(),
                    role: "bot",
                    content: "Server error. Please try again."
                }
            ]);
        }

        setIsTyping(false);
    };

    // UI helpers
    const getDialogPosition = () => {
        const m = "0.5rem";
        switch (quadrant) {
            case "TL": return { top: "100%", left: "100%", marginTop: m, marginLeft: m };
            case "TR": return { top: "100%", right: "100%", marginTop: m, marginRight: m };
            case "BL": return { bottom: "100%", left: "100%", marginBottom: m, marginLeft: m };
            case "BR": return { bottom: "100%", right: "100%", marginBottom: m, marginRight: m };
        }
    };

    const getTransformOrigin = () => {
        switch (quadrant) {
            case "TL": return "top left";
            case "TR": return "top right";
            case "BL": return "bottom left";
            case "BR": return "bottom right";
        }
    };

    const getHandlePos = () => {
        switch (quadrant) {
            case "BR": return "top-0 left-0 cursor-nwse-resize rotate-180";
            case "BL": return "top-0 right-0 cursor-nesw-resize -rotate-90";
            case "TR": return "bottom-0 left-0 cursor-nesw-resize rotate-90";
            case "TL": return "bottom-0 right-0 cursor-nwse-resize";
        }
    };

    return (
        <>
            <div ref={constraintsRef} className="fixed z-0 pointer-events-none inset-4" />

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
                className="fixed z-50 w-16 h-16 pointer-events-auto bottom-10 right-10"
            >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{
                                width: widthPx,
                                height: heightPx,
                                transformOrigin: getTransformOrigin(),
                                ...getDialogPosition()
                            }}
                            className="absolute flex flex-col overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl"
                        >
                            <ChatHeader
                                onDragStart={startDrag}
                                onClose={() => setIsOpen(false)}
                            />

                            <ChatMessages
                                messages={messages}
                                isTyping={isTyping}
                                endRef={messagesEndRef}
                            />

                            <ChatInput
                                value={inputValue}
                                onChange={setInputValue}
                                onSend={handleSendMessage}
                            />

                            {/* Resize handle */}
                            <div
                                onPointerDown={startResize}
                                className={`absolute w-6 h-6 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors ${getHandlePos()}`}
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10">
                                    <path d="M10 10L10 0L0 10Z" fill="currentColor" />
                                </svg>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onPointerDown={(e) => dragControls.start(e)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleOpen}
                    className={`w-full h-full rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border border-white/20 transition-colors cursor-pointer ${isOpen
                        ? "bg-red-500/80 hover:bg-red-600/80"
                        : "bg-blue-600/80 hover:bg-blue-700/80"
                        }`}
                >
                    {isOpen ? <X className="text-white" size={32} /> : <MessageCircle className="text-white" size={32} />}
                </motion.button>
            </motion.div>
        </>
    );
};

export default ChatbotBubble;
