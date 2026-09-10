import React, { useMemo, useState } from "react";
import { PracticeScreen, TutorialStep } from "../types";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../utils/persist";
import {
  Save,
  CheckCircle2,
  Pencil,
  AlertCircle,
  Info,
  Wand2,
  Plus,
  Trash2,
  ChevronRight,
  ArrowRight,
  FileUp,
  PlayCircle,
  CornerDownRight,
  X,
} from "lucide-react";
import { explainNeisButton } from "../data/neisGlossary";

interface PracticeFormProps {
  scenarioId: string;
  stepIndex: number;
  step: TutorialStep;
  onSaved: () => void;
  /** 나이스형 실습 화면 명세 (있으면 이걸로 렌더링) */
  practice?: PracticeScreen;
  /** 화면 제목 (서브메뉴 이름) */
  screenTitle?: string;
  /** 상단 업무단계 탭 */
  screenStepBoxes?: string[];
  /** 저장 후 '다음 단계로' 진행 */
  onAdvance?: () => void;
  isLast?: boolean;
}

interface StoredPractice {
  values: Record<string, string>;
  rows: Record<string, string>[];
  checks: Record<string, boolean>;
  saved: boolean;
}
type PracticeStore = Record<string, Record<string, StoredPractice>>;

function loadStored(scenarioId: string, stepIndex: number): StoredPractice {
  const store = loadJSON<PracticeStore>(STORAGE_KEYS.practice, {});
  return (
    store[scenarioId]?.[String(stepIndex)] ?? {
      values: {},
      rows: [],
      checks: {},
      saved: false,
    }
  );
}
function persistStored(scenarioId: string, stepIndex: number, data: StoredPractice) {
  const store = loadJSON<PracticeStore>(STORAGE_KEYS.practice, {});
  store[scenarioId] = store[scenarioId] || {};
  store[scenarioId][String(stepIndex)] = data;
  saveJSON(STORAGE_KEYS.practice, store);
}

function primaryLabel(p: PracticeScreen): string {
  if (p.primaryAction) return p.primaryAction;
  switch (p.kind) {
    case "approve":
      return "상신";
    case "close":
      return p.thenApprove ? "마감 · 승인요청" : "마감";
    case "batch":
      return p.batchAction || "실행";
    case "upload":
      return "올리기";
    default:
      return "저장";
  }
}

