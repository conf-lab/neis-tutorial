import React, { useState } from "react";
import { Student } from "../../types";
import { 
  Users, 
  Plus, 
  Save, 
  Download, 
  Search, 
  Info, 
  Check, 
  ArrowRight, 
  RefreshCw,
  FolderPlus
} from "lucide-react";

interface ClubActivityViewProps {
  students: Student[];
  activeStepBox: string;
  onStepBoxChange: (step: string) => void;
  highlightedButtonId?: string;
  onActionTriggered?: (actionId: string) => void;
}

export const ClubActivityView: React.FC<ClubActivityViewProps> = ({
  students,
  activeStepBox,
  onStepBoxChange,
  highlightedButtonId,
  onActionTriggered,
}) => {
  const [clubs, setClubs] = useState([
    { id: "c1", name: "AI·로봇코딩반", teacher: "김교사", room: "컴퓨터실", maxCount: 20, assignedCount: 5 },
    { id: "c2", name: "배드민턴 스포츠클럽", teacher: "이교사", room: "체육관", maxCount: 25, assignedCount: 0 },
    { id: "c3", name: "환경생태탐구반", teacher: "박교사", room: "과학실", maxCount: 18, assignedCount: 0 },
  ]);

  const [isDeptCreated, setIsDeptCreated] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isSyncClubDone, setIsSyncClubDone] = useState(false);

  const handleCreateDept = () => {
    setIsDeptCreated(true);
    onActionTriggered?.("btn-create-club-dept");
  };

  const handleAssignStudents = () => {
    setIsAssigned(true);
    onActionTriggered?.("btn-assign-club-students");
  };

  const handleSyncClubToRecord = () => {
    setIsSyncClubDone(true);
    onActionTriggered?.("btn-sync-club-to-record");
  };

  return (
    <div className="p-4 space-y-4 bg-slate-100/50 min-h-full text-xs">
      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">학년도:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1">
              <option>2026</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">동아리명:</span>
            <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-semibold text-blue-900">
              <option>AI·로봇코딩반</option>
              <option>배드민턴 스포츠클럽</option>
              <option>환경생태탐구반</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded transition-colors shadow-2xs">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeStepBox === "동아리활동가져오기" && (
            <button
              id="btn-sync-club-to-record"
              onClick={handleSyncClubToRecord}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isSyncClubDone
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-sync-club-to-record"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isSyncClubDone ? "생기부 가져오기 완료 ✓" : "동아리활동 생기부 가져오기"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Manual Notice Box */}
      <div className="p-3 bg-blue-50/80 border border-blue-200 rounded text-xs text-blue-900 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-950">창의적체험활동 동아리활동 프로세스: </span>
          <span>
            [부서만들기] ➔ [부서배정(학생)] ➔ [동아리활동관리(누가기록/이수시간)] ➔ [동아리활동가져오기(생기부 동기화)].
          </span>
          <p className="mt-0.5 text-[11px] text-blue-700">
            ※ 담임교사는 [동아리활동가져오기] 버튼을 실행해야 동아리 지도교사가 입력한 특기사항과 이수시간이 학생부에 최종 반영됩니다. (매뉴얼 204p)
          </p>
        </div>
      </div>

      {/* Step 1: 부서만들기 */}
      {activeStepBox === "부서만들기" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">창체 동아리활동 부서 개설 및 지도교사 등록</h4>
              <p className="text-[11px] text-slate-500">부서명, 지도교사, 활동장소, 정원을 입력하고 저장합니다.</p>
            </div>

            <button
              id="btn-create-club-dept"
              onClick={handleCreateDept}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                highlightedButtonId === "btn-create-club-dept"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>부서 신규등록</span>
            </button>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="p-2 border-r border-slate-200">동아리부서명</th>
                <th className="p-2 border-r border-slate-200">지도교사</th>
                <th className="p-2 border-r border-slate-200">활동장소</th>
                <th className="p-2 border-r border-slate-200">정원</th>
                <th className="p-2">편성상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {clubs.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800 text-left px-3">{c.name}</td>
                  <td className="p-2 border-r border-slate-200 font-medium">{c.teacher}</td>
                  <td className="p-2 border-r border-slate-200 text-slate-600">{c.room}</td>
                  <td className="p-2 border-r border-slate-200">{c.maxCount}명</td>
                  <td className="p-2 font-semibold text-blue-700">개설완료</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Step 2: 부서배정 */}
      {activeStepBox === "부서배정" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">4학년 학생 동아리 부서 배정 (AI·로봇코딩반)</h4>
              <p className="text-[11px] text-slate-500">학생을 선택하여 부서로 일괄 배정합니다.</p>
            </div>

            <button
              id="btn-assign-club-students"
              onClick={handleAssignStudents}
              disabled={isAssigned}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isAssigned
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-assign-club-students"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{isAssigned ? "학생 배정 완료 ✓ (5명)" : "선택 학생 부서배정"}</span>
            </button>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-2 border-r border-slate-200 w-12">선택</th>
                <th className="p-2 border-r border-slate-200 w-24">학적</th>
                <th className="p-2 border-r border-slate-200 w-24">성명</th>
                <th className="p-2">배정된 동아리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  </td>
                  <td className="p-2 border-r border-slate-200">4-1 {st.studentNumber}번</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">{st.name}</td>
                  <td className="p-2 font-semibold text-blue-800">
                    {isAssigned || st.club?.name ? "AI·로봇코딩반" : "미배정"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Step 3: 동아리활동관리 */}
      {activeStepBox === "동아리활동관리" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">AI·로봇코딩반 동아리활동 누가기록 및 특기사항 입력</h4>
              <p className="text-[11px] text-slate-500">동아리 지도교사가 일자별 활동 내용 및 개인별 특기사항을 작성합니다.</p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded font-semibold">
              <Save className="w-3.5 h-3.5" /> 저장
            </button>
          </div>

          <table className="w-full text-xs text-center border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-2 border-r border-slate-200 w-24">성명</th>
                <th className="p-2 border-r border-slate-200 w-16">이수시간</th>
                <th className="p-2 border-r border-slate-200">활동일자/내용</th>
                <th className="p-2">특기사항 (동아리 지도교사 서술)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-2 border-r border-slate-200 font-bold text-slate-800">{st.name}</td>
                  <td className="p-2 border-r border-slate-200 font-bold text-blue-700">18h</td>
                  <td className="p-2 border-r border-slate-200 text-left px-3 text-slate-600">03/17 블록코딩 기초 알고리즘 실습</td>
                  <td className="p-2 text-left px-3 text-slate-800">
                    블록코딩을 이용한 자율주행 알고리즘을 논리적으로 설계하고 센서 제어에 탁월한 흥미와 문제해결력을 보임.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Step 4: 동아리활동가져오기 */}
      {activeStepBox === "동아리활동가져오기" && (
        <div className="bg-white border border-slate-200 rounded shadow-2xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">담임교사 - 동아리활동 생활기록부 가져오기</h4>
              <p className="text-[11px] text-slate-500">동아리 지도교사가 입력한 누가기록과 특기사항을 4학년 1반 학생부에 동기화합니다.</p>
            </div>

            <button
              id="btn-sync-club-to-record"
              onClick={handleSyncClubToRecord}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-all shadow-xs ${
                isSyncClubDone
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : highlightedButtonId === "btn-sync-club-to-record"
                  ? "bg-indigo-600 text-white animate-bounce ring-4 ring-indigo-300"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isSyncClubDone ? "학생부 가져오기 완료 ✓" : "동아리활동 가져오기 실행"}</span>
            </button>
          </div>

          {isSyncClubDone && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="font-bold">
                4학년 1반 학생 5명의 동아리활동 이수시간(18h) 및 특기사항이 학교생활기록부로 안전하게 동기화되었습니다.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
