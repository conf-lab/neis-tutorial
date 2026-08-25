import React, { useState } from "react";
import { Teacher } from "../../types";
import { 
  Briefcase, 
  Search, 
  Save, 
  ShieldCheck, 
  Users, 
  Info, 
  Check, 
  UserCheck,
  Plus
} from "lucide-react";

interface SchoolWorkAssignViewProps {
  teachers: Teacher[];
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const SchoolWorkAssignView: React.FC<SchoolWorkAssignViewProps> = ({
  teachers,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    onActionTriggered?.("btn-save-school-work-assign");
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
            <span className="font-semibold text-slate-700">부서명:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-medium">
              <option>교무기획부</option>
              <option>교육연구부</option>
              <option>학생생활안전부</option>
              <option>4학년부</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-save-school-work-assign"
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
              isSaved
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : highlightedButtonId === "btn-save-school-work-assign"
                ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                : "bg-blue-700 hover:bg-blue-600 text-white"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? "업무분장 저장 완료 ✓" : "업무분장 저장"}</span>
          </button>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-blue-50/80 border border-blue-200 rounded text-xs text-blue-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-950">학교업무분장 및 나이스 권한관리 체계: </span>
          <span>
            [부서관리] ➔ [단위업무관리] ➔ [담당자지정] ➔ [교원자료권한부여(학년/반/교과목)] 순으로 진행됩니다. (매뉴얼 22p)
          </span>
          <p className="mt-0.5 text-[11px] text-blue-700">
            ※ 권한 인수인계: 전임자 권한 회수 및 신임자 결재 승인 후 즉시 반영됩니다.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>2026학년도 교원별 업무분장 및 나이스 취급 권한 현황</span>
            </h4>
          </div>
        </div>

        <table className="w-full text-xs text-center border border-slate-200">
          <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="p-2 border-r border-slate-200">교원명</th>
              <th className="p-2 border-r border-slate-200">소속부서</th>
              <th className="p-2 border-r border-slate-200">직위</th>
              <th className="p-2 border-r border-slate-200">담당학급</th>
              <th className="p-2 border-r border-slate-200">담당단위업무</th>
              <th className="p-2">나이스 권한그룹</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {teachers.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-2 border-r border-slate-200 font-bold text-slate-800">{t.name}</td>
                <td className="p-2 border-r border-slate-200">{t.department}</td>
                <td className="p-2 border-r border-slate-200 font-medium">{t.position}</td>
                <td className="p-2 border-r border-slate-200 font-semibold text-blue-800">{t.assignedClass}</td>
                <td className="p-2 border-r border-slate-200 text-left px-3 text-slate-700">
                  {t.roles.join(", ")}
                </td>
                <td className="p-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-semibold text-[11px]">
                    {t.position === "교장" ? "기관장 결재권한" : t.position === "교감" ? "중간결재/교무총괄" : "학급담임/교과평가"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
