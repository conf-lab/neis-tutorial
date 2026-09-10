import React, { useMemo, useState } from "react";
import { CurriculumLesson, TutorialScenario } from "../types";
import { getManualPageUrl } from "../utils/manual";
import { explainNeisButton, explainNeisMenu, isActionButton } from "../data/neisGlossary";
import { PracticeForm } from "./PracticeForm";
import { getPracticeScreen } from "../data/practiceScreens";
import { MENU_STRUCTURE } from "../data/manualData";
import {
  Check,
  ChevronRight,
  BookOpen,
  Sparkles,
  AlertTriangle,
  MousePointerClick,
  Target,
  ArrowRight,
  Play,
  CornerDownRight,
  X,
} from "lucide-react";

interface GuidedStepViewProps {
  scenario: TutorialScenario;
  stepIndex: number;
  lesson?: CurriculumLesson;
  menuPath: string[];
  onNextStep: () => void;
  onAskAi: () => void;
  onAskAbout: (question: string) => void;
}

interface Token {
  label: string;
  kind: "menu" | "button";
}

function parseTokens(instruction: string, menuPath: string[]): Token[] {
  const raw = Array.from(new Set((instruction.match(/\[([^\]]+)\]/g) || []).map((m) => m.slice(1, -1))));
  return raw.map((label) => {
    const nearArrow =
      new RegExp(`\\[${escapeRe(label)}\\]\\s*[>》]`).test(instruction) ||
      new RegExp(`[>》]\\s*\\[${escapeRe(label)}\\]`).test(instruction);
    const inPath = menuPath.some((p) => p && p === label);
    const kind: Token["kind"] = nearArrow || inPath || (!isActionButton(label) && label.length > 8) ? "menu" : "button";
    return { label, kind };
  });
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 전용 시뮬레이터 화면이 없는 주제를 위한 '가이드 학습' 캔버스.
 * 지침 속 [메뉴]/[버튼]을 클릭하면 무엇을 하는 버튼인지, 누르면 어떤 일이 일어나는지 설명한다.
 */
