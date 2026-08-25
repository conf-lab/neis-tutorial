import React from "react";
import { ChevronRight, Check } from "lucide-react";

interface StepBoxBarProps {
  steps: string[];
  activeStep: string;
  onSelectStep: (stepName: string) => void;
  highlightedStep?: string;
}

export const StepBoxBar: React.FC<StepBoxBarProps> = ({
  steps,
  activeStep,
  onSelectStep,
  highlightedStep,
}) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2 flex items-center gap-1.5 overflow-x-auto">
      <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0 uppercase tracking-wider">
        업무 단계:
      </span>
      {steps.map((step, idx) => {
        const isActive = activeStep === step;
        const isHighlighted = highlightedStep === step;
        const isPast = steps.indexOf(activeStep) > idx;

        return (
          <React.Fragment key={step}>
            <button
              onClick={() => onSelectStep(step)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border transition-all shrink-0 ${
                isActive
                  ? "bg-blue-700 text-white border-blue-800 shadow-xs"
                  : isHighlighted
                  ? "bg-indigo-100 text-indigo-900 border-indigo-500 animate-pulse ring-2 ring-indigo-400"
                  : isPast
                  ? "bg-blue-50/70 text-blue-800 border-blue-200 hover:bg-blue-100/70"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                isActive ? "bg-white text-blue-800 font-bold" : isPast ? "bg-blue-200 text-blue-800" : "bg-slate-200 text-slate-600"
              }`}>
                {isPast ? <Check className="w-2.5 h-2.5" /> : idx + 1}
              </span>
              <span>{step}</span>
            </button>
            {idx < steps.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
