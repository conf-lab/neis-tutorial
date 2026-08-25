import React, { useState } from "react";
import { ApprovalDocument } from "../types";
import { 
  FileCheck, 
  Search, 
  X, 
  Check, 
  Clock, 
  AlertCircle, 
  User, 
  Calendar 
} from "lucide-react";

interface ApprovalBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: ApprovalDocument[];
  onApproveDocument: (docId: string) => void;
}

export const ApprovalBoxModal: React.FC<ApprovalBoxModalProps> = ({
  isOpen,
  onClose,
  documents,
  onApproveDocument,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<ApprovalDocument | null>(documents[0] || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <FileCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">2026 나이스 전자결재함 (기안 / 결재 진행상황)</h3>
              <p className="text-[11px] text-blue-200">나의 상신문서 및 결재 대기·완결 목록</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-blue-200 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-x divide-slate-200 overflow-hidden">
          {/* Document List */}
          <div className="p-3 overflow-y-auto space-y-2 bg-slate-50/50">
            <div className="font-bold text-xs text-slate-800 pb-2 border-b border-slate-200">
              상신 문서 목록 (Total {documents.length})
            </div>

            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                  selectedDoc?.id === doc.id
                    ? "bg-blue-50/80 border-blue-400 shadow-xs"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">
                    {doc.docType}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doc.status === "완결"
                        ? "bg-emerald-100 text-emerald-800"
                        : doc.status === "결재중" || doc.status === "상신"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{doc.title}</h4>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{doc.drafter || doc.applicant || "담당자"}</span>
                  <span>{doc.createdDate || doc.date || "2026-03-01"}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Document Detail Preview */}
          <div className="md:col-span-2 p-5 overflow-y-auto space-y-4">
            {selectedDoc ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">
                      {selectedDoc.docType} 기안문서
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{selectedDoc.title}</h3>
                  </div>

                  {selectedDoc.status !== "완결" && (
                    <button
                      onClick={() => onApproveDocument(selectedDoc.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>결재 승인처리</span>
                    </button>
                  )}
                </div>

                {/* Approval Flow Box */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <span className="font-bold text-slate-800 block text-xs">지정 결재선</span>
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {selectedDoc.approvalLine?.map((line, idx) => (
                      <React.Fragment key={idx}>
                        <div className="px-3 py-1.5 bg-white border border-slate-300 rounded text-center shrink-0 min-w-[90px]">
                          <div className="text-[10px] text-slate-500">{line.position || line.role}</div>
                          <div className="font-bold text-slate-800 mt-0.5">{line.name}</div>
                          <div
                            className={`text-[10px] font-semibold mt-1 ${
                              line.signed || line.status === "완료" ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            {line.signed || line.status === "완료" ? "✓ 결재완료" : "대기"}
                          </div>
                        </div>
                        {idx < selectedDoc.approvalLine.length - 1 && (
                          <span className="text-slate-400">➔</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>기안자: {selectedDoc.drafter || selectedDoc.applicant || "담당자"}</span>
                    <span>기안일시: {selectedDoc.createdDate || selectedDoc.date || "2026-03-01"}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3">
                    <span className="font-bold text-slate-800 block mb-1">기안 요지 및 세부내용</span>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {selectedDoc.details || selectedDoc.title}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                문서를 선택하여 세부 내용을 확인하세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
