import React, { useState } from "react";
import { Student } from "../../types";
import { 
  Search, 
  Save, 
  CheckCheck, 
  FileCheck, 
  Calendar, 
  Info, 
  Printer, 
  Download, 
  AlertCircle, 
  Edit3, 
  Check 
} from "lucide-react";

interface AttendanceViewProps {
  students: Student[];
  onUpdateAttendance: (studentId: string, attendanceData: any) => void;
  onRequestApproval: (title: string, docType: any, details: string) => void;
  activeStepBox: string;
  onStepBoxChange: (step: string) => void;
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  onUpdateAttendance,
  onRequestApproval,
  activeStepBox,
  onStepBoxChange,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("05월");
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [selectedStudentForRemark, setSelectedStudentForRemark] = useState<Student | null>(null);
  const [remarkInput, setRemarkInput] = useState("05/12 질병결석(감기 호흡기 증상으로 병원 진료)");

  const [isMonthlyApproved, setIsMonthlyApproved] = useState(false);
  const [isBatchPerfectDone, setIsBatchPerfectDone] = useState(false);

  const handleOpenRemark = (student: Student) => {
    setSelectedStudentForRemark(student);
    setIsRemarkModalOpen(true);
  };

  const handleSaveDailyAttendance = () => {
    setIsRemarkModalOpen(false);
    onActionTriggered?.("btn-save-daily-attendance");
  };

  const handleBatchPerfect = () => {
    setIsBatchPerfectDone(true);
    onActionTriggered?.("btn-batch-perfect-attendance");
  };

  const handleMonthlyApproval = () => {
    setIsMonthlyApproved(true);
    onRequestApproval(
      "2026학년도 5월 4학년 1반 출결 월마감 승인요청",
      "월별출결",
      "4학년 1반 5월 출결 집계 및 비고 대조 완료에 따른 월말 출결 통계 결재 상신의 건"
    );
    onActionTriggered?.("btn-submit-attendance-monthly-approval");
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
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-medium">
              <option>4학년 1반</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">월:</span>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-blue-900"
            >
              <option>03월</option>
              <option>04월</option>
              <option>05월</option>
              <option>06월</option>
              <option>07월</option>
              <option>08월(방학)</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeStepBox === "출결특기사항등록" && (
            <button
              id="btn-batch-perfect-attendance"
              onClick={handleBatchPerfect}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isBatchPerfectDone
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-batch-perfect-attendance"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isBatchPerfectDone ? "개근 일괄입력 완료 ✓" : "개근 일괄입력"}</span>
            </button>
          )}

          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>엑셀</span>
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded">
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>출력</span>
          </button>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded text-xs text-indigo-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-indigo-950">출결 관리 핵심 지침: </span>
          <span>
            결석·지각 발생 시 [비고등록(보조장부)]을 입력하고, 월별 마감 후 반드시 [승인요청]을 상신해야 합니다.
          </span>
          <p className="mt-0.5 text-[11px] text-indigo-800">
            ※ 방학으로 출석일수가 0일인 달(8월, 1월 등)도 0일로 마감 필수 (매뉴얼 124p, 주요 감사지적 예방)
          </p>
        </div>
      </div>

