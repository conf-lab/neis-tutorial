import React from "react";
import { CurriculumLesson, TutorialScenario } from "../types";
import { getManualPageUrl } from "../utils/manual";
import {
  Check,
  ChevronRight,
  BookOpen,
  Sparkles,
  AlertTriangle,
  MousePointerClick,
  Target,
  ArrowRight,
} from "lucide-react";

interface GuidedStepViewProps {
  scenario: TutorialScenario;
  stepIndex: number;
  lesson?: CurriculumLesson;
  menuPath: string[];
  onNextStep: () => void;
  onAskAi: () => void;
}

/**
 * 전용 시뮬레이터 화면이 없는 주제를 위한 '가이드 학습' 캔버스.
 * 나이스 화면 틀 + 현재 단계 지침 + 매뉴얼 링크 + AI 설명으로 단계별 학습을 안내한다.
 */
export const GuidedStepView: React.FC<GuidedStepViewProps> = ({
  scenario,
  stepIndex,
  lesson,
  menuPath,
  onNextStep,
  onAskAi,
}) => {
  const step = scenario.steps[stepIndex];
  const isLast = stepIndex === scenario.steps.length - 1;
  const manualPage = step?.manualPage ?? lesson?.manualPage;

  // 지침 문장에서 [버튼명] 패턴을 뽑아 가짜 나이스 버튼으로 표시
  const mockButtons = Array.from(
    new Set((step?.instruction.match(/\[([^\]]+)\]/g) || []).map((m) => m.slice(1, -1)))
  ).slice(0, 6);

  return (
    <div className="p-4 space-y-4 bg-slate-100/60 min-h-full text-xs">
      {/* 나이스 화면 헤더 */}
      <div className="bg-white rounded border border-slate-200 shadow-2xs">
        <div className="px-3.5 py-2 border-b border-slate-100 flex items-center gap-1.5 text-slate-500">
          {menuPath.map((p, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
              <span className={i === menuPath.length - 1 ? "font-bold text-blue-900" : ""}>{p}</span>
            </React.Fragment>
          ))}
        </div>
        <div className="p-3.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">학년도</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1"><option>2026</option></select>
            <span className="font-semibold text-slate-600">학급</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-blue-900"><option>4학년 1반</option></select>
            <span className="px-2.5 py-1 bg-slate-200 text-slate-500 rounded font-medium cursor-not-allowed">조회</span>
          </div>
          <span className="text-[11px] text-slate-400">가상 실습 화면 · 실제 저장되지 않습니다</span>
        </div>
      </div>

      {/* 진행 단계 표시 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {scenario.steps.map((s, i) => {
          const state = i < stepIndex ? "done" : i === stepIndex ? "current" : "todo";
          return (
            <React.Fragment key={i}>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-[11px] font-semibold shrink-0 ${
                  state === "current"
                    ? "bg-blue-700 text-white border-blue-800"
                    : state === "done"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : "bg-white text-slate-500 border-slate-200"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                    state === "current" ? "bg-white text-blue-800" : state === "done" ? "bg-blue-200 text-blue-800" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {state === "done" ? <Check className="w-2.5 h-2.5" /> : i + 1}
                </span>
                <span className="max-w-[9rem] truncate">{s.title}</span>
              </div>
              {i < scenario.steps.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* 현재 단계 카드 */}
      <div className="bg-white rounded-lg border-2 border-blue-500 shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <Target className="w-4 h-4 text-blue-600" />
            단계 {stepIndex + 1} / {scenario.steps.length} · {step?.title}
          </div>
          {manualPage && (
            <a
              href={getManualPageUrl(manualPage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded"
            >
              <BookOpen className="w-3 h-3" /> 매뉴얼 {manualPage}p 열기
            </a>
          )}
        </div>

        <div className="p-4 space-y-3">
          <p className="text-sm text-slate-800 font-medium leading-relaxed flex items-start gap-2">
            <MousePointerClick className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            {step?.instruction}
          </p>
          {step?.hint && (
            <p className="text-xs text-slate-500 pl-6">💡 {step.hint}</p>
          )}

          {mockButtons.length > 0 && (
            <div className="pl-6 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400">이 화면의 버튼:</span>
              {mockButtons.map((b) => (
                <span
                  key={b}
                  className="px-2.5 py-1 rounded border border-slate-300 bg-slate-50 text-slate-600 text-[11px] font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          )}

          {lesson?.cautions && lesson.cautions.length > 0 && stepIndex === 0 && (
            <div className="mt-1 rounded-lg bg-rose-50 border border-rose-200 p-3 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-800 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5" /> 꼭 확인하세요
              </div>
              <ul className="list-disc list-inside text-[11px] text-rose-900/90 space-y-0.5">
                {lesson.cautions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-1 flex flex-wrap items-center gap-2">
            <button
              onClick={onNextStep}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-colors ${
                isLast ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {isLast ? (
                <>
                  <Check className="w-4 h-4" /> 이 주제 학습 완료
                </>
              ) : (
                <>
                  이 단계 완료 · 다음 단계 <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
            <button
              onClick={onAskAi}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> 이 단계 AI 튜터 설명
            </button>
          </div>
        </div>
      </div>

      {lesson?.outcome && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-900 flex items-start gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <span className="font-bold">완료하면: </span>
            {lesson.outcome}
          </span>
        </div>
      )}
    </div>
  );
};
