import React, { useState } from "react";
import { Student } from "../../types";
import { 
  HeartPulse, 
  Search, 
  Save, 
  CheckCircle2, 
  Lock, 
  Info, 
  Download, 
  Printer, 
  Check, 
  UserPlus 
} from "lucide-react";

interface HealthRecordViewProps {
  students: Student[];
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const HealthRecordView: React.FC<HealthRecordViewProps> = ({
  students,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [activeTab, setActiveTab] = useState<"register" | "paps" | "close">("register");
  const [isCreatedProfile, setIsCreatedProfile] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isHealthClosed, setIsHealthClosed] = useState(false);

  const handleCreateProfile = () => {
    setIsCreatedProfile(true);
    onActionTriggered?.("btn-create-health-profile");
  };

  const handleVerify = () => {
    setIsVerified(true);
    onActionTriggered?.("btn-verify-health-record");
  };

  const handleClose = () => {
    setIsHealthClosed(true);
    onActionTriggered?.("btn-close-health-record");
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
              onClick={() => setActiveTab("register")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "register" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              인적사항 생성/등록
            </button>
            <button
              onClick={() => setActiveTab("paps")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "paps" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              신체발달/PAPS
            </button>
            <button
              onClick={() => setActiveTab("close")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "close" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              검증 및 건강기록부 마감
            </button>
          </div>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded text-xs text-emerald-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-emerald-950">건강기록부 반별등록 처리 기준: </span>
          <span>
            신학기 시작 시 [인적사항생성] 버튼을 눌러 학년초 기본 건강기록부 레코드를 생성하고, 신체발달상황 검사 후 [검증] ➔ [반마감]을 진행합니다. (매뉴얼 281p)
          </span>
        </div>
      </div>

      {activeTab === "register" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">4학년 1반 건강기록부 인적사항 생성 및 등록</h4>
              <p className="text-[11px] text-slate-500">학생들의 기초 건강기록부 프로필을 생성합니다.</p>
            </div>

            <button
              id="btn-create-health-profile"
              onClick={handleCreateProfile}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isCreatedProfile
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-create-health-profile"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isCreatedProfile ? "인적사항 생성 완료 ✓" : "인적사항 일괄생성"}</span>
            </button>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-2 border-r border-slate-200 w-12">번호</th>
                <th className="p-2 border-r border-slate-200 w-24">성명</th>
                <th className="p-2 border-r border-slate-200 w-24">키(cm)</th>
                <th className="p-2 border-r border-slate-200 w-24">몸무게(kg)</th>
                <th className="p-2 border-r border-slate-200 w-28">체질량지수(BMI)</th>
                <th className="p-2">생성상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200">{st.studentNumber}</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">{st.name}</td>
                  <td className="p-2 border-r border-slate-200 font-medium">138.4</td>
                  <td className="p-2 border-r border-slate-200 font-medium">33.2</td>
                  <td className="p-2 border-r border-slate-200 text-blue-700 font-semibold">17.3 (정상)</td>
                  <td className="p-2 font-semibold text-emerald-600">
                    {isCreatedProfile ? "생성완료" : "생성대기"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "close" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">건강기록부 자료검증 및 반마감</h4>
              <p className="text-[11px] text-slate-500">누락값 검증 후 건강기록부를 최종 마감합니다.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-verify-health-record"
                onClick={handleVerify}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                  highlightedButtonId === "btn-verify-health-record"
                    ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>자료검증</span>
              </button>

              <button
                id="btn-close-health-record"
                onClick={handleClose}
                disabled={!isVerified || isHealthClosed}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                  isHealthClosed
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : highlightedButtonId === "btn-close-health-record"
                    ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                    : !isVerified
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-teal-700 hover:bg-teal-600 text-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isHealthClosed ? "반마감 완료 ✓" : "건강기록부 반마감"}</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">검증 및 마감 상태</span>
              <span className={`font-bold ${isHealthClosed ? "text-emerald-600" : "text-amber-600"}`}>
                {isHealthClosed ? "마감완료" : isVerified ? "검증완료(마감대기)" : "미검증"}
              </span>
            </div>
            <p className="text-slate-600">
              인적사항(5명), 신체발달(5명), 체력검사 PAPS(5명), 예방접종내역 전원 일치 확인되었습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
