import { useState, useRef, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform
} from "framer-motion";
import { MessageCircle, X, HelpCircle } from "lucide-react";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

import { useQuadrant } from "./hooks/useQuadrant";
import { useResize } from "./hooks/useResize";
import { useDragPosition } from "./hooks/useDragPositio";

import type { Message } from "./types";
import { ChatService } from "../../api/chat/ChatService";

const ChatFAQ = ({ onSelect }: { onSelect: (q: string) => void }) => {
    const questions = [
        "¿Quién es Markus?",
        "¿Qué proyectos tiene Markus?",
        "¿Qué tecnologías usa Markus?",
    ];

    return (
        <div className="p-3 border-t border-white/20 bg-white/5 backdrop-blur-xl">
            <h3 className="text-white text-sm font-semibold mb-2">Preguntas rápidas</h3>
            <div className="flex flex-col gap-2">
                {questions.map((q) => (
                    <button
                        key={q}
                        onClick={() => onSelect(q)}
                        className="text-left text-white/80 hover:text-white text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                    >
                        {q}
                    </button>
                ))}
            </div>
        </div>
    );
};


const ChatbotBubble: React.FC = () => {
    const api = new ChatService();

    const [isOpen, setIsOpen] = useState(false);
    const [showFAQ, setShowFAQ] = useState(false); // Added FAQ state
    const [chatId, setChatId] = useState<string | null>(null);
    const userId = "1fa771ed-bc5e-4925-8676-5bae31f2d84e";

    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", content: "Hola!! **Pregúntame algo sobre Markus!**" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { quadrant, updateQuadrant } = useQuadrant();

    const {
        dragControls,
        isDragging,
        startDrag,
        handleDragStart,
        handleDragEnd
    } = useDragPosition(() => updateQuadrant(containerRef.current));

    const getInitialWidth = () => {
        if (typeof window === 'undefined') return 320;
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) return Math.min(280, screenWidth - 40);
        if (screenWidth < 768) return 300;
        return 320;
    };

    const getInitialHeight = () => {
        if (typeof window === 'undefined') return 480;
        const screenHeight = window.innerHeight;
        if (screenHeight < 640) return Math.min(420, screenHeight - 120);
        if (screenHeight < 768) return 450;
        return 480;
    };

    const width = useMotionValue(getInitialWidth());
    const height = useMotionValue(getInitialHeight());
    const widthPx = useTransform(width, (v) => `${v}px`);
    const heightPx = useTransform(height, (v) => `${v}px`);

    const { startResize } = useResize(
        quadrant,
        width,
        height,
        () => updateQuadrant(containerRef.current)
    );

    useEffect(() => {
        const handleResize = () => {
            const newW = getInitialWidth();
            const newH = getInitialHeight();

            if (width.get() > newW) width.set(newW);
            if (height.get() > newH) height.set(newH);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width, height]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const toggleOpen = () => {
        if (isDragging.current) return;
        if (!isOpen) updateQuadrant(containerRef.current);
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async (forcedContent?: string) => {
        const content = forcedContent ?? inputValue.trim();
        if (!content) return;

        const msg: Message = {
            id: Date.now().toString(),
            role: "user",
            content
        };

        setMessages((p) => [...p, msg]);
        setInputValue("");
        setIsTyping(true);
        setShowFAQ(false);

        try {
            let activeChat = chatId;

            if (!activeChat) {
                activeChat = await api.createChat(userId);
                setChatId(activeChat);
            }

            const botReply = await api.sendMessage(activeChat, userId, content);

            setMessages((p) => [
                ...p,
                {
                    id: (Date.now() + 1).toString(),
                    role: "bot",
                    content: botReply
                }
            ]);
        } catch {
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
            <div ref={constraintsRef} className="fixed z-0 pointer-events-none inset-2 sm:inset-4" />

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
                className="fixed z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 pointer-events-auto bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10"
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
                            className="absolute flex flex-col overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 rounded-xl sm:rounded-2xl"
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

                            {/* FAQ toggle */}
                            <button
                                onClick={() => setShowFAQ((v) => !v)}
                                className="px-3 py-2 text-xs flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <HelpCircle size={14} />
                                Preguntas rápidas
                            </button>

                            {showFAQ && (
                                <ChatFAQ
                                    onSelect={(q) => handleSendMessage(q)}
                                />
                            )}

                            <ChatInput
                                value={inputValue}
                                onChange={setInputValue}
                                onSend={() => handleSendMessage()}
                            />

                            <div
                                onPointerDown={startResize}
                                className={`absolute w-5 h-5 sm:w-6 sm:h-6 hidden sm:flex items-center justify-center text-white/40 hover:text-white/80 transition-colors ${getHandlePos()}`}
                            >
                                <svg width="8" height="8" viewBox="0 0 10 10" className="sm:w-[10px] sm:h-[10px]">
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
                    {isOpen ? (
                        <X className="text-white" size={20} />
                    ) : (
                        <MessageCircle className="text-white" size={20} />
                    )}
                </motion.button>
            </motion.div>
        </>
    );
};

export default ChatbotBubble;
