import React from "react";
import { ChevronRight, Printer, Star, RotateCcw, HelpCircle, BookOpen, Sparkles } from "lucide-react";
import { MainMenuId, SubMenuItem } from "../types";
import { MENU_STRUCTURE } from "../data/manualData";
import { getManualPageUrl } from "../utils/manual";

export interface NeisBreadcrumbProps {
  currentMainMenu?: MainMenuId;
  currentSubMenu?: SubMenuItem;
  path?: string[];
  manualPage?: number;
  onOpenAiTutor?: () => void;
  onAskBotAboutPage?: () => void;
  onResetData?: () => void;
}

export const NeisBreadcrumb: React.FC<NeisBreadcrumbProps> = ({
  currentMainMenu,
  currentSubMenu,
  path,
  manualPage,
  onOpenAiTutor,
  onAskBotAboutPage,
  onResetData,
}) => {
  const menuConfig = currentMainMenu ? MENU_STRUCTURE[currentMainMenu] : null;
  const mainTitle = menuConfig?.title || (path && path[1]) || "교무학사";
  const subMenuName = currentSubMenu?.name || (path && path[path.length - 1]) || "업무화면";
  const categoryName = currentSubMenu?.category || (path && path.length > 3 ? path[2] : "");
  const pageNumber = manualPage ?? currentSubMenu?.manualPage;
  const handleAskBot = onOpenAiTutor || onAskBotAboutPage;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs shadow-2xs">
      {/* Breadcrumb Path */}
      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
        <span className="text-slate-400">교무업무</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-700">{mainTitle}</span>
        {categoryName && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-normal">{categoryName}</span>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-blue-900 font-bold text-sm bg-blue-50/70 px-2 py-0.5 rounded border border-blue-200/60">
          {subMenuName}
        </span>
        {pageNumber && (
          <a
            href={getManualPageUrl(pageNumber)}
            target="_blank"
            rel="noreferrer"
            title="매뉴얼 PDF 해당 쪽 열기"
            className="ml-2 inline-flex items-center gap-1 text-[11px] font-normal text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 hover:underline"
          >
            <BookOpen className="w-3 h-3 text-amber-600" />
            매뉴얼 {pageNumber}p
          </a>
        )}
      </div>

      {/* NEIS Utility Action Icons */}
      <div className="flex items-center gap-1.5">
        {handleAskBot && (
          <button
            onClick={handleAskBot}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded transition-colors"
            title="이 화면 매뉴얼 지침 AI 질문"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>업무 가이드 질의</span>
          </button>
        )}

        {onResetData && (
          <button
            onClick={onResetData}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors"
            title="가상 데이터 초기화"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span>실습 초기화</span>
          </button>
        )}

        <div className="h-4 w-px bg-slate-300 mx-1"></div>

        <button
          onClick={() => window.print()}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
          title="화면 인쇄"
        >
          <Printer className="w-3.5 h-3.5" />
        </button>

        <button
          className="p-1.5 text-slate-500 hover:text-amber-500 hover:bg-slate-100 rounded"
          title="즐겨찾기 추가"
        >
          <Star className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

