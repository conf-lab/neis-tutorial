import React, { useState } from "react";
import { Student } from "../../types";
import { 
  GraduationCap, 
  Search, 
  Save, 
  UserPlus, 
  FileCheck, 
  Info, 
  Check, 
  Download, 
  Printer 
} from "lucide-react";

interface AdmissionViewProps {
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const AdmissionView: React.FC<AdmissionViewProps> = ({
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerated(true);
    onActionTriggered?.("btn-generate-student-record");
  };

  return (
    <div className="p-4 space-y-4 bg-slate-100/50 min-h-full text-xs">
      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">학년도:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1">
              <option>2026</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">업무구분:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-blue-900">
              <option>1학년 신입생 입학/학적생성</option>
              <option>6학년 중학교 진학배정</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-generate-student-record"
            onClick={handleGenerate}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
              isGenerated
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : highlightedButtonId === "btn-generate-student-record"
                ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                : "bg-blue-700 hover:bg-blue-600 text-white"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{isGenerated ? "학적생성 완료 ✓" : "취학대상자 학적 일괄생성"}</span>
          </button>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-blue-50/80 border border-blue-200 rounded text-xs text-blue-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-950">입학 및 진학관리 핵심 원칙: </span>
          <span>
            [취학대상자명부] ➔ [신입생 반편성] ➔ [입학일자 3월 1일 기준 학적생성] 순서로 진행됩니다. (매뉴얼 82p)
          </span>
          <p className="mt-0.5 text-[11px] text-blue-700">
            ※ 중학교 진학의 경우 배정원서 작성 후 교육지원청 배정 결과와 대조하여 졸업대장을 생성합니다.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h4 className="font-bold text-xs text-slate-900">2026학년도 1학년 신입생 학적생성 현황 (102명)</h4>
          </div>
          <span className="text-slate-500">배정학급: 1반~4반 (학급당 25~26명)</span>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white border border-slate-200 rounded shadow-2xs">
            <span className="text-slate-500 text-[11px] block">총 취학통지 대상</span>
            <span className="font-bold text-slate-900 text-base">105명</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded shadow-2xs">
            <span className="text-slate-500 text-[11px] block">취학유예/면제</span>
            <span className="font-bold text-amber-600 text-base">3명</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded shadow-2xs">
            <span className="text-slate-500 text-[11px] block">최종 입학 학적생성</span>
            <span className="font-bold text-emerald-600 text-base">{isGenerated ? "102명 (완료)" : "대기"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
