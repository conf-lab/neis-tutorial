import React from "react";
import { 
  Building2, 
  HelpCircle, 
  BookMarked, 
  PlayCircle, 
  Sparkles, 
  CheckCircle2, 
  FileCheck2,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { MainMenuId } from "../types";
import { MENU_STRUCTURE } from "../data/manualData";

interface HeaderNavProps {
  currentMainMenu: MainMenuId;
  onSelectMainMenu: (menuId: MainMenuId) => void;
  activeTutorial: any | null;
  onOpenTutorialList: () => void;
  onOpenAuditTips: () => void;
  onOpenApprovalList: () => void;
  approvalCount: number;
  isChatOpen: boolean;
  onToggleChat: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentMainMenu,
  onSelectMainMenu,
  activeTutorial,
  onOpenTutorialList,
  onOpenAuditTips,
  onOpenApprovalList,
  approvalCount,
  isChatOpen,
  onToggleChat,
}) => {
  return (
    <header className="bg-slate-900 text-white select-none border-b border-slate-700 shadow-md">
      {/* Top Global Utility Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-xs bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-amber-400">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>경기도교육청 나이스(NEIS) 교무업무 가상 실습 포털</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">2026학년도 1학기 [초등학교 교무학사]</span>
          <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[11px] font-medium border border-blue-700/50">
            2022 개정 교육과정 적용
          </span>
        </div>

        <div className="flex items-center gap-3">
          {activeTutorial && (
            <div className="flex items-center gap-2 px-2.5 py-0.5 bg-indigo-950 border border-indigo-600/60 rounded text-indigo-200 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-xs">튜토리얼 진행 중: {activeTutorial.title}</span>
            </div>
          )}

          <button
            onClick={onOpenApprovalList}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            title="나이스 전자결재함"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>결재함</span>
            {approvalCount > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-full">
                {approvalCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAuditTips}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-700/60 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>감사 필수 점검사항</span>
          </button>

          <button
            onClick={onOpenTutorialList}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white font-medium transition-colors shadow-sm"
          >
            <PlayCircle className="w-3.5 h-3.5 text-white" />
            <span>12대 업무 튜토리얼</span>
          </button>

          <button
            onClick={onToggleChat}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${
              isChatOpen 
                ? "bg-amber-500 text-slate-950 font-bold" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 가이드 챗봇 {isChatOpen ? "열림" : "질문하기"}</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800 text-slate-400">
            <span className="font-semibold text-slate-200">박교사</span> (4학년 1반 담임)
          </div>
        </div>
      </div>

      {/* Main GNB Menus */}
      <div className="flex items-center overflow-x-auto scrollbar-none px-2 bg-slate-900">
        {(Object.keys(MENU_STRUCTURE) as MainMenuId[]).map((menuKey) => {
          const menu = MENU_STRUCTURE[menuKey];
          const isActive = currentMainMenu === menuKey;

          return (
            <button
              key={menuKey}
              onClick={() => onSelectMainMenu(menuKey)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
                isActive
                  ? "border-blue-400 text-white bg-slate-800/80 shadow-inner"
                  : "border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
              }`}
            >
              <span>{menu.title}</span>
              {menuKey === "autonomous_time" && (
                <span className="px-1 py-0.2 bg-purple-500 text-white text-[9px] font-bold rounded">
                  2026신설
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
