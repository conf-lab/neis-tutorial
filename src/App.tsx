import React, { useState } from "react";
import { 
  MainMenuId, 
  SubMenuItem, 
  Student, 
  Teacher, 
  TutorialScenario, 
  ApprovalDocument, 
  ChatMessage,
  AuditCheckItem
} from "./types";
import { 
  MENU_STRUCTURE, 
  TUTORIAL_SCENARIOS, 
  MANUAL_AUDIT_TIPS, 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_APPROVAL_DOCS 
} from "./data/manualData";

import { HeaderNav } from "./components/HeaderNav";
import { SidebarMenu } from "./components/SidebarMenu";
import { StepBoxBar } from "./components/StepBoxBar";
import { NeisBreadcrumb } from "./components/NeisBreadcrumb";
import { TutorialModeBanner } from "./components/TutorialModeBanner";
import { ChatWindow } from "./components/ChatWindow";
import { AuditTipsModal } from "./components/AuditTipsModal";
import { ApprovalBoxModal } from "./components/ApprovalBoxModal";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { TutorialGuideModal } from "./components/TutorialGuideModal";
import { DisclaimerModal } from "./components/DisclaimerModal";

const API_KEY_STORAGE = "neis_gemini_api_key";
const API_KEY_DISMISSED_STORAGE = "neis_api_key_modal_dismissed";
const GUIDE_SNOOZE_UNTIL_STORAGE = "neis_guide_modal_snooze_until";
const GUIDE_SNOOZE_DAYS = 7;

// Views
import { TransferInView } from "./components/views/TransferInView";
import { EvalPlanView } from "./components/views/EvalPlanView";
import { AttendanceView } from "./components/views/AttendanceView";
import { StudentRecordView } from "./components/views/StudentRecordView";
import { RectificationView } from "./components/views/RectificationView";
import { AutonomousTimeView } from "./components/views/AutonomousTimeView";
import { CurriculumTimetableOverview } from "./components/views/CurriculumTimetableOverview";
import { ClubActivityView } from "./components/views/ClubActivityView";
import { HealthRecordView } from "./components/views/HealthRecordView";
import { SchoolWorkAssignView } from "./components/views/SchoolWorkAssignView";
import { AdmissionView } from "./components/views/AdmissionView";
import { GenericNeisView } from "./components/views/GenericNeisView";

