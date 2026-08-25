import React, { useState } from "react";
import { Student } from "../../types";
import { 
  Search, 
  UserPlus, 
  Send, 
  CheckSquare, 
  FileCheck, 
  ArrowRightLeft, 
  AlertCircle, 
  Printer, 
  Download, 
  Check, 
  X,
  FileText,
  Info
} from "lucide-react";

interface TransferInViewProps {
  students: Student[];
  onAddTransferStudent: (student: Student) => void;
  onUpdateStudentStatus: (id: string, newStatus: "재학" | "전입") => void;
  onRequestApproval: (title: string, docType: any, details: string) => void;
  activeStepBox: string;
  onStepBoxChange: (step: string) => void;
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const TransferInView: React.FC<TransferInViewProps> = ({
  students,
  onAddTransferStudent,
  onUpdateStudentStatus,
  onRequestApproval,
  activeStepBox,
  onStepBoxChange,
  highlightedButtonId,
  onActionTriggered,
}) => {
  // State for transfer student registration modal
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedStudentForAction, setSelectedStudentForAction] = useState<string | null>(null);
  
  // Registration Form State
  const [formSearchName, setFormSearchName] = useState("정시우");
  const [formPrevSchool, setFormPrevSchool] = useState("수원인계초등학교");
  const [formGrade, setFormGrade] = useState(4);
  const [formClass, setFormClass] = useState(1);
  const [formNum, setFormNum] = useState(5);
  const [formSecretTransfer, setFormSecretTransfer] = useState(false);

  // Transfer workflow simulation status
  const [dataRequested, setDataRequested] = useState(false);
  const [dataReviewed, setDataReviewed] = useState(false);
  const [approvalRequested, setApprovalRequested] = useState(false);
  const [recordReflected, setRecordReflected] = useState(false);

