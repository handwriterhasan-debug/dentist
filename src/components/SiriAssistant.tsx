import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, Send, X, Bot, Sparkles, Loader2, RefreshCw } from "lucide-react";

export default function SiriAssistant() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! I am Siri Dental, your AI oral health companion built for Pearl Clinic Cupertino. Ask me about custom veneers, alignment speed, symptom care, or booking assistance.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Offline Preset dictionary for instant fallback if API key is not yet set
  const getPresetResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("pain") || q.includes("hurt") || q.includes("sensitive") || q.includes("toothache")) {
      return "Severe dental pain is a priority. I advise rinsing gently with warm saltwater and applying a cold compress to your cheek. Please schedule a Priority Consultation with Dr. Kiara Brooks inside the Booking tab of our portal layout immediately.";
    }
    if (q.includes("whitening") || q.includes("veneer") || q.includes("porcelain") || q.includes("aesthetic") || q.includes("smile")) {
      return "For aesthetic smile design, Dr. Olivia Vance is our lead specialist. We feature handcrafted Swiss Porcelain Veneers that replicate original dental translucent aesthetics. You can review her casework in the Transformations section!";
    }
    if (q.includes("align") || q.includes("invisalign") || q.includes("crooked") || q.includes("braces")) {
      return "We utilize high-speed Smart Aligners engineered by Dr. Arthur Chen. They apply constant low dental forces to cut traditional ortho schedules by as much as 40 percent. Details are live in our treatments catalog.";
    }
    if (q.includes("implant") || q.includes("missing")) {
      return "Our biocompatible Grade-V titanium dental implants are guided via 3D computer models for micron-level fit. This lowers surgery times by half. You can book an implant diagnostic slot above.";
    }
    if (q.includes("price") || q.includes("cost") || q.includes("insurance")) {
      return "We accept all premium PPO dental insurance policies. Diagnostics are fully covered; specialized therapies like veneers and implants have exact treatment quotes provided after 3D scans.";
    }
    return "I am Siri Dental, your custom clinical advisor. I can help resolve emergency tooth symptoms, explain laser dental options, explain aligner options, or introduce our clinical surgeons. Let me know what you would like to know!";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsgText = inputText.trim();
    setInputText("");

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsLoading(true);

    try {
      // Post all conversational history to Express Gemini backend
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMsg] })
      });

      if (!response.ok) {
        throw new Error("HTTP status: " + response.status);
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);

    } catch (err) {
      console.warn("Express backend or Gemini API not configured. Falling back to clinical local engine.", err);
      
      // Delay to simulate biological reasoning
      setTimeout(() => {
        const localReply = getPresetResponse(userMsgText);
        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now()}-ai-offline`,
          sender: "assistant",
          text: `[Clinical Local Engine] ${localReply}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Siri Floating Trigger Sphere Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group p-4 rounded-full shadow-[0_8px_32px_rgba(0,102,204,0.35)] hover:shadow-[0_12px_44px_rgba(0,102,204,0.5)] transition-all duration-350 cursor-pointer overflow-hidden active:scale-90 flex items-center justify-center ${
            isOpen ? "bg-slate-950 scale-95" : "bg-slate-900 border border-slate-800"
          }`}
        >
          {/* Pulsing Siri Mesh Gradient Orb */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0066cc]/40 via-purple-600/30 to-pink-500/30 opacity-80 mix-blend-color-dodge group-hover:scale-110 transition-transform" />
          
          <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-[#0066cc] to-pink-500 opacity-60 filter blur-sm group-hover:opacity-90 animate-pulse duration-2000 ${
            isLoading ? "animate-spin duration-1000" : ""
          }`} />

          {isOpen ? (
            <X className="w-5.5 h-5.5 text-white relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center gap-1">
              <Sparkles className="w-5.5 h-5.5 text-white animate-spin duration-7000" />
            </div>
          )}
        </button>
      </div>

      {/* Siri Interactive Chat Console Sheet */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100%-32px)] sm:w-96 h-[500px] z-50 glass-panel rounded-[32px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.18)] flex flex-col justify-between animate-fade-in ring-1 ring-white/50">
          
          {/* Chat Header inspired by Apple Siri / Health App */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between relative overflow-hidden border-b border-white/5">
            {/* Ambient glowing background inside header */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066cc]/30 via-purple-600/20 to-pink-500/20 mix-blend-screen pointer-events-none" />
            
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-white overflow-hidden">
                  <Bot className="w-4 h-4 text-sky-405" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-mono tracking-wide text-white flex items-center gap-1">
                  Siri Dental Care
                </h4>
                <p className="text-[9px] text-zinc-400 font-sans tracking-tight">Pearl Health Assistant • Active</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer relative z-10"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white/20 backdrop-blur-xs">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              const isOfflineInfo = m.text.includes("[Clinical Local Engine]");
              const cleanText = m.text.replace("[Clinical Local Engine] ", "");

              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-1.5`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-white/60 border border-white/80 flex items-center justify-center overflow-hidden shrink-0 mb-1 shadow-xs">
                      <Bot className="w-3.5 h-3.5 text-slate-650" />
                    </div>
                  )}

                  <div className="max-w-[78%] space-y-0.5">
                    {isOfflineInfo && (
                      <span className="text-[7.5px] uppercase font-mono text-slate-400 tracking-wider block ml-1 select-none">
                        Preserved Offline Reply
                      </span>
                    )}
                    <div
                      className={`px-3.5 py-2.5 text-xs tracking-tight leading-relaxed rounded-2xl ${
                        isUser
                          ? "bg-[#0066cc] text-white rounded-br-none font-sans font-light shadow-sm"
                          : "bg-white/65 hover:bg-white/75 text-slate-800 rounded-bl-none border border-white/50 shadow-xs font-light backdrop-blur-md"
                      }`}
                    >
                      {cleanText}
                    </div>
                    <span className="text-[8px] text-slate-400 px-1 block text-right font-mono">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/60 border border-white/80 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                  <Bot className="w-3.5 h-3.5 text-slate-500" />
                </div>
                
                {/* Typing Orb Indicator */}
                <div className="bg-white/60 px-3 py-2 rounded-2xl border border-white/50 backdrop-blur-md shadow-xs flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce duration-600" />
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce duration-600 delay-150" />
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce duration-600 delay-300" />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick clinical query shortcuts */}
          <div className="p-2 border-t border-white/40 bg-white/30 grid grid-cols-2 gap-1.5 backdrop-blur-md">
            <button
              onClick={() => {
                setInputText("Is tooth sensitivity normal?");
              }}
              className="py-1 px-2 border border-white/60 bg-white/40 rounded-lg hover:bg-white/75 text-[10px] text-slate-700 text-left truncate cursor-pointer active:scale-95 transition-all"
            >
              🌿 Sensitivity pain cure?
            </button>
            <button
              onClick={() => {
                setInputText("Tell me about Invisalign aligners.");
              }}
              className="py-1 px-2 border border-white/60 bg-white/40 rounded-lg hover:bg-white/75 text-[10px] text-slate-700 text-left truncate cursor-pointer active:scale-95 transition-all"
            >
              🦷 Invisalign fast rates?
            </button>
            <button
              onClick={() => {
                setInputText("What are porcelain veneers?");
              }}
              className="py-1 px-2 border border-white/60 bg-white/40 rounded-lg hover:bg-white/75 text-[10px] text-slate-700 text-left truncate cursor-pointer active:scale-95 transition-all"
            >
              💎 Swiss Porcelain Veneers?
            </button>
            <button
              onClick={() => {
                setInputText("Who is Dr. Olivia Vance?");
              }}
              className="py-1 px-2 border border-white/60 bg-white/40 rounded-lg hover:bg-white/75 text-[10px] text-slate-700 text-left truncate cursor-pointer active:scale-95 transition-all"
            >
              👩‍⚕️ Dr. Olivia Vance biography?
            </button>
          </div>

          {/* Input Form Console */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white/30 border-t border-white/60 flex items-center gap-2 backdrop-blur-md"
          >
            <input
              type="text"
              placeholder="Ask Siri Dental assistant..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 glass-input-light text-xs text-slate-805 placeholder:text-slate-400 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`p-2 rounded-full cursor-pointer transition-all ${
                inputText.trim() && !isLoading
                  ? "bg-[#0066cc] text-white shadow-sm active:scale-90"
                  : "bg-white/40 border border-white/40 text-neutral-400"
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </form>

        </div>
      )}
    </>
  );
}
