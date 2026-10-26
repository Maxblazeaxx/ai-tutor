import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, User, Bot, X, Volume2 } from "lucide-react";
import { sendChatMessage } from "../services/api";

export default function InteractiveChatPanel({ learnerId, learnerType, currentConcept }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I am your AI learning partner. Feel free to ask me anything about ${currentConcept || "science and maths"}!`
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSpeak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = learnerType === "down_syndrome" ? 0.85 : 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleQuickQuestion = (qText) => {
    setInputMessage(qText);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsLoading(true);

    try {
      const data = await sendChatMessage({ learner_id: learnerId, message: userText });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I am here to help you learn!" }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I am having trouble connecting right now, but you can explore the visual story above!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-xl hover:bg-slate-800 transition transform hover:-translate-y-0.5 border border-slate-700"
          title="Open AI Tutor Chat"
        >
          <MessageSquare size={18} className="text-emerald-400" />
          <span>Ask Tutor a Question</span>
        </button>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden h-[480px]">
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-sm">
                🌱
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">Inclusive AI Tutor</h4>
                <p className="text-[11px] text-emerald-400 font-semibold">Grounded & Adaptive</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] font-medium leading-relaxed ${
                    m.role === "user"
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none whitespace-pre-line"
                  }`}
                >
                  <p>{m.content}</p>
                  {m.role === "assistant" && learnerType !== "deaf" && (
                    <button
                      onClick={() => handleSpeak(m.content)}
                      className="mt-2 flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-emerald-700 transition"
                      title="Listen to response"
                    >
                      <Volume2 size={12} /> Listen
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <Bot size={14} className="text-emerald-600 animate-spin" />
                <span>Thinking with curriculum grounding...</span>
              </div>
            )}
          </div>

          {/* Quick Question Pills */}
          <div className="px-3 py-1.5 bg-slate-100/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            {[
              "What is the main idea?",
              "Give a simple example",
              "How does it work?"
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickQuestion(q)}
                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-900 whitespace-nowrap font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition shrink-0"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
