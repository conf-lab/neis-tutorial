import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, TutorialScenario } from "../types";
import { getManualPageUrl } from "../utils/manual";
import { 
  Bot, 
  Send, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  Minimize2, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Loader2,
  RefreshCcw
} from "lucide-react";

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  activeTutorial: TutorialScenario | null;
  currentTutorialStepIndex: number;
  onNextTutorialStep: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  currentMenuName: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isLoading,
  activeTutorial,
  currentTutorialStepIndex,
  onNextTutorialStep,
  isOpen,
  onToggleOpen,
  currentMenuName,
}) => {
  const [inputText, setInputText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "전입생 5단계 등록 절차 알려줘",
    "평가계획안 4단계 기준 일괄입력 방법은?",
    "출결 방학 월 0일 마감 처리 규정은?",
    "생기부 정정대장 4단 결재선 기준은?",
    "2026 학교자율시간 편제 시수 기준은?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const handleQuickSend = (q: string) => {
    if (isLoading) return;
    onSendMessage(q);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        id="btn-open-ai-tutor"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-xs border border-white/20 ring-4 ring-blue-500/20"
      >
        <Bot className="w-5 h-5 animate-pulse text-amber-300" />
        <span className="font-bold">2026 NEIS AI 튜터 챗봇</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>
    );
  }

  const currentStep = activeTutorial ? activeTutorial.steps[currentTutorialStepIndex] : null;

  return (
    <div
      className={`fixed z-40 bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col transition-all duration-300 overflow-hidden ${
        isExpanded
          ? "inset-4 md:inset-10"
          : "bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-2rem)]"
      }`}
    >
      {/* Chat Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs">2026 NEIS 실시간 AI 튜터</h3>
              <span className="px-1.5 py-0.2 bg-emerald-500 text-[10px] text-white rounded font-bold">LIVE</span>
            </div>
            <p className="text-[10px] text-blue-200">2026 초등 나이스 매뉴얼 정밀 지식탑재</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-white/10 rounded text-blue-200 hover:text-white transition-colors"
            title={isExpanded ? "축소" : "확대"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onToggleOpen}
            className="p-1 hover:bg-white/10 rounded text-blue-200 hover:text-white transition-colors"
            title="닫기"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tutorial Context Bar if Tutorial is Active */}
      {activeTutorial && currentStep && (
        <div className="px-3.5 py-2.5 bg-indigo-50 border-b border-indigo-200 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-indigo-950">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{activeTutorial.title}</span>
            </div>
            <span className="px-2 py-0.5 bg-indigo-200 text-indigo-900 rounded font-bold text-[10px]">
              {currentTutorialStepIndex + 1} / {activeTutorial.steps.length} 단계
            </span>
          </div>
          <div className="mt-1 text-[11px] text-indigo-800 flex items-center gap-1">
            <span className="font-semibold text-indigo-900">👉 지침:</span>
            <span className="truncate">{currentStep.instruction}</span>
          </div>
        </div>
      )}

      {/* Chat Messages List */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/70 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[10px] font-semibold text-slate-500">
                {msg.sender === "user" ? "선생님 (사용자)" : "NEIS AI 튜터"}
              </span>
              <span className="text-[9px] text-slate-400">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <div
              className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed shadow-2xs whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-700 text-white rounded-tr-none font-medium"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-none font-normal"
              }`}
            >
              {msg.text}

              {/* Manual Page Citation Badge */}
              {msg.manualPage && (
                <a
                  href={getManualPageUrl(msg.manualPage)}
                  target="_blank"
                  rel="noreferrer"
                  title="매뉴얼 PDF 해당 쪽 열기"
                  className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-blue-700 font-semibold hover:text-blue-900 hover:underline"
                >
                  <BookOpen className="w-3 h-3 text-blue-600" />
                  <span>2026 초등 나이스 매뉴얼 p.{msg.manualPage} 근거</span>
                </a>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl rounded-tl-none w-max text-xs text-slate-500 shadow-2xs">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span>2026 나이스 매뉴얼 분석 중...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] font-bold text-slate-500 shrink-0">추천:</span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickSend(q)}
            className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-300 rounded text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="나이스 절차, 버튼 위치, 감사 지적사항을 물어보세요..."
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-lg transition-colors shrink-0 shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