export function App() {
  // Navigation State
  const [currentMainMenu, setCurrentMainMenu] = useState<MainMenuId>("academic_record");
  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenuItem>(
    MENU_STRUCTURE.academic_record.items[3] // transfer_in
  );
  const [activeStepBox, setActiveStepBox] = useState<string>(
    currentSubMenu.stepBoxes?.[0] || ""
  );

  // Entities State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [approvalDocs, setApprovalDocs] = useState<ApprovalDocument[]>(INITIAL_APPROVAL_DOCS);

  // Modals & Chat State
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      sender: "bot",
      text: "선생님, 안녕하세요! 2026 초등 4세대 나이스(NEIS) 가상 실습 플랫폼 및 튜토리얼 AI 튜터입니다.\n\n상단 대메뉴와 좌측 사이드바를 통해 2026 매뉴얼에 명시된 학교 행정 업무를 직접 실습해보실 수 있습니다.\n\n우측 상단의 [12대 업무 튜토리얼]을 클릭하시면 핵심 업무 시나리오(전입생 등록, 2022개정 학교자율시간, 평가계획안 4단계 일괄입력, 출결 0일 월마감, 생기부 정정대장 4단 결재 등)를 단계별 가이드와 함께 실시간으로 마스터하실 수 있습니다.",
      timestamp: new Date().toISOString(),
      manualPage: 1
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Tutorial Mode State
  const [isTutorialActive, setIsTutorialActive] = useState<boolean>(true);
  const [currentScenario, setCurrentScenario] = useState<TutorialScenario>(TUTORIAL_SCENARIOS[0]);
  const [tutorialStepIndex, setTutorialStepIndex] = useState<number>(0);

  // Gemini API Key (bring-your-own-key, stored only in this browser)
  const [geminiApiKey, setGeminiApiKey] = useState<string>(
    () => localStorage.getItem(API_KEY_STORAGE) || ""
  );
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  // Usage guide modal (shown when the tutorial is opened, unless snoozed for a week)
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  // Disclaimer modal (shown immediately on every visit)
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState<boolean>(true);

  const isGuideSnoozed = () => {
    const until = Number(localStorage.getItem(GUIDE_SNOOZE_UNTIL_STORAGE) || 0);
    return Date.now() < until;
  };

  const maybeShowApiKeyModal = () => {
    if (!geminiApiKey && !localStorage.getItem(API_KEY_DISMISSED_STORAGE)) {
      setIsApiKeyModalOpen(true);
    }
  };

  const openTutorialMode = () => {
    setIsTutorialActive(true);
    if (!isGuideSnoozed()) {
      setIsGuideModalOpen(true);
    } else {
      maybeShowApiKeyModal();
    }
  };

  // Show the usage guide (or API key prompt) the first time the tutorial mode appears
  React.useEffect(() => {
    if (isTutorialActive) {
      if (!isGuideSnoozed()) {
        setIsGuideModalOpen(true);
      } else {
        maybeShowApiKeyModal();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseGuideModal = () => {
    setIsGuideModalOpen(false);
    maybeShowApiKeyModal();
  };

  const handleSnoozeGuideModal = () => {
    localStorage.setItem(
      GUIDE_SNOOZE_UNTIL_STORAGE,
      String(Date.now() + GUIDE_SNOOZE_DAYS * 24 * 60 * 60 * 1000)
    );
    setIsGuideModalOpen(false);
    maybeShowApiKeyModal();
  };

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE, key);
    localStorage.removeItem(API_KEY_DISMISSED_STORAGE);
    setGeminiApiKey(key);
    setIsApiKeyModalOpen(false);
  };

  const handleSkipApiKey = () => {
    localStorage.setItem(API_KEY_DISMISSED_STORAGE, "1");
    setIsApiKeyModalOpen(false);
  };

  // Synchronize StepBoxes when SubMenu changes
  const handleSelectSubMenu = (item: SubMenuItem) => {
    setCurrentSubMenu(item);
    if (item.stepBoxes && item.stepBoxes.length > 0) {
      setActiveStepBox(item.stepBoxes[0]);
    } else {
      setActiveStepBox("");
    }
  };

  // Switch domain from top header
  const handleSelectMainMenu = (menuId: MainMenuId) => {
    setCurrentMainMenu(menuId);
    const domainObj = MENU_STRUCTURE[menuId];
    if (domainObj && domainObj.items.length > 0) {
      handleSelectSubMenu(domainObj.items[0]);
    }
  };

  // Start a specific tutorial scenario
  const handleStartTutorialScenario = (scenario: TutorialScenario) => {
    setCurrentScenario(scenario);
    setTutorialStepIndex(0);
    setIsTutorialActive(true);

    const step0 = scenario.steps[0];
    if (step0.targetMenuId) {
      setCurrentMainMenu(step0.targetMenuId);
      const targetSub = MENU_STRUCTURE[step0.targetMenuId]?.items.find(
        (i) => i.id === step0.targetSubMenuId
      );
      if (targetSub) {
        setCurrentSubMenu(targetSub);
      }
      if (step0.targetStepBox) {
        setActiveStepBox(step0.targetStepBox);
      }
    }

    const tutorMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "bot",
      text: `[🎯 튜토리얼 시작: ${scenario.title}]\n\n📌 목표: ${scenario.description}\n\n👉 1단계 미션: ${step0.instruction}`,
      timestamp: new Date().toISOString(),
      manualPage: step0.manualPage
    };
    setChatMessages((prev) => [...prev, tutorMsg]);
  };

  // Next / Prev Tutorial Steps
  const handleNextTutorialStep = () => {
    if (!currentScenario) return;
    if (tutorialStepIndex < currentScenario.steps.length - 1) {
      const nextIdx = tutorialStepIndex + 1;
      setTutorialStepIndex(nextIdx);
      const nextStep = currentScenario.steps[nextIdx];

      if (nextStep.targetMenuId) {
        setCurrentMainMenu(nextStep.targetMenuId);
        const targetSub = MENU_STRUCTURE[nextStep.targetMenuId]?.items.find(
          (i) => i.id === nextStep.targetSubMenuId
        );
        if (targetSub) {
          setCurrentSubMenu(targetSub);
        }
        if (nextStep.targetStepBox) {
          setActiveStepBox(nextStep.targetStepBox);
        }
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: "bot",
          text: `[✅ ${tutorialStepIndex + 1}단계 완료] ➔ [${nextIdx + 1}단계 안내]\n\n👉 ${nextStep.instruction}`,
          timestamp: new Date().toISOString(),
          manualPage: nextStep.manualPage
        }
      ]);
    } else {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: "bot",
          text: `🎉 축하합니다! '${currentScenario.title}' 튜토리얼의 모든 단계를 성공적으로 완수하셨습니다.\n\n2026 나이스 매뉴얼 기준 적법 처리가 완결되었습니다. 다른 시나리오도 실습해보세요!`,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const handlePrevTutorialStep = () => {
    if (!currentScenario || tutorialStepIndex <= 0) return;
    const prevIdx = tutorialStepIndex - 1;
    setTutorialStepIndex(prevIdx);
    const prevStep = currentScenario.steps[prevIdx];
    if (prevStep.targetMenuId) {
      setCurrentMainMenu(prevStep.targetMenuId);
      const targetSub = MENU_STRUCTURE[prevStep.targetMenuId]?.items.find(
        (i) => i.id === prevStep.targetSubMenuId
      );
      if (targetSub) {
        setCurrentSubMenu(targetSub);
      }
      if (prevStep.targetStepBox) {
        setActiveStepBox(prevStep.targetStepBox);
      }
    }
  };

  // Triggered when user clicks a highlighted button in the simulator
  const handleActionTriggered = (actionId: string) => {
    if (!isTutorialActive || !currentScenario) return;
    const currentStep = currentScenario.steps[tutorialStepIndex];
    if (currentStep && currentStep.highlightButtonId === actionId) {
      handleNextTutorialStep();
    }
  };

  // Send message to Gemini Backend (/api/chat)
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toISOString()
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          apiKey: geminiApiKey,
          currentMenu: currentSubMenu.name,
          context: {
            currentMenu: currentSubMenu.name,
            currentDomain: MENU_STRUCTURE[currentMainMenu].title,
            activeStepBox,
            tutorialActive: isTutorialActive,
            tutorialScenario: currentScenario?.title,
            tutorialStep: currentScenario?.steps[tutorialStepIndex]?.title
          }
        })
      });

      const data = await res.json();

      if (!res.ok && !data.reply) {
        throw new Error("서버 응답 오류가 발생했습니다.");
      }

      if (data.requiresApiKey) {
        setIsApiKeyModalOpen(true);
      }

      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: "bot",
        text: data.reply || data.error || "죄송합니다. 답변을 생성하지 못했습니다.",
        timestamp: new Date().toISOString(),
        manualPage: data.manualPage
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "bot",
          text: `2026 나이스 가이드 안내:\n${getFallbackResponse(text)}`,
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Fallback Rule-based responder if offline
  const getFallbackResponse = (query: string): string => {
    if (query.includes("전입") || query.includes("전출")) {
      return "2026 나이스 전입관리 5단계: [전편입/재취학생 등록] ➔ [자료요청(전출교 송부)] ➔ [전입자료조회 및 검토] ➔ [기안문서 상신 및 결재] ➔ [학적반영 및 자료이관]. (매뉴얼 90p~102p)";
    }
    if (query.includes("평가") || query.includes("성취기준")) {
      return "평가계획안 수립: [성취기준관리]에서 국가교육과정 성취기준을 불러온 후 [성취기준(평가기준)관리]에서 '평가기준 일괄입력'으로 4단계(매우잘함/잘함/보통/노력요함)를 입력하고 [평가계획안 마감 및 승인요청]을 진행합니다. (매뉴얼 213p)";
    }
    if (query.includes("출결") || query.includes("방학")) {
      return "출결관리: 결석/지각 시 일일출결에서 비고등록(보조장부)을 입력하고 월말 출결마감 승인요청을 합니다. ※ 방학으로 출석일수가 0일인 달(8월, 1월 등)도 0일로 마감 필수입니다. (매뉴얼 124p)";
    }
    if (query.includes("정정대장") || query.includes("결재")) {
      return "학생부 정정대장: 당해학년도 이전 자료 정정 시 학업성적관리위원회 심의 및 객관적 증빙자료 첨부 후 반드시 [담임-학생부부장-교감-교장] 4단 결재를 거쳐야 하며 기결취소가 불가합니다. (매뉴얼 237p)";
    }
    return "2026 초등 4세대 나이스 업무 절차에 대해 안내해 드립니다. 화면 상단의 스텝박스를 순서대로 클릭하여 단계별로 처리해 주시기 바랍니다.";
  };

  // Approval Request Handler
  const handleRequestApproval = (title: string, docType: any, details: string) => {
    const newDoc: ApprovalDocument = {
      id: `doc-${Date.now()}`,
      title,
      docType,
      applicant: "교원01(박교사)",
      drafter: "교원01(박교사)",
      dept: "4학년부",
      date: "2026.04.16",
      createdDate: "2026.04.16",
      status: "결재중",
      approvalLine: [
        { role: "기안", name: "박교사", position: "담임교사", status: "완료", signed: true },
        { role: "검토", name: "최교사", position: "교무부장", status: "완료", signed: true },
        { role: "검토", name: "윤교감", position: "교감", status: "완료", signed: true },
        { role: "결재", name: "한교장", position: "학교장", status: "완료", signed: true }
      ],
      details
    };
    setApprovalDocs((prev) => [newDoc, ...prev]);
  };

  const handleApproveDocument = (docId: string) => {
    setApprovalDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: "완결" } : d))
    );
  };

  const currentStep = isTutorialActive ? currentScenario?.steps[tutorialStepIndex] : null;

  // Convert MANUAL_AUDIT_TIPS to AuditCheckItem format
  const auditCheckItems: AuditCheckItem[] = MANUAL_AUDIT_TIPS.map((tip) => ({
    id: tip.id,
    title: tip.title,
    category: tip.category,
    issue: tip.summary,
    solution: "2026 초등 나이스 매뉴얼 정밀 지침에 따라 오류를 방지하고 단계별 승인 절차를 준수합니다.",
    manualPage: parseInt(tip.page.replace(/[^0-9]/g, ""), 10) || 56
  }));

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans antialiased text-slate-800">
      {/* Top Header Navigation */}
      <HeaderNav
        currentMainMenu={currentMainMenu}
        onSelectMainMenu={handleSelectMainMenu}
        activeTutorial={isTutorialActive ? currentScenario : null}
        onOpenTutorialList={openTutorialMode}
        onOpenAuditTips={() => setIsAuditModalOpen(true)}
        onOpenApprovalList={() => setIsApprovalModalOpen(true)}
        approvalCount={approvalDocs.filter((d) => d.status === "결재중" || d.status === "결재대기").length}
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        hasApiKey={!!geminiApiKey}
        onOpenApiKeySettings={() => setIsApiKeyModalOpen(true)}
      />

      {/* Interactive Tutorial Banner (if active) */}
      {isTutorialActive && currentScenario && (
        <TutorialModeBanner
          scenario={currentScenario}
          currentStepIndex={tutorialStepIndex}
          onNextStep={handleNextTutorialStep}
          onPrevStep={handlePrevTutorialStep}
          onReset={() => setTutorialStepIndex(0)}
          onExit={() => setIsTutorialActive(false)}
          onOpenChatWithStep={() => {
            setIsChatOpen(true);
            handleSendMessage(
              `'${currentScenario.title}'의 '${currentStep?.title}' 단계(${currentStep?.instruction})를 수행하는 세부 절차와 매뉴얼 주의사항을 자세히 알려줘.`
            );
          }}
        />
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Menu */}
        <SidebarMenu
          currentMainMenu={currentMainMenu}
          currentSubMenuId={currentSubMenu?.id || ""}
          onSelectSubMenu={handleSelectSubMenu}
          highlightedSubMenuId={currentStep?.targetSubMenuId}
        />

        {/* Center Main Stage */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Breadcrumb Bar */}
          <NeisBreadcrumb
            currentMainMenu={currentMainMenu}
            currentSubMenu={currentSubMenu}
            path={[
              "나이스",
              MENU_STRUCTURE[currentMainMenu]?.title || "교무학사",
              currentSubMenu?.category || "",
              currentSubMenu?.name || ""
            ]}
            manualPage={currentSubMenu?.manualPage}
            onOpenAiTutor={() => setIsChatOpen(true)}
            onResetData={() => {
              setStudents(INITIAL_STUDENTS);
              setTeachers(INITIAL_TEACHERS);
              setApprovalDocs(INITIAL_APPROVAL_DOCS);
            }}
          />

          {/* 4th-Gen NEIS Rectangular StepBoxes */}
          {currentSubMenu?.stepBoxes && currentSubMenu.stepBoxes.length > 0 && (
            <StepBoxBar
              steps={currentSubMenu.stepBoxes}
              activeStep={activeStepBox}
              onSelectStep={(step) => setActiveStepBox(step)}
              highlightedStep={currentStep?.targetStepBox}
            />
          )}

          {/* View Container */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50">
            {/* 1. 전입관리 */}
            {currentSubMenu.id === "transfer_in" && (
              <TransferInView
                students={students}
                onAddTransferStudent={(st) => setStudents((prev) => [...prev, st])}
                onUpdateStudentStatus={(id, st) =>
                  setStudents((prev) =>
                    prev.map((s) => (s.id === id ? { ...s, status: st } : s))
                  )
                }
                onRequestApproval={handleRequestApproval}
                activeStepBox={activeStepBox}
                onStepBoxChange={(s) => setActiveStepBox(s)}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 2. 평가계획(안)관리 */}
            {(currentSubMenu.id === "eval_plan_manage" || currentSubMenu.id === "auto_eval_plan") && (
              <EvalPlanView
                activeStepBox={activeStepBox}
                onStepBoxChange={(s) => setActiveStepBox(s)}
                onRequestApproval={handleRequestApproval}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 3. 출결관리 (일일출결, 출결특기사항, 월마감) */}
            {currentSubMenu.id === "attendance_manage" && (
              <AttendanceView
                students={students}
                onUpdateAttendance={(id, data) =>
                  setStudents((prev) =>
                    prev.map((s) => (s.id === id ? { ...s, attendance: data } : s))
                  )
                }
                onRequestApproval={handleRequestApproval}
                activeStepBox={activeStepBox}
                onStepBoxChange={(s) => setActiveStepBox(s)}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 4. 학교생활기록부 (반영, 검증, 마감) */}
            {(currentSubMenu.id === "record_sync_apply" ||
              currentSubMenu.id === "record_verify_close" ||
              currentSubMenu.id === "record_inspect_print") && (
              <StudentRecordView
                students={students}
                onRequestApproval={handleRequestApproval}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 5. 학생부 정정대장 (4단 결재) */}
            {currentSubMenu.id === "record_rectification" && (
              <RectificationView
                students={students}
                onRequestApproval={handleRequestApproval}
                activeStepBox={activeStepBox}
                onStepBoxChange={(s) => setActiveStepBox(s)}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 6. 2026 2022개정 학교자율시간 */}
            {(currentSubMenu.id === "auto_curriculum_hours" ||
              currentSubMenu.id === "auto_subject_open" ||
              currentSubMenu.id === "auto_student_eval") && (
              <AutonomousTimeView
                students={students}
                activeStepBox={activeStepBox}
                onStepBoxChange={(s) => setActiveStepBox(s)}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 7. 교육과정 편제 및 시간표 (시수편차 0 검증) */}
            {(currentSubMenu.id === "curriculum_hours" ||
              currentSubMenu.id === "class_timetable" ||
              currentSubMenu.id === "academic_calendar") && (
              <CurriculumTimetableOverview
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 8. 동아리활동 관리 */}
            {currentSubMenu.id === "club_activity_manage" && (
              <ClubActivityView
                students={students}
                activeStepBox={activeStepBox}
                onStepBoxChange={(s) => setActiveStepBox(s)}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 9. 건강기록부 관리 */}
            {(currentSubMenu.id === "health_class_register" ||
              currentSubMenu.id === "health_batch_items" ||
              currentSubMenu.id === "health_close_transfer") && (
              <HealthRecordView
                students={students}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 10. 학교업무분장 관리 */}
            {(currentSubMenu.id === "manager_assign" ||
              currentSubMenu.id === "dept_manage" ||
              currentSubMenu.id === "work_member_manage" ||
              currentSubMenu.id === "menu_perm_manage") && (
              <SchoolWorkAssignView
                teachers={teachers}
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 11. 입학 및 진학관리 */}
            {(currentSubMenu.id === "admission_target_manage" ||
              currentSubMenu.id === "admission_create_record" ||
              currentSubMenu.id === "middle_school_assign") && (
              <AdmissionView
                highlightedButtonId={currentStep?.highlightButtonId}
                onActionTriggered={handleActionTriggered}
              />
            )}

            {/* 12. 일반 서브메뉴 Fallback */}
            {![
              "transfer_in",
              "eval_plan_manage",
              "auto_eval_plan",
              "attendance_manage",
              "record_sync_apply",
              "record_verify_close",
              "record_inspect_print",
              "record_rectification",
              "auto_curriculum_hours",
              "auto_subject_open",
              "auto_student_eval",
              "curriculum_hours",
              "class_timetable",
              "academic_calendar",
              "club_activity_manage",
              "health_class_register",
              "health_batch_items",
              "health_close_transfer",
              "manager_assign",
              "dept_manage",
              "work_member_manage",
              "menu_perm_manage",
              "admission_target_manage",
              "admission_create_record",
              "middle_school_assign"
            ].includes(currentSubMenu?.id || "") && (
              <GenericNeisView
                title={currentSubMenu?.name || "교무업무"}
                category={MENU_STRUCTURE[currentMainMenu]?.title || "교무학사"}
                students={students}
              />
            )}
          </div>
        </main>
      </div>

      {/* AI Tutor Chatbot Drawer / Floating Window */}
      <ChatWindow
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isLoading={isChatLoading}
        activeTutorial={isTutorialActive ? currentScenario : null}
        currentTutorialStepIndex={tutorialStepIndex}
        onNextTutorialStep={handleNextTutorialStep}
        isOpen={isChatOpen}
        onToggleOpen={() => setIsChatOpen(!isChatOpen)}
        currentMenuName={currentSubMenu?.name || ""}
      />

      {/* Audit Tips Modal (주요 감사 지적 사례 모달) */}
      <AuditTipsModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        auditTips={auditCheckItems}
        onSelectAuditTipToChat={(tip) => {
          setIsChatOpen(true);
          handleSendMessage(
            `2026 나이스 종합감사 지적사례 '[${tip.category}] ${tip.title}'에 대해 지적 사유와 적법 처리 절차(매뉴얼 p.${tip.manualPage})를 알기 쉽게 설명해줘.`
          );
        }}
      />

      {/* Approval Box Modal (전자결재함) */}
      <ApprovalBoxModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        documents={approvalDocs}
        onApproveDocument={handleApproveDocument}
      />

      {/* Gemini API Key Modal (본인 API 키 입력, 브라우저에만 저장) */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        currentKey={geminiApiKey}
        onSave={handleSaveApiKey}
        onSkip={handleSkipApiKey}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      {/* Tutorial Usage Guide Modal (튜토리얼 열 때 안내, 일주일간 숨기기 가능) */}
      <TutorialGuideModal
        isOpen={isGuideModalOpen}
        onClose={handleCloseGuideModal}
        onSnoozeWeek={handleSnoozeGuideModal}
      />

      {/* Disclaimer Modal (접속 시 즉시 안내) */}
      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
      />
    </div>
  );
}
export default App;