  const transferStudent = students.find((s) => s.id === "s05") || students[0];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterOpen(false);
    onActionTriggered?.("btn-save-transfer-in-dialog");
  };

  const handleDataRequest = () => {
    setDataRequested(true);
    onActionTriggered?.("btn-request-data");
  };

  const handleApprovalSubmit = () => {
    setApprovalRequested(true);
    onRequestApproval(
      `전입생 학적반영 결재 (${transferStudent.name} - 4학년 1반)`,
      "전입학적반영",
      `이전학교(${formPrevSchool})로부터 수신된 전입자료(기본학적, 성적, 출결, 건강기록부) 검토 완료에 따른 학적반영 상신의 건`
    );
    onActionTriggered?.("btn-submit-transfer-approval");
  };

  const handleApplyRecord = () => {
    setRecordReflected(true);
    onUpdateStudentStatus(transferStudent.id, "재학");
    onActionTriggered?.("btn-apply-transfer-in-record");
  };

  return (
    <div className="p-4 space-y-4 bg-slate-100/50 min-h-full">
      {/* Search and Control Bar */}
      <div className="bg-white p-3.5 rounded border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">학년도:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700 font-medium">
              <option>2026</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">학년:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700 font-medium">
              <option>4학년</option>
              <option>전체</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">기간:</span>
            <input
              type="date"
              defaultValue="2026-03-01"
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700"
            />
            <span>~</span>
            <input
              type="date"
              defaultValue="2026-06-30"
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700"
            />
          </div>

          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeStepBox === "전편입재취학생등록" && (
            <button
              id="btn-register-transfer-in"
              onClick={() => {
                setIsRegisterOpen(true);
                onActionTriggered?.("btn-register-transfer-in");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                highlightedButtonId === "btn-register-transfer-in"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>전입생 등록</span>
            </button>
          )}

          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>엑셀</span>
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded">
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>출력</span>
          </button>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-blue-50/80 border border-blue-200 rounded text-xs text-blue-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-950">전입관리 5단계 업무 프로세스: </span>
          <span>
            [1. 전편입/재취학생 등록] ➔ [2. 자료요청(전출교 송부)] ➔ [3. 전입자료조회 및 검토] ➔ [4. 기안문서 상신 및 결재] ➔ [5. 학적반영 및 자료이관]
          </span>
          <p className="mt-1 text-[11px] text-blue-700">
            ※ 재취학 대상 학생은 추가입학 메뉴에서 이중 학적을 생성하지 않고 본 메뉴에서 기존 학적을 불러와 처리해야 합니다. (매뉴얼 91p)
          </p>
        </div>
      </div>

      {/* Step Specific Contents */}
      {activeStepBox === "전편입재취학생등록" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800">전입·편입·재취학생 등록 목록 (Total 1)</span>
            <span className="text-xs text-slate-500">신규 학생을 등록하면 목록에 추가됩니다.</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="p-2.5 border-r border-slate-200">선택</th>
                  <th className="p-2.5 border-r border-slate-200">학적변동일자</th>
                  <th className="p-2.5 border-r border-slate-200">변동구분</th>
                  <th className="p-2.5 border-r border-slate-200">성명</th>
                  <th className="p-2.5 border-r border-slate-200">주민등록번호</th>
                  <th className="p-2.5 border-r border-slate-200">이전학교</th>
                  <th className="p-2.5 border-r border-slate-200">신규취득학적</th>
                  <th className="p-2.5">진행상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 border-r border-slate-200">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  </td>
                  <td className="p-2.5 border-r border-slate-200 text-slate-700 font-medium">2026.03.18</td>
                  <td className="p-2.5 border-r border-slate-200">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium">전입학</span>
                  </td>
                  <td className="p-2.5 border-r border-slate-200 font-bold text-slate-900">{transferStudent.name}</td>
                  <td className="p-2.5 border-r border-slate-200 text-slate-600">{transferStudent.residentId}</td>
                  <td className="p-2.5 border-r border-slate-200 text-slate-700">{formPrevSchool}</td>
                  <td className="p-2.5 border-r border-slate-200 font-semibold text-blue-700">
                    {formGrade}학년 {formClass}반 {formNum}번
                  </td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-[11px]">
                      {dataRequested ? "자료요청완료" : "전입등록(요청대기)"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeStepBox === "자료요청및취소" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs overflow-hidden space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-blue-600" />
              <span>전출교로 생활기록부 및 건강기록부 자료요청</span>
            </h4>

            <button
              id="btn-request-data"
              onClick={handleDataRequest}
              disabled={dataRequested}
              className={`flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                dataRequested
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : highlightedButtonId === "btn-request-data"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{dataRequested ? "자료요청 송부완료" : "자료요청 송부하기"}</span>
            </button>
          </div>

          <div className="border border-slate-200 rounded p-3 bg-slate-50 text-xs space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div><span className="text-slate-500">학생명:</span> <span className="font-bold text-slate-800">{transferStudent.name}</span></div>
              <div><span className="text-slate-500">이전학교:</span> <span className="font-bold text-slate-800">{formPrevSchool}</span></div>
              <div><span className="text-slate-500">배정학적:</span> <span className="font-bold text-blue-700">4학년 1반 5번</span></div>
              <div>
                <span className="text-slate-500">요청상태:</span>{" "}
                <span className={`font-bold ${dataRequested ? "text-emerald-600" : "text-amber-600"}`}>
                  {dataRequested ? "전송대기(요청됨)" : "자료요청의뢰 대기"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStepBox === "전입자료조회" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">수신된 전출교 학생 자료 검토 (전송자료 일람)</h4>
              <p className="text-[11px] text-slate-500">항목별 버튼을 클릭하여 수신된 자료의 이상 유무를 점검합니다.</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold text-xs flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> 수신 완료
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button className="p-2.5 bg-blue-50/70 border border-blue-200 rounded text-left hover:bg-blue-100/70 transition-colors">
              <div className="font-bold text-blue-900">기본학적</div>
              <div className="text-[11px] text-slate-500">인적사항 및 주소 확인</div>
            </button>
            <button className="p-2.5 bg-blue-50/70 border border-blue-200 rounded text-left hover:bg-blue-100/70 transition-colors">
              <div className="font-bold text-blue-900">성적자료</div>
              <div className="text-[11px] text-slate-500">교과평가 및 세특 내역</div>
            </button>
            <button className="p-2.5 bg-blue-50/70 border border-blue-200 rounded text-left hover:bg-blue-100/70 transition-colors">
              <div className="font-bold text-blue-900">출결내역 (185일)</div>
              <div className="text-[11px] text-slate-500">이전학교 출결 연동</div>
            </button>
            <button className="p-2.5 bg-blue-50/70 border border-blue-200 rounded text-left hover:bg-blue-100/70 transition-colors">
              <div className="font-bold text-blue-900">건강기록부 / PAPS</div>
              <div className="text-[11px] text-slate-500">신체발달 및 예방접종</div>
            </button>
          </div>
        </div>
      )}

      {activeStepBox === "상신" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">전입생 학적반영 기안문서 상신</h4>
              <p className="text-[11px] text-slate-500">전입 처리 최종 결재를 위해 관리자(교감·교장) 결재를 상신합니다.</p>
            </div>

            <button
              id="btn-submit-transfer-approval"
              onClick={handleApprovalSubmit}
              disabled={approvalRequested}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                approvalRequested
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : highlightedButtonId === "btn-submit-transfer-approval"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{approvalRequested ? "결재 상신 완료 (완결됨)" : "기안문서 상신하기"}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs">
            <span className="font-bold text-slate-700">기안제목: </span>
            <span className="text-slate-900 font-medium">전입생 학적반영 결재 ({transferStudent.name} - 4학년 1반)</span>
            <div className="mt-2 text-slate-600 flex items-center gap-4">
              <span>결재선: 담임(박교사) ➔ 교감(윤교감) ➔ 교장(한교장)</span>
              <span className={`font-bold ${approvalRequested ? "text-emerald-600" : "text-amber-600"}`}>
                상태: {approvalRequested ? "완결 (학적반영 가능)" : "미상신"}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeStepBox === "학적반영" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">전입생 최종 학적반영 및 자료이관 실행</h4>
              <p className="text-[11px] text-slate-500">결재 완료된 전입생을 본교 4학년 1반 학적에 정식 편입합니다.</p>
            </div>

            <button
              id="btn-apply-transfer-in-record"
              onClick={handleApplyRecord}
              disabled={recordReflected}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                recordReflected
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-apply-transfer-in-record"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{recordReflected ? "학적반영 및 이관 완료 ✓" : "학적반영 실행"}</span>
            </button>
          </div>

          {recordReflected && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="font-bold">
                정시우 학생의 학적이 4학년 1반 5번으로 정상 반영되었으며, 전출교의 생활기록부 및 건강기록부가 본교 데이터베이스로 이관 완료되었습니다.
              </span>
            </div>
          )}
        </div>
      )}

      {/* Register Modal Dialog */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden text-xs">
            <div className="px-4 py-3 bg-blue-800 text-white font-bold flex items-center justify-between">
              <span>전편입/재취학생 등록 팝업</span>
              <button onClick={() => setIsRegisterOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">변동구분 *</label>
                  <select className="w-full border border-slate-300 rounded p-1.5 bg-slate-50 font-medium">
                    <option>전입학</option>
                    <option>재취학</option>
                    <option>편입학</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">학적변동일자 *</label>
                  <input
                    type="date"
                    defaultValue="2026-03-18"
                    className="w-full border border-slate-300 rounded p-1.5 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">학생 성명 *</label>
                  <input
                    type="text"
                    value={formSearchName}
                    onChange={(e) => setFormSearchName(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">이전학교 *</label>
                  <input
                    type="text"
                    value={formPrevSchool}
                    onChange={(e) => setFormPrevSchool(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5"
                    required
                  />
                </div>
              </div>

              {/* 신규취득학적 */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
                <span className="font-bold text-slate-800 block">신규 취득 학적 지정</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-500 block">배정학년</label>
                    <input
                      type="number"
                      value={formGrade}
                      onChange={(e) => setFormGrade(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">배정반</label>
                    <input
                      type="number"
                      value={formClass}
                      onChange={(e) => setFormClass(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">배정번호 (자동채번)</label>
                    <input
                      type="number"
                      value={formNum}
                      onChange={(e) => setFormNum(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-1 bg-white font-bold text-blue-700"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="secret-transfer"
                  checked={formSecretTransfer}
                  onChange={(e) => setFormSecretTransfer(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <label htmlFor="secret-transfer" className="text-slate-700 text-xs">
                  비밀전입 여부 (체크 시 학부모서비스 신청정보 전송 제외)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  취소
                </button>
                <button
                  type="submit"
                  id="btn-save-transfer-in-dialog"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded shadow-xs"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
