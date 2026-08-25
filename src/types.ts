export type MainMenuId =
  | "school_work" // 학교업무분장
  | "school_info" // 학교정보
  | "curriculum" // 교육과정
  | "academic_record" // 학적
  | "student_life" // 학생생활
  | "grades" // 성적
  | "student_record" // 학생부
  | "special_edu" // 개별화교육계획
  | "admission" // 입학
  | "health" // 보건
  | "autonomous_time"; // 학교자율시간

export interface SubMenuItem {
  id: string;
  name: string;
  category?: string;
  stepBoxes?: string[];
  manualPage?: number;
  description?: string;
  requiresDataPermission?: boolean;
}

export interface NeisSubMenu {
  id: string;
  name: string;
  path?: string[];
  manualPage: number;
  stepBoxes?: string[];
  description?: string;
  category?: string;
  requiresDataPermission?: boolean;
}

export interface NeisMenuGroup {
  name: string;
  subMenus: NeisSubMenu[];
}

export interface NeisMenuDomain {
  id: MainMenuId | string;
  name: string;
  icon: string;
  groups: NeisMenuGroup[];
}

export interface Teacher {
  id: string;
  name: string;
  role: "교사(초등)" | "교감" | "교장" | "교육행정직" | "특수교사" | "전담교사";
  department?: string;
  position?: string;
  assignedClass?: string;
  roles?: string[];
  grade?: number;
  classNum?: number;
  subject?: string;
}

export interface Student {
  id: string;
  name: string;
  gender: "남" | "여";
  birth?: string;
  birthDate?: string;
  residentId: string;
  grade: number;
  classNum: number;
  studentNumber: number;
  status: "재학" | "전입" | "전출" | "면제" | "유예" | "취학예정" | "졸업";
  address: string;
  hasPhoto?: boolean;
  notes?: string;
  remarks?: string;
  // 출결 정보
  attendance?: {
    present?: number;
    absent_sick?: number;
    absent_unauth?: number;
    absent_etc?: number;
    late?: number;
    early?: number;
    remarks?: string;
    specialRemark?: string;
  };
  // 건강기록부 정보
  healthRecord?: {
    height: number;
    weight: number;
    bmi: number;
    papsGrade: string;
    verified: boolean;
    vaccineDone: boolean;
  };
  // 동아리
  club?: {
    name: string;
    teacher?: string;
    hours?: number;
    remark?: string;
  };
  clubName?: string;
  clubRemark?: string;
  // 교과 성적 정보
  subjects?: {
    [subjectName: string]: {
      achievement: "매우잘함" | "잘함" | "보통" | "노력요함";
      comment: string;
      verified?: boolean;
    };
  };
  behaviorOpinion?: string;
  careerHope?: string;
}

export interface Department {
  id: string;
  name: string;
  headName: string;
  workDescription: string;
  members: { teacherId: string; teacherName: string; taskName: string }[];
  permissions: string[];
}

export interface TutorialStep {
  stepNumber?: number;
  title: string;
  instruction: string;
  hint?: string;
  targetMenu?: string;
  targetMenuId?: MainMenuId;
  targetSubMenuId?: string;
  targetStepBox?: string;
  highlightButtonId?: string;
  manualPage?: number;
  actionRequired?: "NAVIGATE" | "CLICK_BUTTON" | "FILL_FORM" | "SAVE" | "APPROVE";
  actionTargetId?: string;
  completedText?: string;
}

export interface TutorialScenario {
  id: string;
  title: string;
  category: "학년초" | "학적/출결" | "학생생활/창체" | "성적/평가" | "학생부/통지표" | "학교자율시간" | string;
  badgeColor: string;
  description: string;
  relatedManualPage?: string;
  manualPage?: number;
  steps: TutorialStep[];
}

export interface AuditCheckItem {
  id: string;
  category: string;
  title: string;
  issue: string;
  solution: string;
  manualPage: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "bot" | "system";
  text: string;
  timestamp: number | string;
  quickActions?: { label: string; action: string; menuId?: MainMenuId; subMenuId?: string }[];
  manualPage?: number | string;
  referencedManualPage?: number | string;
}

export interface ApprovalLineMember {
  role: string;
  name: string;
  position?: string;
  status?: "완료" | "대기" | "반려";
  signed?: boolean;
  date?: string;
}

export interface ApprovalDocument {
  id: string;
  title: string;
  docType: "정정대장" | "평가계획" | "월별출결" | "전입학적반영" | "진급자반편성" | "학생부마감" | "자료권한승인" | string;
  applicant?: string;
  drafter?: string;
  dept?: string;
  date?: string;
  createdDate?: string;
  status: "결재대기" | "결재중" | "완결" | "반려";
  approvalLine: ApprovalLineMember[];
  details: string;
}
