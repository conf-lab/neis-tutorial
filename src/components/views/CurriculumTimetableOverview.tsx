import React, { useState } from "react";
import { 
  Search, 
  Save, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Info,
  Check
} from "lucide-react";

interface CurriculumTimetableOverviewProps {
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const CurriculumTimetableOverview: React.FC<CurriculumTimetableOverviewProps> = ({
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [activeTab, setActiveTab] = useState<"curriculum" | "timetable">("timetable");
  const [isBaseTimetableSaved, setIsBaseTimetableSaved] = useState(false);
  const [isAppliedPeriod, setIsAppliedPeriod] = useState(false);

  // Timetable grid state for 4th grade
  const [timetable, setTimetable] = useState({
    mon: ["국어", "국어", "사회", "도덕", "수학", "자율·자치"],
    tue: ["수학", "과학", "과학", "체육", "음악", "동아리활동"],
    wed: ["국어", "수학", "사회", "체육", "미술", "진로활동"],
    thu: ["국어", "국어", "과학", "실과", "음악", "디지털 민주시민(활동)"],
    fri: ["수학", "국어", "영어", "영어", "미술", "디지털 민주시민(활동)"],
  });

  const subjectDiscrepancies = [
    { subject: "국어", planHours: 108, timetableHours: 108, diff: 0 },
    { subject: "수학", planHours: 72, timetableHours: 72, diff: 0 },
    { subject: "사회", planHours: 72, timetableHours: 72, diff: 0 },
    { subject: "도덕", planHours: 72, timetableHours: 72, diff: 0 },
    { subject: "과학/실과", planHours: 54, timetableHours: 54, diff: 0 },
    { subject: "체육", planHours: 54, timetableHours: 54, diff: 0 },
    { subject: "음악/미술", planHours: 72, timetableHours: 72, diff: 0 },
    { subject: "영어", planHours: 36, timetableHours: 36, diff: 0 },
    { subject: "자율·자치/동아리/진로", planHours: 54, timetableHours: 54, diff: 0 },
    { subject: "디지털 민주시민(활동)", planHours: 29, timetableHours: 29, diff: 0 },
  ];

  const handleSaveBaseTimetable = () => {
    setIsBaseTimetableSaved(true);
    onActionTriggered?.("btn-save-base-timetable");
  };

  const handleApplyPeriod = () => {
    setIsAppliedPeriod(true);
    onActionTriggered?.("btn-apply-base-timetable-period");
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
            <span className="font-semibold text-slate-700">학기:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1">
              <option>1학기</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">학년/반:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-blue-900">
              <option>4학년 1반</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-0.5 rounded border border-slate-300">
            <button
              onClick={() => setActiveTab("timetable")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "timetable" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              학급시간표 및 기초시간표
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "curriculum" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              시수편차 '0' 검증표
            </button>
          </div>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-orange-50/80 border border-orange-200 rounded text-xs text-orange-950 flex items-start gap-2.5 shadow-2xs">
        <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">주요 감사 지적 1순위: 과목별 시수편차 '0' 일치 확인</span>
          <p className="mt-0.5 text-[11px] text-orange-900">
            [교육과정]-[시간표관리]-[학급시간표관리]에서 과목별 기준시수와 기초시간표 반영 시수 편차가 '0'이어야 감사를 안전하게 수검할 수 있습니다. (매뉴얼 56p)
          </p>
        </div>
      </div>

      {activeTab === "timetable" && (
        <div className="space-y-4">
          {/* Base Timetable Controls */}
          <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-bold text-xs text-slate-900">4학년 1반 기초시간표 작성 및 학기 반영</h4>
                <p className="text-[11px] text-slate-500">주간 교시별 시간표를 작성한 후 반영기간(2026.03.01 ~ 2026.08.18)을 설정하여 반영합니다.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-save-base-timetable"
                  onClick={handleSaveBaseTimetable}
                  className={`flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                    highlightedButtonId === "btn-save-base-timetable"
                      ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>기초시간표 저장</span>
                </button>

                <button
                  id="btn-apply-base-timetable-period"
                  onClick={handleApplyPeriod}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                    isAppliedPeriod
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : highlightedButtonId === "btn-apply-base-timetable-period"
                      ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                      : "bg-orange-600 hover:bg-orange-500 text-white"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAppliedPeriod ? "학기 반영 완료 ✓ (편차 0)" : "반영기간 설정 및 반영"}</span>
                </button>
              </div>
            </div>

            {/* Timetable Weekly Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border border-slate-200 border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="p-2 border-r border-slate-200 w-16">교시</th>
                    <th className="p-2 border-r border-slate-200">월요일</th>
                    <th className="p-2 border-r border-slate-200">화요일</th>
                    <th className="p-2 border-r border-slate-200">수요일</th>
                    <th className="p-2 border-r border-slate-200">목요일</th>
                    <th className="p-2">금요일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[0, 1, 2, 3, 4, 5].map((periodIdx) => (
                    <tr key={periodIdx} className="hover:bg-slate-50">
                      <td className="p-2.5 border-r border-slate-200 font-bold bg-slate-50 text-slate-700">
                        {periodIdx + 1}교시
                      </td>
                      <td className="p-2 border-r border-slate-200 font-medium text-slate-800">
                        {timetable.mon[periodIdx]}
                      </td>
                      <td className="p-2 border-r border-slate-200 font-medium text-slate-800">
                        {timetable.tue[periodIdx]}
                      </td>
                      <td className="p-2 border-r border-slate-200 font-medium text-slate-800">
                        {timetable.wed[periodIdx]}
                      </td>
                      <td className="p-2 border-r border-slate-200 font-medium text-slate-800">
                        {timetable.thu[periodIdx]}
                      </td>
                      <td className="p-2 font-medium text-slate-800">
                        {timetable.fri[periodIdx]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "curriculum" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">4학년 1학기 과목별 기준시수 vs 시간표 시수 편차 검증</h4>
              <p className="text-[11px] text-slate-500">모든 교과의 편차가 0일 때 교육과정 시간표 편성이 완전 무결함을 인증합니다.</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> 전 과목 편차 0 일치
            </span>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="p-2 border-r border-slate-200">교과(군)</th>
                <th className="p-2 border-r border-slate-200">교육과정 기준시수</th>
                <th className="p-2 border-r border-slate-200">시간표 편성시수</th>
                <th className="p-2 border-r border-slate-200">편차</th>
                <th className="p-2">감사 검증상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {subjectDiscrepancies.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800 text-left px-3">
                    {sub.subject}
                  </td>
                  <td className="p-2 border-r border-slate-200 text-slate-600">{sub.planHours}h</td>
                  <td className="p-2 border-r border-slate-200 text-slate-600">{sub.timetableHours}h</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-emerald-600">
                    {sub.diff === 0 ? "0" : sub.diff}
                  </td>
                  <td className="p-2 font-semibold text-emerald-700">
                    ✓ 적격 (오차 없음)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