// ── 레거시 폴백 (명세가 없는 단계): 지침에서 라벨(예시값) 뽑아 폼 생성 ──
function deriveFields(instruction: string): { label: string; placeholder?: string }[] {
  const fields: { label: string; placeholder?: string }[] = [];
  const seen = new Set<string>();
  const re = /([가-힣A-Za-z][가-힣A-Za-z·]{0,7})\(([^)]{1,20})\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(instruction))) {
    const label = m[1].trim();
    let ph = m[2].trim().replace(/^['‘"]|['’"]$/g, "");
    if (seen.has(label)) continue;
    if (/(하세요|누르|클릭|이동|버튼|스텝박스|메뉴|확인|선택|관리)/.test(label)) continue;
    if (/(관리|조회|탭|메뉴)/.test(ph)) continue;
    if (ph.length > 12 || ph.includes(" ")) ph = "";
    seen.add(label);
    fields.push({ label, placeholder: ph || undefined });
  }
  return fields.slice(0, 4);
}

/**
 * 가이드 학습 단계에서 실제로 값을 넣어 보고 [저장]하면
 * "나이스에서 무엇이 바뀌는지"를 보여주는 연습용 화면.
 * 입력값은 이 브라우저(localStorage)에 저장되어 새로고침해도 유지된다.
 */
export const PracticeForm: React.FC<PracticeFormProps> = (props) => {
  const { practice } = props;
  if (practice) return <NeisPracticeScreen {...props} practice={practice} />;
  return <LegacyPracticeForm {...props} />;
};

// ───────────────────────────────────────────────────────────────
// 나이스형 실습 화면
// ───────────────────────────────────────────────────────────────
const NeisPracticeScreen: React.FC<PracticeFormProps & { practice: PracticeScreen }> = ({
  scenarioId,
  stepIndex,
  onSaved,
  onAdvance,
  isLast,
  practice: p,
  screenTitle,
  screenStepBoxes,
}) => {
  const initial = useMemo(
    () => loadStored(scenarioId, stepIndex),
    [scenarioId, stepIndex]
  );

  const [values, setValues] = useState<Record<string, string>>(initial.values);
  const [rows, setRows] = useState<Record<string, string>[]>(
    initial.rows.length ? initial.rows : (p.seedRows ?? []).map((r) => ({ ...r }))
  );
  const [checks, setChecks] = useState<Record<string, boolean>>(initial.checks);
  const [saved, setSaved] = useState(initial.saved);
  const [error, setError] = useState("");
  const [tip, setTip] = useState<string | null>(null);

  const title = p.title || screenTitle || "나이스 실습 화면";
  const stepBoxes = p.stepBoxes || screenStepBoxes;
  const seedCount = p.seedRows?.length ?? 0;

  const persist = (next: Partial<StoredPractice>) =>
    persistStored(scenarioId, stepIndex, {
      values,
      rows,
      checks,
      saved,
      ...next,
    });

  const fillExample = () => {
    const v: Record<string, string> = { ...values };
    (p.fields || []).forEach((f) => {
      if (f.type !== "checkbox" && f.sample) v[f.key] = f.sample;
    });
    if (p.kind === "upload" && p.fileName) v.__file = p.fileName;

    const c: Record<string, boolean> = { ...checks };
    (p.fields || []).forEach((f) => {
      if (f.type === "checkbox" && !f.optional) c[f.key] = true;
    });
    (p.closeChecklist || []).forEach((_, i) => (c[`close${i}`] = true));
    if (p.kind === "approve") c.line = true;

    if (p.kind === "grid") {
      const cols = p.columns || [];
      let next = rows.map((r) => {
        const nr = { ...r };
        cols.forEach((col) => {
          if (!(nr[col.key] || "").trim() && col.sample) nr[col.key] = col.sample;
        });
        return nr;
      });
      if (p.sampleRow && next.length <= seedCount) next = [...next, { ...p.sampleRow }];
      setRows(next);
    }

    setValues(v);
    setChecks(c);
    setError("");
  };

  const addRow = () => {
    const empty: Record<string, string> = {};
    (p.columns || []).forEach((c) => (empty[c.key] = ""));
    setRows([...rows, empty]);
  };
  const removeRow = (idx: number) => setRows(rows.filter((_, i) => i !== idx));
  const setCell = (idx: number, key: string, val: string) =>
    setRows(rows.map((r, i) => (i === idx ? { ...r, [key]: val } : r)));

  const validate = (): string => {
    if (p.kind === "form") {
      for (const f of p.fields || []) {
        if (f.optional) continue;
        if (f.type === "checkbox") {
          if (!checks[f.key]) return `'${f.label}'를 확인해 주세요.`;
        } else if (!(values[f.key] || "").trim()) {
          return `'${f.label}' 항목을 입력해 주세요.`;
        }
      }
    }
    if (p.kind === "grid") {
      const cols = p.columns || [];
      const complete = rows.filter((r) => cols.every((c) => (r[c.key] || "").trim()));
      if (p.sampleRow) {
        // 목록형: 사용자가 새 행을 추가해 채워야 하는 화면
        if (rows.length - seedCount < 1)
          return "[행추가]로 한 줄 이상 직접 입력해 보세요.";
        if (complete.length < Math.max(p.minRows ?? seedCount + 1, seedCount + 1))
          return "추가한 행의 모든 칸을 채워 주세요.";
      } else {
        // 명부형: 이미 있는 줄(학생 등)을 채우는 화면
        const need = p.minRows ?? Math.max(seedCount, 1);
        if (complete.length < need) return "표의 모든 칸을 채워 주세요.";
      }
    }
    if (p.kind === "approve" && !checks.line)
      return "결재선을 확인한 뒤 상신할 수 있습니다.";
    if (p.kind === "close") {
      const list = p.closeChecklist || [];
      for (let i = 0; i < list.length; i++)
        if (!checks[`close${i}`]) return "마감 전 확인 항목을 모두 체크해 주세요.";
    }
    if (p.kind === "upload" && !(values.__file || "").trim())
      return "올릴 파일을 선택해 주세요.";
    return "";
  };

  const handleSave = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setSaved(true);
    persist({ values, rows, checks, saved: true });
    onSaved();
  };

  const editAgain = () => {
    setSaved(false);
    persist({ saved: false });
  };

  // ── 저장 완료 결과 카드 ──
  if (saved) {
    const badge =
      p.resultBadge ||
      (p.kind === "approve" ? "결재중" : p.kind === "close" ? "마감" : "저장됨");
    return (
      <div className="pl-6">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3.5 text-[12px] text-emerald-900 space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {primaryLabel(p)} 완료
            <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
              {badge}
            </span>
            <span className="font-normal text-emerald-700 text-[11px]">
              · 이 브라우저에 기록되어 새로고침해도 유지됩니다
            </span>
          </div>
          <div className="rounded-md bg-white/70 border border-emerald-200 p-2.5">
            <div className="font-bold text-emerald-800 text-[11px] mb-1">
              나이스에서 일어나는 일
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-emerald-900/90">
              {p.result.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {onAdvance && (
              <button
                onClick={onAdvance}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
              >
                {isLast ? "주제 완료" : "다음 단계로"} <ArrowRight className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={editAgain}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
            >
              <Pencil className="w-3 h-3" /> 다시 입력하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── 입력 화면 ──
  return (
    <div className="pl-6">
      <div className="rounded-lg border border-slate-300 bg-slate-100/70 overflow-hidden shadow-2xs">
        {/* 제목줄 */}
        <div className="px-3 py-2 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
          <span className="font-bold text-slate-700 text-[12px]">📄 {title}</span>
          <span className="text-[10px] text-slate-400 shrink-0">
            가상 실습 화면 · 실제 저장되지 않습니다
          </span>
        </div>

        {/* 업무단계 탭 */}
        {stepBoxes && stepBoxes.length > 0 && (
          <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1 overflow-x-auto">
            {stepBoxes.map((s) => {
              const active = (p.activeStepBox || stepBoxes[0]) === s;
              return (
                <span
                  key={s}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border shrink-0 ${
                    active
                      ? "bg-blue-700 text-white border-blue-800"
                      : "bg-white text-slate-500 border-slate-300"
                  }`}
                >
                  {s}
                </span>
              );
            })}
          </div>
        )}

        {/* 운영 안내 */}
        {p.intro && (
          <div className="m-3 mb-0 p-2 rounded bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{p.intro}</span>
          </div>
        )}

        <div className="p-3 space-y-2.5">
          {/* 툴바 + 예시값 채우기 */}
          {(p.toolbar?.length || p.kind !== "batch") && (
            <div className="flex flex-wrap items-center gap-1.5">
              {(p.toolbar || []).map((b) => (
                <button
                  key={b}
                  onClick={() => setTip(tip === b ? null : b)}
                  className={`px-2 py-1 rounded border text-[10px] font-semibold ${
                    tip === b
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {b}
                </button>
              ))}
              {p.kind !== "batch" && (
                <button
                  onClick={fillExample}
                  className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded border border-indigo-300 bg-indigo-50 text-indigo-700 text-[10px] font-bold hover:bg-indigo-100"
                >
                  <Wand2 className="w-3 h-3" /> 예시값 채우기
                </button>
              )}
            </div>
          )}
          {tip && (
            <div className="rounded border border-blue-200 bg-blue-50/80 p-2 text-[11px] text-slate-700 flex items-start gap-1.5">
              <CornerDownRight className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <b className="text-blue-900">{tip}</b> — {explainNeisButton(tip)}
              </span>
              <button onClick={() => setTip(null)} className="ml-auto text-slate-400">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* 본문 (kind별) */}
          {p.kind === "form" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(p.fields || []).map((f) => (
                <label
                  key={f.key}
                  className={`text-[11px] text-slate-600 space-y-0.5 ${
                    f.full || f.type === "textarea" ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="font-semibold">
                    {f.label}
                    {f.optional && <span className="text-slate-400"> (선택)</span>}
                  </span>
                  {f.type === "textarea" ? (
                    <textarea
                      value={values[f.key] || ""}
                      onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                      rows={2}
                      placeholder={f.sample ? `예: ${f.sample}` : ""}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-[12px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={values[f.key] || ""}
                      onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-[12px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">선택</option>
                      {(f.options || []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <span className="flex items-center gap-1.5 pt-1">
                      <input
                        type="checkbox"
                        checked={!!checks[f.key]}
                        onChange={(e) => setChecks({ ...checks, [f.key]: e.target.checked })}
                      />
                      <span className="text-slate-700">확인</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <input
                        type={f.type === "date" ? "date" : f.type === "number" ? "number" : "text"}
                        value={values[f.key] || ""}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        placeholder={f.sample ? `예: ${f.sample}` : ""}
                        className="w-full border border-slate-300 rounded px-2 py-1 text-[12px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {f.suffix && <span className="text-slate-500 shrink-0">{f.suffix}</span>}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}

          {p.kind === "grid" && (
            <div className="space-y-1.5">
              <div className="overflow-x-auto border border-slate-300 rounded">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="bg-slate-200/70 text-slate-600">
                      {(p.columns || []).map((c) => (
                        <th key={c.key} className="px-2 py-1 text-left font-bold whitespace-nowrap">
                          {c.label}
                        </th>
                      ))}
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, idx) => {
                      const isSeed = idx < seedCount;
                      return (
                        <tr
                          key={idx}
                          className={isSeed ? "bg-slate-50" : "bg-white"}
                        >
                          {(p.columns || []).map((c) => (
                            <td key={c.key} className="px-1.5 py-1 align-top">
                              {c.type === "select" ? (
                                <select
                                  value={r[c.key] || ""}
                                  onChange={(e) => setCell(idx, c.key, e.target.value)}
                                  className="w-full border border-slate-300 rounded px-1.5 py-1 bg-white text-[11px]"
                                >
                                  <option value="">선택</option>
                                  {(c.options || []).map((o) => (
                                    <option key={o} value={o}>
                                      {o}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={c.type === "date" ? "date" : c.type === "number" ? "number" : "text"}
                                  value={r[c.key] || ""}
                                  onChange={(e) => setCell(idx, c.key, e.target.value)}
                                  placeholder={c.sample ? `예: ${c.sample}` : ""}
                                  className="w-full border border-slate-300 rounded px-1.5 py-1 bg-white text-[11px]"
                                />
                              )}
                            </td>
                          ))}
                          <td className="text-center">
                            {!isSeed && (
                              <button
                                onClick={() => removeRow(idx)}
                                className="text-slate-400 hover:text-rose-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button
                onClick={addRow}
                className="inline-flex items-center gap-1 px-2 py-1 rounded border border-slate-300 bg-slate-100 text-slate-600 text-[10px] font-semibold hover:bg-slate-200"
              >
                <Plus className="w-3 h-3" /> 행추가
              </button>
              {seedCount > 0 && (
                <p className="text-[10px] text-slate-400">
                  회색 줄은 이미 등록된 자료입니다. [행추가]로 새 줄을 넣어 보세요.
                </p>
              )}
            </div>
          )}

          {p.kind === "approve" && (
            <div className="space-y-2">
              <div className="rounded border border-slate-300 bg-white p-2.5">
                <div className="text-[11px] text-slate-500">기안 문서</div>
                <div className="font-bold text-slate-800 text-[12px]">
                  {p.docTitle || "승인요청"}
                </div>
              </div>
              <div className="rounded border border-slate-300 bg-white p-2.5">
                <div className="text-[11px] font-bold text-slate-600 mb-1.5">지정 결재선</div>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(p.approvalLine || []).map((m, i) => (
                    <React.Fragment key={i}>
                      <div className="px-2 py-1 border border-slate-300 rounded text-center shrink-0 min-w-[72px]">
                        <div className="text-[9px] text-slate-500">{m.role}</div>
                        <div className="font-bold text-slate-800 text-[11px]">{m.name}</div>
                        <div className="text-[9px] text-amber-600 font-semibold">대기</div>
                      </div>
                      {i < (p.approvalLine || []).length - 1 && (
                        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-2 text-[12px] text-slate-700">
                <input
                  type="checkbox"
                  checked={!!checks.line}
                  onChange={(e) => setChecks({ ...checks, line: e.target.checked })}
                  className="mt-0.5"
                />
                결재선을 확인했습니다. 상신 후에는 담당자가 임의로 수정할 수 없습니다.
              </label>
            </div>
          )}

          {p.kind === "close" && (
            <div className="space-y-2">
              <div className="rounded border border-slate-300 bg-white p-2.5 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-600">
                  마감 대상: {p.closeUnit || "우리 반"}
                </div>
                {(p.closeChecklist || []).map((c, i) => (
                  <label key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                    <input
                      type="checkbox"
                      checked={!!checks[`close${i}`]}
                      onChange={(e) => setChecks({ ...checks, [`close${i}`]: e.target.checked })}
                      className="mt-0.5"
                    />
                    {c}
                  </label>
                ))}
              </div>
              {p.thenApprove && p.approvalLine && p.approvalLine.length > 0 && (
                <div className="rounded border border-slate-300 bg-white p-2.5">
                  <div className="text-[11px] font-bold text-slate-600 mb-1.5">
                    마감 후 상신할 결재선
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {p.approvalLine.map((m, i) => (
                      <React.Fragment key={i}>
                        <div className="px-2 py-1 border border-slate-300 rounded text-center shrink-0 min-w-[72px]">
                          <div className="text-[9px] text-slate-500">{m.role}</div>
                          <div className="font-bold text-slate-800 text-[11px]">{m.name}</div>
                        </div>
                        {i < p.approvalLine!.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              {primaryLabel(p).includes("마감") && (
                <p className="text-[10px] text-rose-500">
                  마감하면 해당 자료는 잠기며, 수정하려면 관리자에게 마감취소를 요청해야 합니다.
                </p>
              )}
            </div>
          )}

          {p.kind === "batch" && (
            <div className="rounded border border-slate-300 bg-white p-2.5 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-600">
                [{p.batchAction || "실행"}] 하면 처리되는 항목
              </div>
              <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-0.5">
                {(p.batchPreview || []).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {p.batchNote && (
                <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded p-1.5">
                  ⚠ {p.batchNote}
                </p>
              )}
            </div>
          )}

          {p.kind === "upload" && (
            <div className="rounded border border-dashed border-slate-400 bg-white p-3 flex flex-col items-center gap-1.5 text-[11px]">
              <FileUp className="w-5 h-5 text-slate-400" />
              {values.__file ? (
                <span className="font-semibold text-slate-700">{values.__file}</span>
              ) : (
                <span className="text-slate-400">
                  {p.fileKind || "파일"}을(를) 선택하세요
                </span>
              )}
              <button
                onClick={() => setValues({ ...values, __file: p.fileName || "선택한파일" })}
                className="px-2 py-1 rounded border border-slate-300 bg-slate-100 text-slate-600 text-[10px] font-semibold hover:bg-slate-200"
              >
                파일 선택
              </button>
            </div>
          )}

          {error && (
            <p className="flex items-center gap-1 text-[11px] text-rose-600 font-medium">
              <AlertCircle className="w-3 h-3" /> {error}
            </p>
          )}

          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white text-[11px] font-bold transition-colors ${
              p.kind === "approve"
                ? "bg-emerald-600 hover:bg-emerald-500"
                : p.kind === "close" && primaryLabel(p).includes("마감")
                ? "bg-rose-600 hover:bg-rose-500"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {p.kind === "batch" ? (
              <PlayCircle className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {primaryLabel(p)}
          </button>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────
// 레거시 폴백 (명세 없는 단계)
// ───────────────────────────────────────────────────────────────
const LegacyPracticeForm: React.FC<PracticeFormProps> = ({
  scenarioId,
  stepIndex,
  step,
  onSaved,
}) => {
  const fields = useMemo(() => deriveFields(step.instruction), [step.instruction]);
  const isApprove = step.actionRequired === "APPROVE";
  const useCheckbox = fields.length === 0 && isApprove;
  const useTextarea = fields.length === 0 && !isApprove;

  const initial = useMemo(
    () => loadStored(scenarioId, stepIndex),
    [scenarioId, stepIndex]
  );
  const [values, setValues] = useState<Record<string, string>>(initial.values);
  const [checked, setChecked] = useState<boolean>(initial.checks.__ap || false);
  const [saved, setSaved] = useState<boolean>(initial.saved);
  const [error, setError] = useState<string>("");

  const persist = (nextValues: Record<string, string>, isSaved: boolean, ap = checked) =>
    persistStored(scenarioId, stepIndex, {
      values: nextValues,
      rows: [],
      checks: { __ap: ap },
      saved: isSaved,
    });

  const handleSave = () => {
    if (useCheckbox && !checked) return setError("결재선을 확인한 뒤 상신할 수 있습니다.");
    if (useTextarea && !(values.__memo || "").trim())
      return setError("입력란을 채운 뒤 저장해 보세요.");
    if (!useCheckbox && !useTextarea) {
      const missing = fields.find((f) => !(values[f.label] || "").trim());
      if (missing) return setError(`'${missing.label}' 항목을 입력해 주세요.`);
    }
    setError("");
    setSaved(true);
    persist(values, true);
    onSaved();
  };

  if (saved) {
    return (
      <div className="pl-6">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-[12px] text-emerald-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {isApprove ? "상신되었습니다 (가상 결재함으로 이동)" : "저장되었습니다"} · 이 브라우저에
            기록되어 새로고침해도 유지됩니다
          </div>
          {!useCheckbox && (
            <ul className="pl-5 list-disc space-y-0.5 text-emerald-800">
              {useTextarea ? (
                <li>입력 내용: {values.__memo}</li>
              ) : (
                fields.map((f) => (
                  <li key={f.label}>
                    {f.label}: <b>{values[f.label]}</b>
                  </li>
                ))
              )}
            </ul>
          )}
          <button
            onClick={() => {
              setSaved(false);
              persist(values, false);
            }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
          >
            <Pencil className="w-3 h-3" /> 다시 입력하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-6">
      <div className="rounded-lg border border-slate-300 bg-white p-3 space-y-2.5">
        <div className="text-[11px] font-bold text-slate-500">✏️ 직접 입력해 보기</div>
        {useCheckbox ? (
          <label className="flex items-start gap-2 text-[12px] text-slate-700">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5"
            />
            결재선(담임 → 교무부장 → 교감 → 교장)을 확인했습니다.
          </label>
        ) : useTextarea ? (
          <textarea
            value={values.__memo || ""}
            onChange={(e) => setValues({ __memo: e.target.value })}
            placeholder="이 단계에서 입력할 내용을 직접 적어 보세요"
            rows={2}
            className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {fields.map((f) => (
              <label key={f.label} className="text-[11px] text-slate-600 space-y-0.5">
                <span className="font-semibold">{f.label}</span>
                <input
                  value={values[f.label] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.label]: e.target.value }))}
                  placeholder={f.placeholder ? `예: ${f.placeholder}` : ""}
                  className="w-full border border-slate-300 rounded px-2 py-1 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>
            ))}
          </div>
        )}
        {error && (
          <p className="flex items-center gap-1 text-[11px] text-rose-600 font-medium">
            <AlertCircle className="w-3 h-3" /> {error}
          </p>
        )}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors"
        >
          <Save className="w-3.5 h-3.5" /> {isApprove ? "상신하기" : "저장"}
        </button>
      </div>
    </div>
  );
};
