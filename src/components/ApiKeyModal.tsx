import React, { useState } from "react";
import { KeyRound, X, ShieldCheck, ExternalLink } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  currentKey: string;
  onSave: (key: string) => void;
  onSkip: () => void;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  currentKey,
  onSave,
  onSkip,
  onClose,
}) => {
  const [inputKey, setInputKey] = useState(currentKey);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!inputKey.trim()) return;
    onSave(inputKey.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm">AI 튜터 챗봇 사용 설정</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 text-sm text-slate-700">
          <p>
            AI 튜터 챗봇 기능은 <b>본인의 Google Gemini API 키</b>를 입력해야 사용할 수 있습니다.
            키를 입력하지 않아도 좌측 메뉴와 튜토리얼 시뮬레이터는 그대로 이용하실 수 있습니다.
          </p>

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>입력한 키는 이 브라우저에만 저장되며, 서버에 보관되지 않습니다.</span>
            </div>
            <div>
              ※ Google Gemini API 키만 사용 가능합니다. 다른 AI 서비스(Claude, OpenAI 등)의 키는 이 앱에서 동작하지 않습니다.
            </div>
          </div>

          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-700 hover:underline text-xs font-medium"
          >
            Google AI Studio에서 무료 API 키 발급받기
            <ExternalLink className="w-3 h-3" />
          </a>

          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Gemini API 키를 붙여넣으세요 (AIza...)"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onSkip}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded transition-colors"
          >
            키 없이 계속하기
          </button>
          <button
            onClick={handleSave}
            disabled={!inputKey.trim()}
            className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            저장하고 챗봇 사용하기
          </button>
        </div>
      </div>
    </div>
  );
};
