import React from "react";
import { PartyPopper, ArrowRight, Map, X } from "lucide-react";

interface LessonCompleteModalProps {
  isOpen: boolean;
  lessonTitle: string;
  outcome?: string;
  nextLessonTitle?: string;
  onNext: () => void;
  onBackToJourney: () => void;
  onClose: () => void;
}

export const LessonCompleteModal: React.FC<LessonCompleteModalProps> = ({
  isOpen,
  lessonTitle,
  outcome,
  nextLessonTitle,
  onNext,
  onBackToJourney,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-700 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm">주제 완료</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 text-sm text-slate-700">
          <p>
            <b className="text-slate-900">{lessonTitle}</b> 주제를 마쳤습니다. 학습 여정에 완료로 표시됩니다.
          </p>
          {outcome && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900">
              <span className="font-bold">완료 상태: </span>
              {outcome}
            </div>
          )}
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
          {nextLessonTitle ? (
            <button
              onClick={onNext}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors"
            >
              다음 학습 시작 <ArrowRight className="w-4 h-4" />
              <span className="font-medium text-blue-200 truncate max-w-[12rem]">{nextLessonTitle}</span>
            </button>
          ) : (
            <div className="text-center text-sm font-semibold text-emerald-700 py-1">
              마지막 주제였습니다. 1년 과정을 모두 끝냈어요! 🎉
            </div>
          )}
          <button
            onClick={onBackToJourney}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-semibold rounded-lg transition-colors"
          >
            <Map className="w-4 h-4" /> 학습 여정으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
