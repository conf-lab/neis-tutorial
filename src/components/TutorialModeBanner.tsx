import React from "react";
import { TutorialScenario } from "../types";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  X, 
  HelpCircle, 
  BookOpen,
  MousePointer
} from "lucide-react";

interface TutorialModeBannerProps {
  scenario: TutorialScenario;
  currentStepIndex: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onReset: () => void;
  onExit: () => void;
  onOpenChatWithStep: () => void;
}

export const TutorialModeBanner: React.FC<TutorialModeBannerProps> = ({
  scenario,
  currentStepIndex,
  onNextStep,
  onPrevStep,
  onReset,
  onExit,
  onOpenChatWithStep,
}) => {
  const currentStep = scenario.steps[currentStepIndex];
  const isLastStep = currentStepIndex === scenario.steps.length - 1;
  const progressPercent = Math.round(((currentStepIndex + 1) / scenario.steps.length) * 100);

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white px-4 py-3 border-b-2 border-indigo-400 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Mission Info */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-500/40 border border-indigo-300/30 rounded text-[10px] font-bold text-indigo-200">
                실시간 인터랙티브 튜토리얼
              </span>
              <h3 className="font-bold text-sm text-white">{scenario.title}</h3>
            </div>
            <p className="text-xs text-blue-200 mt-0.5 leading-snug">
              {scenario.description}
            </p>
          </div>
        </div>

        {/* Center: Current Step Mission Instruction */}
        <div className="bg-white/10 backdrop-blur-xs rounded-lg p-2.5 border border-white/15 max-w-xl flex-1 flex items-center justify-between gap-3">
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px]">
                <MousePointer className="w-3.5 h-3.5" />
                단계 {currentStepIndex + 1}/{scenario.steps.length}: {currentStep.title}
              </span>
              {currentStep.manualPage && (
                <span className="text-[10px] bg-blue-900/80 px-1.5 py-0.5 rounded text-blue-200 border border-blue-400/30">
                  매뉴얼 p.{currentStep.manualPage}
                </span>
              )}
            </div>
            <p className="text-slate-100 font-medium leading-relaxed">
              {currentStep.instruction}
            </p>
          </div>

          <button
            onClick={onOpenChatWithStep}
            className="px-2.5 py-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 shrink-0 border border-indigo-400/50 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>AI 설명</span>
          </button>
        </div>

        {/* Right: Controls & Navigation */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onReset}
            className="p-1.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded border border-white/10"
            title="튜토리얼 처음부터 다시하기"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onPrevStep}
            disabled={currentStepIndex === 0}
            className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 text-white rounded text-xs font-semibold border border-white/10"
          >
            이전
          </button>

          <button
            onClick={onNextStep}
            className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all ${
              isLastStep
                ? "bg-emerald-600 hover:bg-emerald-500 text-white ring-2 ring-emerald-300"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            <span>{isLastStep ? "튜토리얼 완료 ✓" : "다음 단계"}</span>
            {!isLastStep && <ArrowRight className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onExit}
            className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded"
            title="튜토리얼 종료"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
