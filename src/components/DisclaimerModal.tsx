import React from "react";
import { ShieldAlert, X } from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md flex flex-col overflow-hidden text-sm">
        <div className="px-5 py-4 bg-gradient-to-r from-red-800 via-rose-800 to-slate-900 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="font-bold text-sm">이용 전 꼭 확인해주세요</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded text-rose-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3 text-slate-700 leading-relaxed">
          <p>1. 앱내 예시로 제시되는 학생명과 개인정보는 모두 가상의 정보입니다.</p>
          <p>
            2. 본 웹앱은 교원들의 업무이해를 돕기위한 도구이며 공식적인 업무절차와 결정사항은 공식
            매뉴얼과 공식 사이트 질의응답을 통해 결정을 해야합니다.
          </p>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg transition-colors"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
};
