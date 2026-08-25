import React, { useState } from "react";
import { Search, ChevronRight, BookOpen, KeyRound, Sparkles } from "lucide-react";
import { MainMenuId, SubMenuItem } from "../types";
import { MENU_STRUCTURE } from "../data/manualData";
import { getManualPageUrl } from "../utils/manual";

interface SidebarMenuProps {
  currentMainMenu: MainMenuId;
  currentSubMenuId: string;
  onSelectSubMenu: (item: SubMenuItem) => void;
  highlightedSubMenuId?: string;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  currentMainMenu,
  currentSubMenuId,
  onSelectSubMenu,
  highlightedSubMenuId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const menuConfig = MENU_STRUCTURE[currentMainMenu];
  const items = menuConfig?.items || [];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-full select-none shrink-0 shadow-sm">
      {/* Sidebar Header */}
      <div className="p-3 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            {menuConfig.title}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">총 {items.length}개 메뉴</span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="메뉴명 빠른 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
          />
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredItems.map((item) => {
          const isSelected = currentSubMenuId === item.id;
          const isHighlighted = highlightedSubMenuId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSubMenu(item)}
              className={`w-full text-left p-2.5 rounded text-xs transition-all relative flex flex-col gap-1 border ${
                isSelected
                  ? "bg-blue-50 border-blue-300 text-blue-900 font-semibold shadow-xs"
                  : isHighlighted
                  ? "bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold animate-pulse ring-2 ring-indigo-400"
                  : "bg-white hover:bg-slate-100/80 border-slate-200/70 text-slate-700 hover:text-slate-950"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="truncate flex-1 pr-1">{item.name}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                {isHighlighted && !isSelected && (
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 animate-spin" />
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="px-1.5 py-0.2 bg-slate-100 border border-slate-200 rounded text-slate-600 font-normal">
                  {item.category}
                </span>
                {item.manualPage && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(getManualPageUrl(item.manualPage!), "_blank");
                    }}
                    title="매뉴얼 PDF 해당 쪽 열기"
                    className="text-slate-400 hover:text-blue-600 hover:underline flex items-center gap-0.5"
                  >
                    <BookOpen className="w-3 h-3 text-slate-400" />
                    {item.manualPage}p
                  </span>
                )}
                {item.requiresDataPermission && (
                  <span className="text-amber-600 font-medium flex items-center gap-0.5" title="자료권한 승인 필요">
                    <KeyRound className="w-3 h-3 text-amber-500" />
                    권한
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* Manual Reference Footer in Sidebar */}
      <div className="p-2.5 bg-slate-100/90 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
        <span className="truncate">2026 경기도교육청 교무매뉴얼</span>
        <span className="font-semibold text-blue-700">4세대 NEIS</span>
      </div>
    </aside>
  );
};
