import React, { useMemo, useState } from "react";
import { TutorialStep } from "../types";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../utils/persist";
import { Save, CheckCircle2, Pencil, AlertCircle } from "lucide-react";

interface PracticeFormProps {
  scenarioId: string;
  stepIndex: number;
  step: TutorialStep;
  onSaved: () => void;
}

interface Field {
  label: string;
  placeholder?: string;
}

type PracticeStore = Record<string, Record<string, { values: Record<string, string>; saved: boolean }>>;

function deriveFields(instruction: string): Field[] {
  const fields: Field[] = [];
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

function actionLabel(step: TutorialStep): string {
  if (step.actionRequired === "APPROVE") return "상신하기";
  return "저장";
}

/**
 * 가이드 학습 단계에서 사용자가 실제로 값을 입력해보고 '저장'이 되는지 확인하는 연습용 폼.
 * 입력값은 이 브라우저(localStorage)에 저장되어 새로고침해도 유지된다.
 */
export const PracticeForm: React.FC<PracticeFormProps> = ({ scenarioId, stepIndex, step, onSaved }) => {
  const fields = useMemo(() => deriveFields(step.instruction), [step.instruction]);
  const isApprove = step.actionRequired === "APPROVE";
  const useCheckbox = fields.length === 0 && isApprove;
  const useTextarea = fields.length === 0 && !isApprove;

  const storeKey = `${scenarioId}::${stepIndex}`;

  const initial = useMemo(() => {
    const store = loadJSON<PracticeStore>(STORAGE_KEYS.practice, {});
    return store[scenarioId]?.[String(stepIndex)] ?? { values: {}, saved: false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeKey]);

  const [values, setValues] = useState<Record<string, string>>(initial.values);
  const [checked, setChecked] = useState<boolean>(initial.saved && useCheckbox);
  const [saved, setSaved] = useState<boolean>(initial.saved);
  const [error, setError] = useState<string>("");

  const persist = (nextValues: Record<string, string>, isSaved: boolean) => {
    const store = loadJSON<PracticeStore>(STORAGE_KEYS.practice, {});
    store[scenarioId] = store[scenarioId] || {};
    store[scenarioId][String(stepIndex)] = { values: nextValues, saved: isSaved };
    saveJSON(STORAGE_KEYS.practice, store);
  };

  const handleSave = () => {
    if (useCheckbox) {
      if (!checked) {
        setError("결재선을 확인한 뒤 상신할 수 있습니다.");
        return;
      }
    } else if (useTextarea) {
      if (!(values.__memo || "").trim()) {
        setError("입력란을 채운 뒤 저장해 보세요.");
        return;
      }
    } else {
      const missing = fields.find((f) => !(values[f.label] || "").trim());
      if (missing) {
        setError(`'${missing.label}' 항목을 입력해 주세요.`);
        return;
      }
    }
    setError("");
    setSaved(true);
    persist(values, true);
    onSaved();
  };

  const handleEditAgain = () => {
    setSaved(false);
    persist(values, false);
  };

  if (saved) {
    return (
      <div className="pl-6">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-[12px] text-emerald-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {isApprove ? "상신되었습니다 (가상 결재함으로 이동)" : "저장되었습니다"} · 이 브라우저에 기록되어 새로고침해도 유지됩니다
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
            onClick={handleEditAgain}
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
          <Save className="w-3.5 h-3.5" /> {actionLabel(step)}
        </button>
      </div>
    </div>
  );
};
