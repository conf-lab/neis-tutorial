import React, { useState } from "react";
import { AuditCheckItem } from "../types";
import { getManualPageUrl } from "../utils/manual";
import { 
  ShieldAlert, 
  Search, 
  X, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";

interface AuditTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditTips: AuditCheckItem[];
  onSelectAuditTipToChat: (tip: AuditCheckItem) => void;
}

export const AuditTipsModal: React.FC<AuditTipsModalProps> = ({
  isOpen,
  onClose,
  auditTips,
  onSelectAuditTipToChat,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  if (!isOpen) return null;

  const categories = ["전체", "교육과정", "학적", "출결", "평가", "학생부", "학교자율시간"];

  const filteredTips = auditTips.filter((tip) => {
    const matchCategory = selectedCategory === "전체" || tip.category.includes(selectedCategory);
    const matchSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.solution.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-red-800 via-rose-800 to-slate-900 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">2026 초등 나이스 종합감사 주요 지적사례 및 예방 가이드</h3>
              <p className="text-[11px] text-rose-200">감사 적발 빈도 최상위 18개 핵심 항목 및 적법 처리 절차</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-rose-200 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-rose-700 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="지적사례, 키워드 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
            />
          </div>
        </div>

        {/* Tips List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 divide-y divide-slate-100">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="pt-3 first:pt-0 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded text-[10px]">
                    {tip.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{tip.title}</h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={getManualPageUrl(tip.manualPage)}
                    target="_blank"
                    rel="noreferrer"
                    title="매뉴얼 PDF 해당 쪽 열기"
                    className="text-[11px] text-slate-500 hover:text-rose-700 font-medium hover:underline"
                  >
                    매뉴얼 p.{tip.manualPage}
                  </a>
                  <button
                    onClick={() => {
                      onSelectAuditTipToChat(tip);
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <span>AI 튜터에게 질문</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg text-red-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-red-800 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>주요 감사 지적 사유 (오류 사례)</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{tip.issue}</p>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-emerald-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-800 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>적법 처리 기준 및 예방 가이드</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{tip.solution}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredTips.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              일치하는 감사 지적 사례가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
