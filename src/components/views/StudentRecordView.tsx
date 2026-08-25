import React, { useState } from "react";
import { Student } from "../../types";
import { 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Lock, 
  Unlock, 
  Download, 
  Printer, 
  Info,
  Check
} from "lucide-react";

interface StudentRecordViewProps {
  students: Student[];
  onRequestApproval: (title: string, docType: any, details: string) => void;
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const StudentRecordView: React.FC<StudentRecordViewProps> = ({
  students,
  onRequestApproval,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [activeTab, setActiveTab] = useState<"sync" | "verify" | "close">("sync");
  const [isSyncCompleted, setIsSyncCompleted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isExceptionHandled, setIsExceptionHandled] = useState(false);
  const [isClassClosed, setIsClassClosed] = useState(false);
  const [isGradeClosed, setIsGradeClosed] = useState(false);
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [exceptionReason, setExceptionReason] = useState("전입일자(03.18) 이후 이전학교 출결 및 건강기록부 자료 정상 이관 완료로 인한 확인필요 인정");

  const handleSyncAll = () => {
    setIsSyncCompleted(true);
    onActionTriggered?.("btn-sync-all-records");
  };

  const handleRunVerification = () => {
    setIsVerified(true);
    onActionTriggered?.("btn-run-data-verification");
  };

  const handleSaveException = () => {
    setIsExceptionHandled(true);
    setIsExceptionModalOpen(false);
  };

  const handleCloseClass = () => {
    setIsClassClosed(true);
    onActionTriggered?.("btn-close-class-record");
  };

  const handleGradeApproval = () => {
    setIsGradeClosed(true);
    onRequestApproval(
      "2026학년도 4학년 학교생활기록부 전체마감 및 결재 상신",
      "학생부마감",
      "4학년 1반~3반 전 학급 자료검증, 예외처리 및 반마감 완료에 따른 학년 전체마감 승인요청의 건"
    );
    onActionTriggered?.("btn-submit-grade-record-approval");
  };

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
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-medium">
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
              onClick={() => setActiveTab("sync")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "sync" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              1. 학생부 반영
            </button>
            <button
              onClick={() => setActiveTab("verify")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "verify" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              2. 자료검증 및 반마감
            </button>
            <button
              onClick={() => setActiveTab("close")}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                activeTab === "close" ? "bg-white text-blue-800 shadow-xs" : "text-slate-600"
              }`}
            >
              3. 학년마감 및 승인
            </button>
          </div>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-teal-50/80 border border-teal-200 rounded text-xs text-teal-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-teal-950">학교생활기록부 마감 가이드: </span>
          <span>
            이전에 입력한 자료를 수정했을 경우 반드시 [학생부반영]을 다시 실행해야 수정된 자료로 반영됩니다. (매뉴얼 232p)
          </span>
          <p className="mt-0.5 text-[11px] text-teal-800">
            ※ '확인필요' 오류는 원인을 확인하여 수정하거나 정당한 사유가 있는 경우 예외처리사유를 입력해야 반마감이 가능합니다.
          </p>
        </div>
      </div>

      {/* Tab 1: Sync */}
      {activeTab === "sync" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">학교생활기록부 자료 전체 반영</h4>
              <p className="text-[11px] text-slate-500">인적사항, 학적사항, 출결상황, 창의적체험활동, 교과학습발달상황, 행동특성 및 종합의견을 생기부에 동기화합니다.</p>
            </div>

            <button
              id="btn-sync-all-records"
              onClick={handleSyncAll}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isSyncCompleted
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-sync-all-records"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncCompleted ? "" : "animate-spin"}`} />
              <span>{isSyncCompleted ? "생기부 전체반영 완료 ✓" : "생기부 전체반영 실행"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block">인적·학적사항:</span>
              <span className="font-bold text-slate-800">{isSyncCompleted ? "반영완료 (2026.03.18)" : "반영대기"}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block">출결상황:</span>
              <span className="font-bold text-slate-800">{isSyncCompleted ? "반영완료 (2026.03.18)" : "반영대기"}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block">교과학습발달상황:</span>
              <span className="font-bold text-slate-800">{isSyncCompleted ? "반영완료 (2026.03.18)" : "반영대기"}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 block">행동특성및종합의견:</span>
              <span className="font-bold text-slate-800">{isSyncCompleted ? "반영완료 (2026.03.18)" : "반영대기"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Verify & Class Close */}
      {activeTab === "verify" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">학교생활기록부 자료검증 및 반마감</h4>
              <p className="text-[11px] text-slate-500">기록 누락이나 주민등록번호 불일치, 출결 이상 여부를 시스템 룰셋으로 검증합니다.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-run-data-verification"
                onClick={handleRunVerification}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                  highlightedButtonId === "btn-run-data-verification"
                    ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>전체검증 실행</span>
              </button>

              <button
                id="btn-close-class-record"
                onClick={handleCloseClass}
                disabled={!isVerified || isClassClosed}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                  isClassClosed
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : highlightedButtonId === "btn-close-class-record"
                    ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                    : !isVerified
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-teal-700 hover:bg-teal-600 text-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isClassClosed ? "반마감 완료 ✓" : "반마감 실행"}</span>
              </button>
            </div>
          </div>

          {/* Verification Results Table */}
          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="p-2 border-r border-slate-200">검증항목</th>
                  <th className="p-2 border-r border-slate-200">최종검증일</th>
                  <th className="p-2 border-r border-slate-200">확인여부</th>
                  <th className="p-2 border-r border-slate-200">검증내역</th>
                  <th className="p-2 border-r border-slate-200">예외처리사유</th>
                  <th className="p-2 w-24">예외처리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 border-r border-slate-200 font-semibold text-slate-800">인적·학적사항</td>
                  <td className="p-2 border-r border-slate-200">2026.03.18</td>
                  <td className="p-2 border-r border-slate-200">
                    <span className="text-slate-400 font-medium">정상 (공란)</span>
                  </td>
                  <td className="p-2 border-r border-slate-200 text-slate-500 text-left px-3">오류 없음</td>
                  <td className="p-2 border-r border-slate-200 text-slate-400">-</td>
                  <td className="p-2 text-slate-400">-</td>
                </tr>
                <tr className="bg-amber-50/40">
                  <td className="p-2 border-r border-slate-200 font-semibold text-slate-800">출결상황</td>
                  <td className="p-2 border-r border-slate-200">2026.03.18</td>
                  <td className="p-2 border-r border-slate-200">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded">
                      확인필요
                    </span>
                  </td>
                  <td className="p-2 border-r border-slate-200 text-left px-3 text-amber-950 font-medium">
                    전입생(정시우) 이전학교 출결일수 이관 확인 요망
                  </td>
                  <td className="p-2 border-r border-slate-200 text-left px-3 text-slate-700">
                    {isExceptionHandled ? exceptionReason : "미입력"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => setIsExceptionModalOpen(true)}
                      className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium text-[11px]"
                    >
                      사유입력
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200 font-semibold text-slate-800">교과학습발달상황</td>
                  <td className="p-2 border-r border-slate-200">2026.03.18</td>
                  <td className="p-2 border-r border-slate-200">
                    <span className="text-slate-400 font-medium">정상 (공란)</span>
                  </td>
                  <td className="p-2 border-r border-slate-200 text-slate-500 text-left px-3">전 과목 세특 입력 완료</td>
                  <td className="p-2 border-r border-slate-200 text-slate-400">-</td>
                  <td className="p-2 text-slate-400">-</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-200 font-semibold text-slate-800">행동특성및종합의견</td>
                  <td className="p-2 border-r border-slate-200">2026.03.18</td>
                  <td className="p-2 border-r border-slate-200">
                    <span className="text-slate-400 font-medium">정상 (공란)</span>
                  </td>
                  <td className="p-2 border-r border-slate-200 text-slate-500 text-left px-3">전원 입력 완료</td>
                  <td className="p-2 border-r border-slate-200 text-slate-400">-</td>
                  <td className="p-2 text-slate-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Grade Close */}
      {activeTab === "close" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">4학년 학교생활기록부 전체마감 및 결재 상신</h4>
              <p className="text-[11px] text-slate-500">모든 반의 반마감 완료 확인 후 학년 전체마감 기안을 결재 상신합니다.</p>
            </div>

            <button
              id="btn-submit-grade-record-approval"
              onClick={handleGradeApproval}
              disabled={isGradeClosed}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isGradeClosed
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-submit-grade-record-approval"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{isGradeClosed ? "학년 전체마감 상신완료 (완결) ✓" : "학년 전체마감 승인요청"}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">4학년 반별 마감 현황</span>
              <span className="text-emerald-700 font-bold">1반, 2반, 3반 전체 반마감 완료</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center font-semibold text-emerald-900">
                4학년 1반: 마감완료
              </div>
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center font-semibold text-emerald-900">
                4학년 2반: 마감완료
              </div>
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center font-semibold text-emerald-900">
                4학년 3반: 마감완료
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exception Modal */}
      {isExceptionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden text-xs">
            <div className="px-4 py-3 bg-amber-600 text-white font-bold flex items-center justify-between">
              <span>자료검증 예외처리사유 일괄 입력</span>
              <button onClick={() => setIsExceptionModalOpen(false)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="font-bold text-slate-800 block mb-1">검증오류 내용:</span>
                <p className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700">
                  전입생(정시우) 이전학교 출결일수 이관 확인 요망
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">예외처리 사유 등록 *</label>
                <textarea
                  value={exceptionReason}
                  onChange={(e) => setExceptionReason(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-xs"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setIsExceptionModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveException}
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded shadow-xs"
                >
                  사유 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
