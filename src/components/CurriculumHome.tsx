import React, { useMemo, useState } from "react";
import { CurriculumLesson, CurriculumPhase, CurriculumProgress } from "../types";
import { CURRICULUM, TOTAL_LESSON_COUNT, ALL_LESSONS } from "../data/curriculum";
import { getManualPageUrl } from "../utils/manual";
import {
  Play,
  CheckCircle2,
  Circle,
  SkipForward,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
  MapPin,
} from "lucide-react";

interface CurriculumHomeProps {
  progress: CurriculumProgress;
  onStartLesson: (lessonId: string) => void;
  onSkipLesson: (lessonId: string) => void;
  onResetProgress: () => void;
}

const ACCENT: Record<
  CurriculumPhase["accent"],
  { bar: string; chip: string; ring: string; soft: string; text: string }
> = {
  blue: { bar: "bg-blue-600", chip: "bg-blue-100 text-blue-800 border-blue-200", ring: "ring-blue-400", soft: "bg-blue-50", text: "text-blue-700" },
  emerald: { bar: "bg-emerald-600", chip: "bg-emerald-100 text-emerald-800 border-emerald-200", ring: "ring-emerald-400", soft: "bg-emerald-50", text: "text-emerald-700" },
  amber: { bar: "bg-amber-500", chip: "bg-amber-100 text-amber-800 border-amber-200", ring: "ring-amber-400", soft: "bg-amber-50", text: "text-amber-700" },
  violet: { bar: "bg-violet-600", chip: "bg-violet-100 text-violet-800 border-violet-200", ring: "ring-violet-400", soft: "bg-violet-50", text: "text-violet-700" },
  rose: { bar: "bg-rose-600", chip: "bg-rose-100 text-rose-800 border-rose-200", ring: "ring-rose-400", soft: "bg-rose-50", text: "text-rose-700" },
};

export const CurriculumHome: React.FC<CurriculumHomeProps> = ({
  progress,
  onStartLesson,
  onSkipLesson,
  onResetProgress,
}) => {
  const doneCount = useMemo(
    () => ALL_LESSONS.filter((e) => progress[e.lesson.id]).length,
    [progress]
  );
  const percent = Math.round((doneCount / TOTAL_LESSON_COUNT) * 100);

  const nextEntry = useMemo(
    () => ALL_LESSONS.find((e) => !progress[e.lesson.id]),
    [progress]
  );

  const [openPhase, setOpenPhase] = useState<string | null>(() => {
    // 진행 중이면 다음 학습이 속한 단계를, 아니면 1단계를 펼침
    return nextEntry?.phase.id ?? CURRICULUM[0].id;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6 shadow-lg">
          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold">
            <MapPin className="w-4 h-4" />
            <span>2026학년도 초등 4세대 나이스(NEIS) 교무업무 담당자 학습 여정</span>
          </div>
          <h1 className="mt-2 text-xl md:text-2xl font-bold leading-snug">
            학년 초 권한 관리부터 학년 말 진급·졸업까지,
            <br className="hidden md:block" /> 순서대로 따라만 하면 됩니다.
          </h1>
          <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
            나이스 담당 교사가 1년 동안 처리하는 업무를 5단계 {TOTAL_LESSON_COUNT}개 주제로 나눴습니다.
            각 주제를 누르면 어떤 메뉴에서 무엇을 어떤 순서로 클릭하는지 단계별로 안내하고,
            해당 매뉴얼 쪽을 바로 열어볼 수 있습니다.
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-100">
              <span>전체 진행률</span>
              <span>
                {doneCount} / {TOTAL_LESSON_COUNT} 주제 ({percent}%)
              </span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-300 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {nextEntry ? (
              <button
                onClick={() => onStartLesson(nextEntry.lesson.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow-md transition-colors"
              >
                <Play className="w-4 h-4" />
                {doneCount === 0 ? "여정 시작하기" : "이어서 하기"}
                <span className="font-medium text-slate-700">· {nextEntry.lesson.order}. {nextEntry.lesson.title}</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> 모든 주제를 완료했습니다! 🎉
              </span>
            )}
            {doneCount > 0 && (
              <button
                onClick={onResetProgress}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 진행률 초기화
              </button>
            )}
          </div>
        </div>

        {/* Phases */}
        {CURRICULUM.map((phase) => {
          const accent = ACCENT[phase.accent];
          const phaseLessons = phase.lessons;
          const phaseDone = phaseLessons.filter((l) => progress[l.id]).length;
          const isOpen = openPhase === phase.id;

          return (
            <div
              key={phase.id}
              className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg ${accent.bar} text-white flex items-center justify-center font-bold text-lg shrink-0`}>
                  {phase.order}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-slate-900 text-sm md:text-base">{phase.title}</h2>
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${accent.chip}`}>
                      {phase.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{phase.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-slate-500">
                    {phaseDone}/{phaseLessons.length}
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
                  />
                </div>
              </button>

              {isOpen && (
                <ol className="divide-y divide-slate-100 border-t border-slate-100">
                  {phaseLessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      lesson={lesson}
                      status={progress[lesson.id]}
                      accentText={accent.text}
                      onStart={() => onStartLesson(lesson.id)}
                      onSkip={() => onSkipLesson(lesson.id)}
                    />
                  ))}
                </ol>
              )}
            </div>
          );
        })}

        <p className="text-center text-[11px] text-slate-400 pt-2 pb-6">
          진행률은 이 브라우저에만 저장됩니다. 상단 [전체 메뉴]에서 언제든 자유롭게 실습할 수도 있습니다.
        </p>
      </div>
    </div>
  );
};

interface LessonRowProps {
  lesson: CurriculumLesson;
  status?: "done" | "skipped";
  accentText: string;
  onStart: () => void;
  onSkip: () => void;
}

const LessonRow: React.FC<LessonRowProps> = ({ lesson, status, accentText, onStart, onSkip }) => {
  return (
    <li className="p-4 flex items-start gap-3 hover:bg-slate-50/70 transition-colors">
      <div className="pt-0.5 shrink-0">
        {status === "done" ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : status === "skipped" ? (
          <SkipForward className="w-5 h-5 text-slate-400" />
        ) : (
          <Circle className="w-5 h-5 text-slate-300" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-bold ${accentText}`}>{lesson.order}.</span>
          <h3 className="font-semibold text-slate-800 text-sm">{lesson.title}</h3>
          {lesson.auditFlag && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">
              <AlertTriangle className="w-3 h-3" /> 감사 주의
            </span>
          )}
          {status === "skipped" && (
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-semibold">
              건너뜀
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{lesson.summary}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            {status === "done" ? "다시 학습" : "시작하기"}
          </button>
          <a
            href={getManualPageUrl(lesson.manualPage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-medium transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            매뉴얼 {lesson.manualPage}p
          </a>
          {!status && (
            <button
              onClick={onSkip}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors"
              title="이미 잘 아는 주제는 건너뛰기 (완료로 표시되지 않음)"
            >
              <SkipForward className="w-3.5 h-3.5" />
              건너뛰기
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