      {/* Step Contents */}
      {activeStepBox === "일일출결관리" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-slate-800">4학년 1반 5월 일일출결 현황</span>
              <span className="text-[11px] text-slate-500">결석 칸을 클릭하여 사유 및 비고를 등록할 수 있습니다.</span>
            </div>

            <button
              onClick={() => onActionTriggered?.("btn-save-daily-attendance")}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>출결 저장</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="p-2 border-r border-slate-200 w-12">번호</th>
                  <th className="p-2 border-r border-slate-200 w-20">성명</th>
                  <th className="p-2 border-r border-slate-200 w-16">수업일수</th>
                  <th className="p-2 border-r border-slate-200 bg-blue-50/50">05/04 (월)</th>
                  <th className="p-2 border-r border-slate-200 bg-red-50 text-red-700">05/05 (어린이날)</th>
                  <th className="p-2 border-r border-slate-200 bg-blue-50/50">05/06 (수)</th>
                  <th className="p-2 border-r border-slate-200 bg-blue-50/50">05/12 (화)</th>
                  <th className="p-2 border-r border-slate-200 bg-blue-50/50">05/13 (수)</th>
                  <th className="p-2 border-r border-slate-200">출결 비고 (보조장부)</th>
                  <th className="p-2 w-20">비고등록</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-2 border-r border-slate-200 font-bold">{st.studentNumber}</td>
                    <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">{st.name}</td>
                    <td className="p-2 border-r border-slate-200 text-blue-800 font-bold">20일</td>
                    <td className="p-2 border-r border-slate-200 text-slate-600">/</td>
                    <td className="p-2 border-r border-slate-200 bg-red-50/50 text-red-600 font-medium">휴업일</td>
                    <td className="p-2 border-r border-slate-200 text-slate-600">/</td>
                    <td className="p-2 border-r border-slate-200">
                      {st.name === "김하은" ? (
                        <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 font-bold rounded">
                          질병결석
                        </span>
                      ) : (
                        <span className="text-slate-600">/</span>
                      )}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-slate-600">/</td>
                    <td className="p-2 border-r border-slate-200 text-left px-3 text-slate-600">
                      {st.name === "김하은" ? (
                        <span className="text-rose-900 font-medium">{st.attendance?.remarks || "05/12 질병결석(감기)"}</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleOpenRemark(st)}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-700 text-[11px]"
                      >
                        비고입력
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeStepBox === "출결특기사항등록" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">학교생활기록부 출결상황 특기사항 등록</h4>
              <p className="text-[11px] text-slate-500">결석·지각·조퇴가 없는 학생에게 '개근'을 일괄 입력하거나 기타 사유를 등록합니다.</p>
            </div>

            <button
              onClick={handleBatchPerfect}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded shadow-xs"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>개근 일괄입력</span>
            </button>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-2 border-r border-slate-200 w-12">번호</th>
                <th className="p-2 border-r border-slate-200 w-24">성명</th>
                <th className="p-2 border-r border-slate-200 w-16">결석</th>
                <th className="p-2 border-r border-slate-200 w-16">지각</th>
                <th className="p-2 border-r border-slate-200 w-16">조퇴</th>
                <th className="p-2 border-r border-slate-200 w-16">결과</th>
                <th className="p-2">출결 특기사항 (생기부 반영)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200">{st.studentNumber}</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-900">{st.name}</td>
                  <td className="p-2 border-r border-slate-200">{st.attendance?.absent_sick ? "2" : "0"}</td>
                  <td className="p-2 border-r border-slate-200">{st.attendance?.late ? "1" : "0"}</td>
                  <td className="p-2 border-r border-slate-200">0</td>
                  <td className="p-2 border-r border-slate-200">0</td>
                  <td className="p-2 text-left px-3 font-semibold text-blue-900">
                    {st.name === "김하은"
                      ? "감기로 인한 질병결석 2일"
                      : isBatchPerfectDone || st.attendance?.specialRemark === "개근"
                      ? "개근"
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeStepBox === "월별출결및재적현황" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">5월 출결 마감 및 관리자 승인요청</h4>
              <p className="text-[11px] text-slate-500">학급별 월출결 마감을 확정하고 결재권자에게 월말 출결 통계를 상신합니다.</p>
            </div>

            <button
              id="btn-submit-attendance-monthly-approval"
              onClick={handleMonthlyApproval}
              disabled={isMonthlyApproved}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isMonthlyApproved
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-submit-attendance-monthly-approval"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{isMonthlyApproved ? "월마감 승인 상신완료 (완결)" : "출결 월마감 승인요청 상신"}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div><span className="text-slate-500">재적수:</span> <span className="font-bold text-slate-900">5명 (남3, 여2)</span></div>
            <div><span className="text-slate-500">수업일수:</span> <span className="font-bold text-blue-700">20일</span></div>
            <div><span className="text-slate-500">출석률:</span> <span className="font-bold text-emerald-700">98.0%</span></div>
            <div>
              <span className="text-slate-500">마감상태:</span>{" "}
              <span className={`font-bold ${isMonthlyApproved ? "text-emerald-700" : "text-amber-700"}`}>
                {isMonthlyApproved ? "월마감 완결" : "반마감 완료(상신대기)"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Remark Modal Dialog */}
      {isRemarkModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="px-4 py-3 bg-blue-800 text-white font-bold flex items-center justify-between">
              <span>일일출결 비고 등록 (보조장부)</span>
              <button onClick={() => setIsRemarkModalOpen(false)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-slate-500">대상 학생: </span>
                <span className="font-bold text-slate-800">{selectedStudentForRemark?.name}</span>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">결석/지각 사유 (비고 내용)</label>
                <textarea
                  value={remarkInput}
                  onChange={(e) => setRemarkInput(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-xs"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setIsRemarkModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  취소
                </button>
                <button
                  id="btn-save-daily-attendance"
                  onClick={handleSaveDailyAttendance}
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded shadow-xs"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