export const GuidedStepView: React.FC<GuidedStepViewProps> = ({
  scenario,
  stepIndex,
  lesson,
  menuPath,
  onNextStep,
  onAskAi,
  onAskAbout,
}) => {
  const step = scenario.steps[stepIndex];
  const isLast = stepIndex === scenario.steps.length - 1;
  const manualPage = step?.manualPage ?? lesson?.manualPage;

  const tokens = useMemo(
    () => (step ? parseTokens(step.instruction, menuPath) : []),
    [step, menuPath]
  );
  const menuTokens = tokens.filter((t) => t.kind === "menu");
  const buttonTokens = tokens.filter((t) => t.kind === "button");
  const primaryButton =
    [...buttonTokens].reverse().find((t) => isActionButton(t.label))?.label ??
    buttonTokens[buttonTokens.length - 1]?.label;
  const deepestMenu = [...menuPath].reverse().find(Boolean);
  const primaryMenu =
    menuTokens.find((t) => t.label === deepestMenu)?.label ??
    menuTokens[menuTokens.length - 1]?.label;
  // 버튼도 실습폼도 없는 '이동만 하는' 단계
  const navOnly = buttonTokens.length === 0 && step?.actionRequired !== "SAVE" &&
    step?.actionRequired !== "FILL_FORM" && step?.actionRequired !== "APPROVE";

  const [openTip, setOpenTip] = useState<string | null>(null);
  const [practiceSaved, setPracticeSaved] = useState(false);
  // 단계가 바뀌면 열린 설명 닫기 / 저장 표시 초기화
  React.useEffect(() => {
    setOpenTip(null);
    setPracticeSaved(false);
  }, [stepIndex, scenario.id]);

  const practice = step ? getPracticeScreen(lesson?.id, step) : undefined;
  const showPractice =
    !!practice ||
    step?.actionRequired === "SAVE" ||
    step?.actionRequired === "FILL_FORM" ||
    step?.actionRequired === "APPROVE";

  const subMenuStepBoxes = lesson
    ? MENU_STRUCTURE[lesson.domainId]?.items.find((i) => i.id === lesson.subMenuId)?.stepBoxes
    : undefined;
  const screenTitle = menuPath[menuPath.length - 1];

  const renderTip = (token: Token) => {
    if (openTip !== token.label) return null;
    const isPrimary =
      (token.kind === "button" && token.label === primaryButton) ||
      (token.kind === "menu" && token.label === primaryMenu);
    const explanation =
      token.kind === "menu" ? explainNeisMenu(token.label) : explainNeisButton(token.label);
    return (
      <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50/80 p-3 text-[12px] text-slate-700 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="font-bold text-blue-900 flex items-center gap-1.5">
            <CornerDownRight className="w-3.5 h-3.5 text-blue-500" />
            {token.kind === "menu" ? "메뉴" : "버튼"} · {token.label}
          </div>
          <button onClick={() => setOpenTip(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="leading-relaxed">{explanation}</p>
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {isPrimary && (
            <button
              onClick={onNextStep}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors"
            >
              <Play className="w-3 h-3" />
              {token.kind === "menu"
                ? "이 메뉴 열기 · 다음 단계로"
                : isLast
                ? "눌러서 실행 · 주제 완료"
                : "눌러서 실행 · 다음 단계로"}
            </button>
          )}
          <button
            onClick={() =>
              onAskAbout(
                `2026 초등 나이스에서 '${step?.title}' 단계의 [${token.label}] ${
                  token.kind === "menu" ? "메뉴" : "버튼"
                }를 누르면 구체적으로 어떤 일이 일어나고 무엇을 확인해야 하는지 알려줘.`
              )
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            AI 튜터에게 더 물어보기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4 bg-slate-100/60 min-h-full text-xs">
      {/* 나이스 화면 헤더 */}
      <div className="bg-white rounded border border-slate-200 shadow-2xs">
        <div className="px-3.5 py-2 border-b border-slate-100 flex items-center gap-1.5 text-slate-500 flex-wrap">
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
          {step?.hint && <p className="text-xs text-slate-500 pl-6">💡 {step.hint}</p>}

          {navOnly && (
            <p className="pl-6 text-xs text-slate-500">
              👉 이 단계는 <b>화면 이동</b>만 하면 됩니다. 아래 메뉴를 눌러 설명을 보고 다음 단계로 진행하세요.
              {!showPractice && " (입력할 내용은 다음 단계에서 나옵니다.)"}
            </p>
          )}

          {/* 이동할 메뉴 */}
          {menuTokens.length > 0 && (
            <div className="pl-6">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">이동할 메뉴:</span>
                {menuTokens.map((t) => {
                  const isPrimary = t.label === primaryMenu;
                  return (
                    <button
                      key={t.label}
                      onClick={() => setOpenTip(openTip === t.label ? null : t.label)}
                      className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                        openTip === t.label
                          ? "border-blue-500 bg-blue-600 text-white"
                          : isPrimary
                          ? "border-blue-400 bg-blue-50 text-blue-700 hover:bg-blue-100 ring-1 ring-blue-300"
                          : "border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                      }`}
                    >
                      {t.label}
                      {isPrimary && openTip !== t.label && (
                        <span className="ml-1 text-[9px] font-bold text-blue-500">← 여기로 이동</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {menuTokens.map((t) => (
                <React.Fragment key={t.label}>{renderTip(t)}</React.Fragment>
              ))}
            </div>
          )}

          {/* 이 화면의 버튼 */}
          {buttonTokens.length > 0 && (
            <div className="pl-6">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">이 화면의 버튼 (눌러서 설명 보기):</span>
                {buttonTokens.map((t) => {
                  const isPrimary = t.label === primaryButton;
                  return (
                    <button
                      key={t.label}
                      onClick={() => setOpenTip(openTip === t.label ? null : t.label)}
                      className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-colors ${
                        openTip === t.label
                          ? "border-blue-500 bg-blue-600 text-white"
                          : isPrimary
                          ? "border-blue-400 bg-blue-50 text-blue-700 hover:bg-blue-100 ring-1 ring-blue-300"
                          : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                      }`}
                    >
                      {t.label}
                      {isPrimary && openTip !== t.label && (
                        <span className="ml-1 text-[9px] font-bold text-blue-500">← 이번 단계</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {buttonTokens.map((t) => (
                <React.Fragment key={t.label}>{renderTip(t)}</React.Fragment>
              ))}
            </div>
          )}

          {showPractice && step && (
            <PracticeForm
              key={`${scenario.id}-${stepIndex}`}
              scenarioId={scenario.id}
              stepIndex={stepIndex}
              step={step}
              practice={practice}
              screenTitle={screenTitle}
              screenStepBoxes={subMenuStepBoxes}
              onSaved={() => setPracticeSaved(true)}
              onAdvance={onNextStep}
              isLast={isLast}
            />
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
              } ${practiceSaved ? "ring-2 ring-emerald-300 animate-pulse" : ""}`}
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
