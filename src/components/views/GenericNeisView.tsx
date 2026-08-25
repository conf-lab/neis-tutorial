import React, { useState } from "react";
import { Student } from "../../types";
import { 
  Search, 
  Printer, 
  Download, 
  Info, 
  Check, 
  FileText, 
  UserCheck, 
  Award,
  Layers
} from "lucide-react";

interface GenericNeisViewProps {
  title: string;
  category: string;
  students: Student[];
}

export const GenericNeisView: React.FC<GenericNeisViewProps> = ({
  title,
  category,
  students,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);

  return (
    <div className="p-4 space-y-4 bg-slate-100/50 min-h-full text-xs">
      {/* Top Search Controls */}
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
          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>엑셀</span>
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded">
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>통지표 일괄출력</span>
          </button>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-blue-50/80 border border-blue-200 rounded text-xs text-blue-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-950">2026 4세대 나이스 [{title}] 운영 안내: </span>
          <span>
            {category} 영역의 표준 양식 및 학생별 등록·조회 화면입니다. 관련 권한 보유 교원만 조회/편집이 가능합니다.
          </span>
        </div>
      </div>

      {/* Main Student List & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-3">
          <h4 className="font-bold text-xs text-slate-800 border-b border-slate-200 pb-2 mb-2">
            4학년 1반 학생 목록 (5명)
          </h4>
          <div className="space-y-1">
            {students.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStudent(st)}
                className={`w-full text-left p-2 rounded flex items-center justify-between transition-colors ${
                  selectedStudent.id === st.id
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <span>{st.studentNumber}번 {st.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  selectedStudent.id === st.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {st.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                {selectedStudent.name} ({selectedStudent.gender}, {selectedStudent.birthDate})
              </h4>
              <span className="text-slate-500 text-xs">학적번호: 2026-4-1-{selectedStudent.studentNumber}</span>
            </div>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded font-semibold text-xs">
              {selectedStudent.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block text-[11px]">주민등록번호</span>
              <span className="font-semibold text-slate-800">{selectedStudent.residentId}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block text-[11px]">배정 동아리</span>
              <span className="font-semibold text-slate-800">{selectedStudent.club?.name || "AI·로봇코딩반"}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block text-[11px]">출결 현황</span>
              <span className="font-semibold text-slate-800">
                수업일수 20일 / 출석 {selectedStudent.attendance?.present || 20}일 ({selectedStudent.attendance?.specialRemark || "개근"})
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block text-[11px]">보호자 / 주소</span>
              <span className="font-semibold text-slate-800">{selectedStudent.address}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
            <span className="font-bold text-slate-800 block text-xs mb-1">행동특성 및 종합의견</span>
            <p className="text-slate-700 leading-relaxed text-xs">
              {selectedStudent.remarks || "매사에 능동적이고 학습 태도가 바르며, 친구들을 배려하는 따뜻한 성품을 지님."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
