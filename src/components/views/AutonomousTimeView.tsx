import React, { useState } from "react";
import { Student } from "../../types";
import { 
  Sparkles, 
  Plus, 
  Save, 
  Check, 
  Search, 
  Info, 
  Users, 
  BookOpen,
  FileCheck
} from "lucide-react";

interface AutonomousTimeViewProps {
  students: Student[];
  activeStepBox: string;
  onStepBoxChange: (step: string) => void;
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const AutonomousTimeView: React.FC<AutonomousTimeViewProps> = ({
  students,
  activeStepBox,
  onStepBoxChange,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [subjectName, setSubjectName] = useState("디지털 민주시민");
  const [subjectType, setSubjectType] = useState<"활동" | "과목">("활동");
  const [operateMode, setOperateMode] = useState<"학급공통" | "학생선택">("학급공통");
  const [relatedSubject, setRelatedSubject] = useState("사회/도덕");
  const [allocatedHours, setAllocatedHours] = useState(29);
  
  const [isCurriculumSaved, setIsCurriculumSaved] = useState(true);
  const [isStudentsAssigned, setIsStudentsAssigned] = useState(false);

  const handleSaveCurriculum = () => {
    setIsCurriculumSaved(true);
    onActionTriggered?.("btn-save-autonomous-curriculum");
  };

  const handleBatchAssign = () => {
    setIsStudentsAssigned(true);
    onActionTriggered?.("btn-auto-class-batch-assign");
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
            <span className="font-semibold text-slate-700">학년:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-purple-900">
              <option>4학년 (3~4학년군)</option>
              <option>5학년 (5~6학년군)</option>
              <option>6학년 (5~6학년군)</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-purple-100 text-purple-900 font-bold rounded flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            2026 2022 개정 교육과정 적용
          </span>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-purple-50/80 border border-purple-200 rounded text-xs text-purple-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-purple-950">2026학년도 학교자율시간 편성·운영 기준: </span>
          <span>
            3~6학년 특색 교육과정으로 학기 단위 운영(2개 학기 분할 불가). <strong>3~4학년은 최소 29시간 이상</strong>, <strong>5~6학년은 최소 32시간 이상</strong> 편성해야 합니다. (매뉴얼 305p)
          </span>
          <p className="mt-0.5 text-[11px] text-purple-800">
            ※ 나이스 표기: '활동' 선택 시 활동명 뒤에 '(활동)' 자동 표기 (예: 디지털 민주시민(활동))
          </p>
        </div>
      </div>

      {/* Section 1: 편제 및 시수 설정 */}
      <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>1. 학교자율시간 편제 및 시수 등록</span>
            </h4>
            <p className="text-[11px] text-slate-500">운영방식(학급공통/학생선택), 관련교과, 과목활동구분, 시수를 설정합니다.</p>
          </div>

          <button
            id="btn-save-autonomous-curriculum"
            onClick={handleSaveCurriculum}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
              highlightedButtonId === "btn-save-autonomous-curriculum"
                ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                : "bg-purple-700 hover:bg-purple-600 text-white"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>편제 저장</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">운영방식 *</label>
            <select 
              value={operateMode} 
              onChange={(e: any) => setOperateMode(e.target.value)}
              className="w-full border border-slate-300 rounded p-1.5 bg-slate-50 font-medium"
            >
              <option>학급공통</option>
              <option>학생선택</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">편제 (관련교과군) *</label>
            <select 
              value={relatedSubject}
              onChange={(e) => setRelatedSubject(e.target.value)}
              className="w-full border border-slate-300 rounded p-1.5 bg-slate-50 font-medium"
            >
              <option>사회/도덕</option>
              <option>과학/실과</option>
              <option>국어</option>
              <option>예술(음악/미술)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">과목·활동 구분 *</label>
            <select 
              value={subjectType}
              onChange={(e: any) => setSubjectType(e.target.value)}
              className="w-full border border-slate-300 rounded p-1.5 bg-slate-50 font-medium"
            >
              <option>활동</option>
              <option>과목</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">활동/과목명 *</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full border border-slate-300 rounded p-1.5 font-bold text-purple-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">학기 시수 (최소29h) *</label>
            <input
              type="number"
              value={allocatedHours}
              onChange={(e) => setAllocatedHours(Number(e.target.value))}
              className="w-full border border-slate-300 rounded p-1.5 font-bold text-blue-700"
            />
          </div>
        </div>
      </div>

      {/* Section 2: 과목 개설 및 학생 일괄 배정 */}
      <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>2. 과목(활동) 개설 및 학급 학생 일괄 편성</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              학급공통 운영 시 [학급공통 일괄편성] 버튼을 눌러 학급 전체 학생을 자동 배정합니다. (매뉴얼 310p)
            </p>
          </div>

          <button
            id="btn-auto-class-batch-assign"
            onClick={handleBatchAssign}
            disabled={isStudentsAssigned}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
              isStudentsAssigned
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : highlightedButtonId === "btn-auto-class-batch-assign"
                ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isStudentsAssigned ? "학급 학생 일괄편성 완료 ✓" : "학급공통 일괄편성"}</span>
          </button>
        </div>

        <table className="w-full text-xs text-center border border-slate-200">
          <thead className="bg-slate-100 border-b border-slate-200 font-semibold">
            <tr>
              <th className="p-2 border-r border-slate-200">운영방식</th>
              <th className="p-2 border-r border-slate-200">관련교과</th>
              <th className="p-2 border-r border-slate-200">과목(활동)명</th>
              <th className="p-2 border-r border-slate-200">시수</th>
              <th className="p-2 border-r border-slate-200">담당교사</th>
              <th className="p-2 border-r border-slate-200">편성학급</th>
              <th className="p-2">학생 편성여부</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-2 border-r border-slate-200 font-medium">학급공통</td>
              <td className="p-2 border-r border-slate-200">{relatedSubject}</td>
              <td className="p-2 border-r border-slate-200 font-bold text-purple-900">
                {subjectName}(활동)
              </td>
              <td className="p-2 border-r border-slate-200 font-bold text-blue-700">{allocatedHours}시간</td>
              <td className="p-2 border-r border-slate-200 font-semibold">박교사</td>
              <td className="p-2 border-r border-slate-200">4학년 1반</td>
              <td className="p-2">
                <span className={`px-2.5 py-0.5 rounded font-bold text-[11px] ${
                  isStudentsAssigned ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {isStudentsAssigned ? "Y (5명 편성됨)" : "N (미편성)"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
