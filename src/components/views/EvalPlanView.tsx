import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Save, 
  Trash2, 
  FileCheck, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Download, 
  Printer, 
  Check, 
  Copy,
  Info
} from "lucide-react";

interface EvalPlanViewProps {
  activeStepBox: string;
  onStepBoxChange: (step: string) => void;
  onRequestApproval: (title: string, docType: any, details: string) => void;
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const EvalPlanView: React.FC<EvalPlanViewProps> = ({
  activeStepBox,
  onStepBoxChange,
  onRequestApproval,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [selectedSubject, setSelectedSubject] = useState("국어");
  const [selectedGrade, setSelectedGrade] = useState("4학년");
  const [isBatchCriteriaModalOpen, setIsBatchCriteriaModalOpen] = useState(false);
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);

  // Evaluaton Plan Criteria State
  const [criteriaItems, setCriteriaItems] = useState([
    {
      id: "c1",
      area: "문학",
      standard: "[6국05-03] 비유적 표현의 특성과 효과를 살려 생각과 느낌을 다양하게 표현한다.",
      element: "서로 표현할 대상을 비유적인 표현을 사용하여 시 완성하기",
      step4: {
        high: "비유적 표현의 원리를 깊이 이해하고 참신한 비유를 사용하여 시를 창의적으로 씀.",
        mid: "비유적 표현을 바르게 사용하여 생각이나 느낌을 시로 표현함.",
        low: "비유적 표현의 뜻을 이해하고 예시를 참고하여 시를 씀.",
        need: "비유적 표현의 개념을 이해하는 데 교사의 도움이 필요함."
      }
    },
    {
      id: "c2",
      area: "읽기·말하기",
      standard: "[6국01-04] 자료를 정리하여 발표할 내용을 체계적으로 구성한다.",
      element: "자료를 활용해 발표하기",
      step4: {
        high: "주제에 맞는 매체 자료를 효과적으로 활용하여 설득력 있게 발표함.",
        mid: "발표 내용에 알맞은 시각 자료를 적절히 활용하여 발표함.",
        low: "준비한 자료를 바탕으로 내용을 전달함.",
        need: "자료를 발표에 활용하는 데 어려움이 있어 추가 지도가 필요함."
      }
    }
  ]);

  const [isPlanClosed, setIsPlanClosed] = useState(false);
  const [isPlanApproved, setIsPlanApproved] = useState(false);

  const handleBatchCriteriaSave = () => {
    setIsBatchCriteriaModalOpen(false);
    onActionTriggered?.("btn-batch-eval-criteria-save");
  };

  const handlePlanApproval = () => {
    setIsPlanClosed(true);
    setIsPlanApproved(true);
    onRequestApproval(
      `2026학년도 1학기 ${selectedGrade} ${selectedSubject}과 평가계획(안) 승인의 건`,
      "평가계획",
      `${selectedGrade} 1학기 ${selectedSubject}과 성취기준 및 4단계 평가기준안 심의·결재 요청`
    );
    onActionTriggered?.("btn-submit-eval-plan-approval");
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
            <span className="font-semibold text-slate-700">학기:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1">
              <option>1학기</option>
              <option>2학기</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">학년:</span>
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-medium text-slate-800"
            >
              <option>4학년</option>
              <option>3학년</option>
              <option>5학년</option>
              <option>6학년</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">교과(목):</span>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-blue-900"
            >
              <option>국어</option>
              <option>수학</option>
              <option>사회</option>
              <option>과학</option>
              <option>디지털 민주시민(활동)</option>
            </select>
          </div>

          <button 
            id="btn-search-eval-plan"
            onClick={() => onActionTriggered?.("btn-search-eval-plan")}
            className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsExampleModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded font-semibold transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>예시문 검색</span>
          </button>

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
      <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded text-xs text-emerald-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-emerald-950">평가계획(안) 수립 및 결재 가이드: </span>
          <span>
            [성취기준관리] ➔ [성취기준(평가기준)관리 - 4단계 일괄입력] ➔ [평가계획(안)마감 및 승인상신].
          </span>
          <p className="mt-0.5 text-[11px] text-emerald-800">
            ※ 평가계획 마감 후 수정이 필요한 경우: 평가계획안 기결취소 ➔ 마감취소 후 성취기준/평가기준을 수정합니다. (매뉴얼 213p)
          </p>
        </div>
      </div>

      {/* Step Contents */}
      {activeStepBox === "성취기준관리" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-slate-800">국어과 성취기준 및 평가요소 관리 (Total {criteriaItems.length})</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[11px] font-semibold">학년별 관리 모드</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded">
                <Plus className="w-3 h-3" /> 행추가
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium">
                <Save className="w-3 h-3" /> 저장
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-center">
                  <th className="p-2.5 border-r border-slate-200 w-12">선택</th>
                  <th className="p-2.5 border-r border-slate-200 w-24">영역명</th>
                  <th className="p-2.5 border-r border-slate-200">성취기준</th>
                  <th className="p-2.5 border-r border-slate-200">평가요소</th>
                  <th className="p-2.5 w-20">등록자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {criteriaItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-2.5 border-r border-slate-200 text-center">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-800">
                      {item.area}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-700 leading-relaxed">
                      {item.standard}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-700 leading-relaxed font-medium">
                      {item.element}
                    </td>
                    <td className="p-2.5 text-center text-slate-500">교원03</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeStepBox === "성취기준(평가기준)관리" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>성취기준별 4단계 평가기준 설정 (매우잘함 / 잘함 / 보통 / 노력요함)</span>
              </h4>
              <p className="text-[11px] text-slate-500">단위학교 학업성적관리규정에 맞춰 성취수준별 평가기준 서술문을 입력합니다.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-batch-eval-criteria-save"
                onClick={() => setIsBatchCriteriaModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                  highlightedButtonId === "btn-batch-eval-criteria-save"
                    ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>평가기준 일괄입력</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {criteriaItems.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded p-3 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">
                    [{item.area}] {item.standard}
                  </span>
                  <span className="text-[11px] text-slate-500">평가요소: {item.element}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 bg-blue-50/80 border border-blue-200 rounded">
                    <span className="font-bold text-blue-900 block mb-1">매우잘함</span>
                    <p className="text-[11px] text-slate-700 leading-relaxed">{item.step4.high}</p>
                  </div>
                  <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded">
                    <span className="font-bold text-emerald-900 block mb-1">잘함</span>
                    <p className="text-[11px] text-slate-700 leading-relaxed">{item.step4.mid}</p>
                  </div>
                  <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded">
                    <span className="font-bold text-amber-900 block mb-1">보통</span>
                    <p className="text-[11px] text-slate-700 leading-relaxed">{item.step4.low}</p>
                  </div>
                  <div className="p-2.5 bg-rose-50/80 border border-rose-200 rounded">
                    <span className="font-bold text-rose-900 block mb-1">노력요함</span>
                    <p className="text-[11px] text-slate-700 leading-relaxed">{item.step4.need}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeStepBox === "평가계획(안)마감" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">평가계획(안) 학년 마감 및 결재 상신</h4>
              <p className="text-[11px] text-slate-500">모든 교과의 평가계획 마감 여부를 확인한 후 승인요청을 진행합니다.</p>
            </div>

            <button
              id="btn-submit-eval-plan-approval"
              onClick={handlePlanApproval}
              disabled={isPlanApproved}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isPlanApproved
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-submit-eval-plan-approval"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{isPlanApproved ? "승인요청 상신완료 (완결)" : "평가계획(안) 승인요청 상신"}</span>
            </button>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-2 border-r border-slate-200">과목명</th>
                <th className="p-2 border-r border-slate-200">평가단계</th>
                <th className="p-2 border-r border-slate-200">평가계획안 마감여부</th>
                <th className="p-2">결재상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2 border-r border-slate-200 font-bold text-slate-800">국어</td>
                <td className="p-2 border-r border-slate-200 text-blue-700 font-medium">4단계 (매우잘함~노력요함)</td>
                <td className="p-2 border-r border-slate-200">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">마감</span>
                </td>
                <td className="p-2 font-bold text-emerald-600">
                  {isPlanApproved ? "완결 (승인됨)" : "결재대기"}
                </td>
              </tr>
              <tr>
                <td className="p-2 border-r border-slate-200 font-bold text-slate-800">수학</td>
                <td className="p-2 border-r border-slate-200 text-blue-700 font-medium">4단계 (매우잘함~노력요함)</td>
                <td className="p-2 border-r border-slate-200">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">마감</span>
                </td>
                <td className="p-2 font-bold text-emerald-600">
                  {isPlanApproved ? "완결 (승인됨)" : "결재대기"}
                </td>
              </tr>
              <tr>
                <td className="p-2 border-r border-slate-200 font-bold text-purple-900">디지털 민주시민(활동)</td>
                <td className="p-2 border-r border-slate-200 text-blue-700 font-medium">4단계 (매우잘함~노력요함)</td>
                <td className="p-2 border-r border-slate-200">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">마감</span>
                </td>
                <td className="p-2 font-bold text-emerald-600">
                  {isPlanApproved ? "완결 (승인됨)" : "결재대기"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Batch Criteria Modal */}
      {isBatchCriteriaModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden text-xs">
            <div className="px-4 py-3 bg-emerald-700 text-white font-bold flex items-center justify-between">
              <span>평가기준관리 - 일괄입력</span>
              <button onClick={() => setIsBatchCriteriaModalOpen(false)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">평가단계</label>
                <select className="w-full border border-slate-300 rounded p-1.5 bg-slate-50 font-medium">
                  <option>4단계 (매우잘함, 잘함, 보통, 노력요함)</option>
                  <option>3단계 (잘함, 보통, 노력요함)</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-bold text-blue-800 block text-[11px]">매우잘함:</span>
                  <p className="text-slate-600 text-[11px]">성취기준에 도달하여 주어진 과제를 주도적이고 창의적으로 해결함.</p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-bold text-emerald-800 block text-[11px]">잘함:</span>
                  <p className="text-slate-600 text-[11px]">성취기준에 충실히 도달하여 주어진 과제를 올바르게 수행함.</p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-bold text-amber-800 block text-[11px]">보통:</span>
                  <p className="text-slate-600 text-[11px]">성취기준에 대체로 도달하였으나 세부 적용에 일부 도움이 필요함.</p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-bold text-rose-800 block text-[11px]">노력요함:</span>
                  <p className="text-slate-600 text-[11px]">기본 개념 이해 및 과제 해결을 위한 교사의 추가 지도가 필요함.</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => setIsBatchCriteriaModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  닫기
                </button>
                <button
                  onClick={handleBatchCriteriaSave}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded shadow-xs"
                >
                  적용 및 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Example Modal */}
      {isExampleModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-xl overflow-hidden text-xs">
            <div className="px-4 py-3 bg-blue-800 text-white font-bold flex items-center justify-between">
              <span>평가기준안 예시문 검색 (시도교육청 / 우수사례)</span>
              <button onClick={() => setIsExampleModalOpen(false)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="예: 비유적 표현, 분수의 연산, 디지털 윤리..."
                  defaultValue="비유적 표현"
                  className="flex-1 border border-slate-300 rounded px-2 py-1.5"
                />
                <button className="px-3 py-1.5 bg-blue-700 text-white rounded font-medium">검색</button>
              </div>

              <div className="border border-slate-200 rounded max-h-56 overflow-y-auto divide-y divide-slate-200">
                <div className="p-2.5 hover:bg-blue-50/50 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 block">[경기도교육청 우수예시] 비유적 표현의 특성 이해</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">상: 비유적 표현의 원리를 깊이 이해하고 참신한 비유로 시를 완성함.</p>
                  </div>
                  <button 
                    onClick={() => setIsExampleModalOpen(false)}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded text-[11px] shrink-0 font-medium"
                  >
                    가져오기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
