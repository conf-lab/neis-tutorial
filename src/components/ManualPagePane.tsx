import React, { useEffect, useState } from "react";
import { getManualPageUrl, MANUAL_PDF_URL } from "../utils/manual";
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink, PanelRightClose } from "lucide-react";

interface ManualPagePaneProps {
  page: number;
  onClose?: () => void;
}

/**
 * 튜토리얼 단계 옆에 매뉴얼(PDF) 해당 쪽을 그대로 띄워, 실제 캡쳐와 설명을 보면서 실습하게 한다.
 * 캡쳐를 다시 그리지 않고 원본 매뉴얼 페이지를 브라우저 PDF 뷰어로 표시.
 */
export const ManualPagePane: React.FC<ManualPagePaneProps> = ({ page, onClose }) => {
  const [viewPage, setViewPage] = useState(page);

  // 단계가 바뀌어 매뉴얼 쪽이 달라지면 그 쪽으로 이동
  useEffect(() => setViewPage(page), [page]);

  const src = `${getManualPageUrl(viewPage)}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <aside className="hidden lg:flex w-[40%] max-w-[560px] min-w-[340px] flex-col border-l border-slate-300 bg-slate-100">
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-800 text-white shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>2026 초등 나이스 매뉴얼</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewPage((p) => Math.max(1, p - 1))}
            className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
            disabled={viewPage <= 1}
            title="이전 쪽"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-semibold tabular-nums px-1">{viewPage}p</span>
          <button
            onClick={() => setViewPage((p) => p + 1)}
            className="p-1 hover:bg-white/10 rounded"
            title="다음 쪽"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <a
            href={getManualPageUrl(viewPage)}
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:bg-white/10 rounded"
            title="새 창에서 크게 보기"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded" title="매뉴얼 창 닫기">
              <PanelRightClose className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-slate-200">
        <iframe
          key={viewPage}
          src={src}
          title={`매뉴얼 ${viewPage}쪽`}
          className="w-full h-full border-0 bg-white"
        />
      </div>

      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 shrink-0">
        위 화면은 매뉴얼 원본입니다. 실제 클릭 연습은 오른쪽(또는 아래) 튜토리얼에서 하세요.
        {" "}
        <a href={MANUAL_PDF_URL} target="_blank" rel="noreferrer" className="underline hover:text-slate-600">
          전체 매뉴얼
        </a>
      </div>
    </aside>
  );
};
