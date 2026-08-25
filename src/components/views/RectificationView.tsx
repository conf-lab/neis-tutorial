import React, { useState } from "react";
import { Student } from "../../types";
import { 
  Search, 
  Save, 
  FileCheck, 
  AlertCircle, 
  ShieldAlert, 
  FileText, 
  Info,
  Check, 
  Download, 
  Printer,
  Trash2
} from "lucide-react";

interface RectificationViewProps {
  students: Student[];
  onRequestApproval: (title: string, docType: any, details: string) => void;
  activeStepBox: string;
  onStepBoxChange: (step: string) => void;
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const RectificationView: React.FC<RectificationViewProps> = ({
  students,
  onRequestApproval,
  activeStepBox,
  onStepBoxChange,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState("s03"); // 박도윤
  const [rectCategory, setRectCategory] = useState("출결상황");
  const [errContent, setErrContent] = useState("3학년 재학 당시 수업일수 오기재 (186일)");
  const [correctedContent, setCorrectedContent] = useState("수업일수 191일로 정정");
  const [rectReason, setRectReason] = useState("학교생활기록 작성 및 관리지침(교육부훈령) 제18조에 의거한 입력오류 정정");
  const [deliberationDate, setDeliberationDate] = useState("2026-04-16");
  
  const [isSaved, setIsSaved] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const targetStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleSelectStudentForRegister = () => {
    onStepBoxChange("2.정정대장등록");
    onActionTriggered?.("btn-step-rectification-register");
  };

  const handleSaveEntry = () => {
    setIsSaved(true);
    onActionTriggered?.("btn-save-rectification-entry");
  };

  const handleSubmitApproval = () => {
    setIsApproved(true);
    onRequestApproval(
      `학교생활기록부 정정대장 작성 승인의 건 (${targetStudent.name} - 제2026-01호)`,
      "정정대장",
      `${targetStudent.name} 학생의 ${rectCategory} 정정 건 (오류: ${errContent} ➔ 정정: ${correctedContent}). 객관적 증빙자료 첨부 및 학업성적관리위원회 심의 완료.`
    );
    onActionTriggered?.("btn-submit-rectification-approval");
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
            <span>출력</span>
          </button>
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-red-50/80 border border-red-200 rounded text-xs text-red-900 flex items-start gap-2.5 shadow-2xs">
        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-red-950">학교생활기록부 정정대장 법정 규정: </span>
          <span>
            당해 학년도 이전 자료의 정정은 객관적 증빙자료가 있는 경우에만 가능하며, 반드시 <strong className="underline decoration-red-400 font-bold">"담임 - 학생부부장 - 교감 - 교장" 4단 결재</strong>를 거쳐야 합니다.
          </span>
          <p className="mt-0.5 text-[11px] text-red-800">
            ※ 기결취소가 불가하므로 상신 전 면밀한 사전 검토가 필수입니다. (매뉴얼 237p~240p)
          </p>
        </div>
      </div>

      {/* Step 1: 1.정정대장목록 */}
      {activeStepBox === "1.정정대장목록" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">4학년 1반 정정대상 학생 선택</h4>
              <p className="text-[11px] text-slate-500">학생 성명을 클릭하여 [2.정정대장등록] 화면으로 진입합니다.</p>
            </div>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-2 border-r border-slate-200 w-12">번호</th>
                <th className="p-2 border-r border-slate-200 w-24">성명</th>
                <th className="p-2 border-r border-slate-200">주민등록번호</th>
                <th className="p-2 border-r border-slate-200">정정대장 작성 상태</th>
                <th className="p-2 w-28">선택 및 등록</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((st) => (
                <tr 
                  key={st.id} 
                  className={`hover:bg-slate-50 ${selectedStudentId === st.id ? "bg-blue-50/60" : ""}`}
                >
                  <td className="p-2 border-r border-slate-200">{st.studentNumber}</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-900">{st.name}</td>
                  <td className="p-2 border-r border-slate-200 text-slate-600">{st.residentId}</td>
                  <td className="p-2 border-r border-slate-200">
                    {st.id === "s03" && isSaved ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-[11px]">
                        등록완료 (상신대기)
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">미작성</span>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      id="btn-step-rectification-register"
                      onClick={() => {
                        setSelectedStudentId(st.id);
                        handleSelectStudentForRegister();
                      }}
                      className={`px-3 py-1 text-[11px] font-semibold rounded transition-all shadow-xs ${
                        st.id === "s03" && highlightedButtonId === "btn-step-rectification-register"
                          ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                          : "bg-blue-600 hover:bg-blue-500 text-white"
                      }`}
                    >
                      정정등록 ➔
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Step 2: 2.정정대장등록 */}
      {activeStepBox === "2.정정대장등록" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">정정대장 등록: {targetStudent.name} (4학년 1반 {targetStudent.studentNumber}번)</h4>
              <p className="text-[11px] text-slate-500">오류내용, 정정내용, 정정사유 및 학업성적관리위원회 심의일자를 기재합니다.</p>
            </div>

            <button
              id="btn-save-rectification-entry"
              onClick={handleSaveEntry}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isSaved
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-save-rectification-entry"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? "정정대장 등록 저장 완료 ✓" : "정정대장 저장"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">정정 항목 선택 *</label>
                <select 
                  value={rectCategory}
                  onChange={(e) => setRectCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded p-1.5 bg-slate-50 font-medium"
                >
                  <option>출결상황</option>
                  <option>인적·학적사항</option>
                  <option>교과학습발달상황</option>
                  <option>창의적체험활동</option>
                  <option>행동특성및종합의견</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">학업성적관리위원회 심의일자 *</label>
                <input
                  type="date"
                  value={deliberationDate}
                  onChange={(e) => setDeliberationDate(e.target.value)}
                  className="w-full border border-slate-300 rounded p-1.5 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">오류내용 (정정 전) *</label>
                <textarea
                  value={errContent}
                  onChange={(e) => setErrContent(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-xs"
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">정정내용 (정정 후) *</label>
                <textarea
                  value={correctedContent}
                  onChange={(e) => setCorrectedContent(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-xs text-blue-900 font-medium"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">정정사유 *</label>
                <textarea
                  value={rectReason}
                  onChange={(e) => setRectReason(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-xs"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: 3.항목별정정 */}
      {activeStepBox === "3.항목별정정" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">항목별 세부 수정 및 동일학년 재취학 중복자료 삭제</h4>
              <p className="text-[11px] text-slate-500">재취학 등으로 중복된 학년자료가 발생한 경우 {`{학년자료삭제}`} 버튼으로 일괄 삭제합니다. (매뉴얼 239p)</p>
            </div>

            <button className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded font-semibold text-xs">
              <Trash2 className="w-3.5 h-3.5" />
              <span>중복 학년자료삭제</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs">
            <span className="font-bold text-slate-800">정정 반영 대상 항목: </span>
            <span className="text-blue-800 font-semibold">{rectCategory}</span>
            <p className="mt-1 text-slate-600">
              정정대장 완결 시 3학년 학교생활기록부 출결상황의 수업일수가 186일에서 191일로 자동 치환 반영됩니다.
            </p>
          </div>
        </div>
      )}

      {/* Step 4: 4.승인요청 */}
      {activeStepBox === "4.승인요청" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">정정대장 4단 결재 상신 (담임 - 부장 - 교감 - 교장)</h4>
              <p className="text-[11px] text-slate-500">결재라인을 확인하고 최종 승인요청을 기안합니다.</p>
            </div>

            <button
              id="btn-submit-rectification-approval"
              onClick={handleSubmitApproval}
              disabled={isApproved}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isApproved
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-submit-rectification-approval"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-red-700 hover:bg-red-600 text-white"
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{isApproved ? "4단 결재 상신 완료 (완결)" : "정정대장 4단 결재 상신"}</span>
            </button>
          </div>

          {/* Approval Line Card */}
          <div className="border border-slate-200 rounded p-3 bg-slate-50 space-y-3">
            <span className="font-bold text-slate-800 block text-xs">학교생활기록부 정정대장 지정 결재선 (4단)</span>
            
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-white border border-slate-200 rounded shadow-2xs">
                <div className="text-[10px] text-slate-500">1단 (기안)</div>
                <div className="font-bold text-slate-800 mt-1">담임 (박교사)</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">✓ 서명완료</div>
              </div>

              <div className="p-2.5 bg-white border border-slate-200 rounded shadow-2xs">
                <div className="text-[10px] text-slate-500">2단 (검토)</div>
                <div className="font-bold text-slate-800 mt-1">학생부부장 (최교사)</div>
                <div className={`text-[10px] font-semibold mt-1 ${isApproved ? "text-emerald-600" : "text-amber-600"}`}>
                  {isApproved ? "✓ 서명완료" : "대기"}
                </div>
              </div>

              <div className="p-2.5 bg-white border border-slate-200 rounded shadow-2xs">
                <div className="text-[10px] text-slate-500">3단 (검토)</div>
                <div className="font-bold text-slate-800 mt-1">교감 (윤교감)</div>
                <div className={`text-[10px] font-semibold mt-1 ${isApproved ? "text-emerald-600" : "text-amber-600"}`}>
                  {isApproved ? "✓ 서명완료" : "대기"}
                </div>
              </div>

              <div className="p-2.5 bg-white border border-slate-200 rounded shadow-2xs">
                <div className="text-[10px] text-slate-500">4단 (결재)</div>
                <div className="font-bold text-slate-800 mt-1">학교장 (한교장)</div>
                <div className={`text-[10px] font-semibold mt-1 ${isApproved ? "text-emerald-600" : "text-amber-600"}`}>
                  {isApproved ? "✓ 결재완결" : "대기"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
