import React from "react";
import { BookOpenCheck, X, KeyRound, Database } from "lucide-react";

interface TutorialGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSnoozeWeek: () => void;
}

export const TutorialGuideModal: React.FC<TutorialGuideModalProps> = ({
  isOpen,
  onClose,
  onSnoozeWeek,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm">나이스 튜토리얼 사용 설명서</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm text-slate-700">
          <p>
            좌측 메뉴와 상단 [12대 업무 튜토리얼]을 통해 나이스 교무업무를 실제처럼 실습해볼 수 있습니다.
            아래 두 가지만 미리 알아두시면 편하게 사용하실 수 있어요.
          </p>

          <div className="rounded-lg border border-slate-200 p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <KeyRound className="w-4 h-4 text-blue-600" />
              <span>AI 튜터 챗봇은 선택 기능입니다</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
              <li>챗봇을 쓰지 않아도 메뉴 이동, 시뮬레이터, 튜토리얼 진행은 모두 그대로 사용 가능합니다.</li>
              <li>챗봇 답변을 받으려면 본인의 <b>구글 Gemini API 키</b>가 필요합니다. (Claude, OpenAI 등 다른 AI 키는 동작하지 않습니다)</li>
              <li>키는 우측 상단의 열쇠 아이콘을 눌러 언제든 입력하거나 바꿀 수 있습니다.</li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>저장되는 것 / 안 되는 것</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
              <li><b>API 키</b>는 이 브라우저에만 저장되어 새로고침해도 유지됩니다. (단, 다른 브라우저·시크릿모드로 열거나 인터넷 사용기록을 삭제하면 사라집니다)</li>
              <li><b>학생명단, 결재함, 튜토리얼 진행상황</b>은 저장되지 않아 새로고침하면 처음 상태로 초기화됩니다.</li>
            </ul>
          </div>
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onSnoozeWeek}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded transition-colors"
          >
            일주일 간 보지 않기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
