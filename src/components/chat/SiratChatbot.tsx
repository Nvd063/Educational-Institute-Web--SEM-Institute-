import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Minus,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { askSiratAI } from "../../lib/chatService";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  { text: "How can I apply for admission?", icon: "🎓" },
  { text: "What documents are required?", icon: "📄" },
  { text: "What programs and subjects do you offer?", icon: "📚" },
  { text: "What is Tarbiyah?", icon: "🕌" },
  { text: "Do you provide Quran education?", icon: "📖" },
  { text: "What are the school timings?", icon: "🕐" },
  { text: "Tell me about the school policies.", icon: "📋" },
  { text: "What activities and achievements do students have?", icon: "🏆" },
  { text: "How can I contact the school?", icon: "📞" },
];

export function SiratChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [copiedMessageIds, setCopiedMessageIds] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const requestInFlightRef = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sirat_chat_history");
      const opened = localStorage.getItem("sirat_chat_opened_before");
      if (stored) {
        const parsed = JSON.parse(stored) as any[];
        setMessages(
          parsed.map((message) => ({
            ...message,
            timestamp: new Date(message.timestamp),
          }))
        );
      }
      if (opened === "true") {
        setHasOpenedBefore(true);
      }
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  }, []);

  const saveChatHistory = (newMessages: Message[]) => {
    try {
      localStorage.setItem("sirat_chat_history", JSON.stringify(newMessages));
    } catch (error) {
      console.error("Failed to save chat history", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (!hasOpenedBefore) {
        setHasOpenedBefore(true);
        localStorage.setItem("sirat_chat_opened_before", "true");
      }
    }
  }, [isOpen, messages, isLoading, hasOpenedBefore]);

  const handleOpenToggle = () => {
    setIsOpen((open) => !open);
  };

  const handleCloseChat = () => {
    setMessages([]);
    setCopiedMessageIds({});
    localStorage.removeItem("sirat_chat_history");
    setIsOpen(false);
  };

  const handleMinimizeChat = () => {
    setIsOpen(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCopiedMessageIds({});
    localStorage.removeItem("sirat_chat_history");
  };

  const handleCopyMessage = async (message: Message) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(message.text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = message.text;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopiedMessageIds((prev) => ({ ...prev, [message.id]: true }));
      window.setTimeout(() => {
        setCopiedMessageIds((prev) => ({ ...prev, [message.id]: false }));
      }, 1200);
    } catch (error) {
      console.error("Failed to copy message text", error);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const trimmedText = textToSend.trim();

    if (!trimmedText || isLoading || requestInFlightRef.current) {
      return;
    }

    requestInFlightRef.current = true;
    setIsLoading(true);

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      role: "user",
      text: trimmedText,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);
    setInputValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const serviceMessages = updatedMessages.map((message) => ({
        role: message.role,
        text: message.text,
      }));

      const response = await askSiratAI({ data: serviceMessages });

      if (response.success && response.text) {
        const botMsg: Message = {
          id: Math.random().toString(36).substring(2, 9),
          role: "model",
          text: response.text,
          timestamp: new Date(),
        };
        const finalMessages = [...updatedMessages, botMsg];
        setMessages(finalMessages);
        saveChatHistory(finalMessages);
      } else {
        const errorMsg: Message = {
          id: Math.random().toString(36).substring(2, 9),
          role: "model",
          text:
            response.error ||
            "I’m having trouble responding right now. Please try again in a moment or visit our [Contact Us](/contact) page.",
          timestamp: new Date(),
        };
        const finalMessages = [...updatedMessages, errorMsg];
        setMessages(finalMessages);
        saveChatHistory(finalMessages);
      }
    } catch (error) {
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        role: "model",
        text: "I’m having trouble connecting right now. Please try again in a moment or visit our [Contact Us](/contact) page.",
        timestamp: new Date(),
      };
      const finalMessages = [...updatedMessages, errorMsg];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } finally {
      requestInFlightRef.current = false;
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const renderMessageContent = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: Array<string | React.ReactNode> = [];
    let lastIndex = 0;
    let match;
    const navButtons: { label: string; url: string }[] = [];

    while ((match = linkRegex.exec(text)) !== null) {
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      const label = match[1];
      const url = match[2];

      if (label && url) {
        if (url.startsWith("/")) {
          navButtons.push({ label, url });
        } else {
          parts.push(
            <a
              key={`${matchIndex}-${label}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-royal underline-offset-2 hover:underline"
            >
              {label} <ExternalLink className="h-3 w-3" />
            </a>
          );
        }
      }

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return (
      <div className="space-y-3">
        <p className="whitespace-pre-line text-sm leading-relaxed">
          {parts.length > 0 ? parts : text}
        </p>
        {navButtons.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 border-t border-sky-200 pt-2">
            {navButtons.map((button, index) => (
              <Link
                key={`${button.url}-${index}`}
                to={button.url}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 rounded-full border border-royal/20 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold text-royal transition-colors hover:bg-sky-100"
              >
                {button.label} <ChevronRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="pointer-events-auto fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={handleOpenToggle}
          aria-label="Open Ask Sirat AI Assistant"
          title="Open Ask Sirat AI Assistant"
          className="relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-sky-200 bg-navy px-4 text-sm font-semibold text-navy-foreground shadow-[0_12px_28px_rgba(10,30,58,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(10,30,58,0.28)] focus:outline-none focus:ring-2 focus:ring-royal focus:ring-offset-2 sm:h-14 sm:px-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)]" />
          <Sparkles className="relative h-4 w-4 text-sky-200 sm:h-5 sm:w-5" />
          <span className="relative hidden sm:inline">Ask Sirat AI</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="pointer-events-auto fixed bottom-[5.25rem] right-3 z-50 flex h-[70vh] w-[calc(100vw-1.5rem)] max-h-[34rem] min-h-[22rem] max-w-[23rem] flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white/95 shadow-[0_20px_60px_rgba(17,24,39,0.18)] backdrop-blur-sm sm:right-5 sm:w-[23rem]"
          >
            <div className="relative flex items-center justify-between border-b border-sky-200 bg-navy px-4 py-3 text-navy-foreground sm:px-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

              <div className="relative z-10 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/40 bg-white/10">
                  <Sparkles className="h-4 w-4 text-sky-200" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide">Ask Sirat AI</h3>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-sky-200/80">Virtual Assistant</p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNewChat}
                  title="New Chat"
                  aria-label="Start a new conversation"
                  className="rounded-lg p-1.5 text-sky-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleMinimizeChat}
                  title="Minimize Chat"
                  aria-label="Minimize Ask Sirat AI Assistant"
                  className="rounded-lg p-1.5 text-sky-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCloseChat}
                  title="Close Chat"
                  aria-label="Close Ask Sirat AI Assistant"
                  className="rounded-lg p-1.5 text-sky-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
              {messages.length === 0 ? (
                <div className="space-y-5 py-2">
                  <div className="mx-auto mt-4 max-w-[280px] space-y-2 text-center">
                    <h4 className="font-heading text-sm font-semibold text-navy">Assalam-o-Alaikum!</h4>
                    <p className="text-xs leading-relaxed text-slate-600">
                      I can help with admissions, Tarbiyah, syllabus details, policies, and contact information.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="pl-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Suggested Questions
                    </p>
                    <div className="grid gap-2">
                      {SUGGESTED_QUESTIONS.map((question, index) => (
                        <button
                          key={`${question.text}-${index}`}
                          type="button"
                          onClick={() => handleSendMessage(question.text)}
                          className="flex items-center gap-3 rounded-xl border border-sky-100 bg-white p-3 text-left text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-royal/25 hover:bg-sky-50"
                        >
                          <span className="text-base">{question.icon}</span>
                          <span className="flex-1 leading-snug">{question.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isCopied = copiedMessageIds[message.id];

                    return (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] ${
                            message.role === "user" ? "flex flex-col items-end" : "flex flex-col items-start"
                          }`}
                        >
                          <div
                            className={`w-full rounded-2xl px-4 py-3 shadow-sm ${
                              message.role === "user"
                                ? "rounded-br-none bg-royal text-white"
                                : "rounded-bl-none border border-slate-200 bg-white text-slate-800"
                            }`}
                          >
                            {renderMessageContent(message.text)}
                            <p
                              className={`mt-1.5 text-right text-[9px] ${
                                message.role === "user" ? "text-sky-100" : "text-slate-400"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyMessage(message)}
                            className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                              message.role === "user"
                                ? "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-royal"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {isCopied ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {isLoading && (
                <div className="mt-4 flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-none border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <span className="text-xs text-slate-500">Sirat AI is thinking</span>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-royal [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-royal [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-royal" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-end gap-2 border-t border-slate-200 bg-white p-3">
              <div className="relative flex-1 rounded-xl border border-slate-200 bg-slate-50 transition-colors focus-within:border-royal/40 focus-within:bg-white">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Sirat AI..."
                  rows={1}
                  disabled={isLoading}
                  className="max-h-24 min-h-[40px] w-full resize-none bg-transparent px-3 py-2.5 text-xs text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
                  style={{ height: "auto" }}
                  onInput={(event) => {
                    const target = event.currentTarget;
                    target.style.height = "auto";
                    target.style.height = `${Math.min(target.scrollHeight, 96)}px`;
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal text-white shadow-sm transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
