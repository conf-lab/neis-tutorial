import { MainMenuId, SubMenuItem, TutorialScenario, Teacher, Student, ApprovalDocument } from "../types";

export const MENU_STRUCTURE: Record<MainMenuId, { title: string; icon: string; items: SubMenuItem[] }> = {
  school_work: {
    title: "학교업무분장",
    icon: "ShieldCheck",
    items: [
      { id: "manager_assign", name: "학교업무분장관리 담당자지정", category: "업무분장", manualPage: 4, description: "기관인증서로 학교업무분장 총괄 관리자 1인 지정" },
      { id: "dept_manage", name: "부서 관리(부서장 지정)", category: "업무분장", stepBoxes: ["처음으로", "부서 관리", "업무관리(부서원 편성)", "업무관리(메뉴,자료권한)"], manualPage: 5, description: "부서 생성 및 부서장 지정, 단위업무 권한 할당" },
      { id: "work_member_manage", name: "업무관리(부서원 편성)", category: "업무분장", manualPage: 8, description: "부서별 단위업무 배정 및 교원 편성" },
      { id: "menu_perm_manage", name: "업무관리(메뉴·자료권한 관리)", category: "업무분장", manualPage: 11, requiresDataPermission: true, description: "메뉴 조회/관리 권한 및 학년반/교과/동아리 자료권한 부여" },
      { id: "perm_approval", name: "교무자료권한승인관리", category: "업무분장", manualPage: 12, description: "등록된 자료권한에 대한 학교장 승인요청 및 완결 처리" },
      { id: "homeroom_std_manage", name: "담임업무기준관리", category: "업무분장", manualPage: 13, description: "학급담임/교과담임/동아리담임 기본 업무메뉴 추가 및 삭제" },
      { id: "temp_teacher_manage", name: "발령전 임시교원 등록/권한이양", category: "업무분장", manualPage: 17, description: "발령 전 임시교원 사전편성 및 6개월 내 정식ID 권한이양" },
    ],
  },
  school_info: {
    title: "학교정보",
    icon: "Building2",
    items: [
      { id: "school_basic_info", name: "학교 정보 관리", category: "학교정보", manualPage: 26, description: "학교 기본정보, 주소, 운영정보 조회 및 수정" },
      { id: "base_year_term", name: "기준년도/학기관리", category: "학교정보", manualPage: 28, description: "교무학년도 및 수업학년도 설정, 편차·수업일수 불일치시 {자료오류삭제} 수행" },
      { id: "grade_class_info", name: "학년/반정보 관리", category: "학교정보", manualPage: 29, description: "새학년도 학년별 반정보 일괄등록 및 복사, 반명과 정렬순서 일치 필수" },
      { id: "delete_individual_data", name: "학생개별자료삭제", category: "학교정보", manualPage: 30, description: "타교 이중학적 등 영구삭제 필요 대상 학생 결재 후 삭제" },
      { id: "student_record_history", name: "학생부 수정이력 조회", category: "학교정보", manualPage: 31, description: "학생별, 사용자별, 항목별 생기부 수정이력 및 전후 비교" },
    ],
  },
  curriculum: {
    title: "교육과정",
    icon: "BookOpen",
    items: [
      { id: "curriculum_hours", name: "학교교육과정편제 및 시간배당 관리", category: "교과편제", manualPage: 38, description: "2026학년도 2022 개정 교육과정 교과/창체/학교자율시간 시수 등록" },
      { id: "subject_learning_content", name: "교과별학습내용등록", category: "교과편제", manualPage: 41, description: "교과별 단원 및 차시 학습내용 엑셀 업로드 및 등록" },
      { id: "homeroom_teacher_assign", name: "학급담임편성관리", category: "학급담임/교과", manualPage: 44, description: "학년별 학급담임 및 복수담임 드래그 앤 드롭 편성" },
      { id: "subject_teacher_assign", name: "담당교과편성관리", category: "학급담임/교과", manualPage: 45, description: "교과전담교사 과목 및 학년반 개설 (학기별 등록)" },
      { id: "academic_calendar", name: "학사일정관리", category: "학사일정", manualPage: 48, description: "{공휴일정보생성} 선행 후 요일별 기준수업시수, 임시공휴일, 행사 등록" },
      { id: "class_timetable", name: "학급시간표 관리 (기초시간표)", category: "시간표", stepBoxes: ["학급시간표관리", "기초시간표", "학기별시간표"], manualPage: 56, description: "기초시간표 작성 및 반영기간 설정, 1·2학기 시수편차 '0' 확인 (주요 감사지적)" },
      { id: "lesson_progress", name: "교과진도표관리 / 교육과정재구성", category: "진도표", manualPage: 62, description: "교과진도표 생성 및 주간학습안내 연동, 범교과주제/프로젝트 재구성" },
      { id: "weekly_guide", name: "주간학습안내작성", category: "주간학습", manualPage: 67, description: "진도표 불러오기를 통한 주간학습안내 작성 및 출력" },
      { id: "substitute_class", name: "결보강처리", category: "결보강", manualPage: 70, description: "교사 결강 시 보강교사 배정, 사유 등록 및 결재 상신" },
    ],
  },
  academic_record: {
    title: "학적",
    icon: "Users",
    items: [
      { id: "basic_student_info", name: "기본신상관리 (누가주소·학적사항)", category: "기본학적", manualPage: 76, description: "학생 기본신상, 누가주소등록, 학적사항, 학년반이력, 번호수정" },
      { id: "student_photo_batch", name: "사진일괄입력 / 명렬표출력", category: "기본학적", manualPage: 80, description: "학생 사진 200KB 일괄 업로드 및 맞춤형 명렬표 출력" },
      { id: "student_address_sync", name: "학생주소연계", category: "기본학적", manualPage: 87, description: "행정정보공동이용시스템 주민등록 주소 연계 및 생기부 누가반영" },
      { id: "transfer_in", name: "전입관리 (5단계 프로세스)", category: "전입", stepBoxes: ["전편입재취학생등록", "자료요청및취소", "전입자료조회", "상신", "학적반영", "종합자료검색"], manualPage: 90, description: "전입생 등록 -> 전출교 자료요청 -> 자료 확인 -> 기안 상신 -> 학적반영 -> 자료이관" },
      { id: "transfer_out", name: "전출관리 (전출자료전송)", category: "전출", stepBoxes: ["전출자료요청접수", "월출결자료등록", "학교생활기록부생성", "전출자료전송", "상신", "학적반영"], manualPage: 96, description: "전출요청 확인 -> 월출결/생기부 생성 -> 전출자료 전송 -> 결재상신 및 학적반영" },
      { id: "exemption_leave", name: "면제/유예 및 장기결석 관리", category: "학적변동", manualPage: 104, description: "의무교육관리위원회 심의에 따른 유예/면제 등록 및 정원 외 학적관리" },
      { id: "promotion_manage", name: "진급자 반편성관리", category: "진급", stepBoxes: ["대상자생성", "일괄반편성", "개별반편성", "반번호부여", "반편성결과조회", "진급자학적반영", "진급누락자처리"], manualPage: 107, description: "새학년 진급대상자 생성 -> 반편성 -> 반번호부여 -> 결재상신 후 학적반영" },
      { id: "attendance_manage", name: "출결관리 (일일출결/특기사항/월마감)", category: "출결", stepBoxes: ["일일출결관리", "출결특기사항등록", "월별출결및재적현황"], manualPage: 118, description: "일일 출결 및 비고등록, 출결특기사항 입력(개근 일괄), 월별 출결마감 및 승인요청" },
      { id: "consigned_student", name: "위탁학생 / 타교수강생 관리", category: "위탁", manualPage: 125, description: "위탁교육 학생 등록, 출결 및 성적 자료전송 관리" },
      { id: "graduation_manage", name: "졸업처리 및 졸업생자료관리", category: "졸업", stepBoxes: ["조기졸업자관리", "졸업대상자생성", "졸업장번호부여", "졸업장출력", "졸업생학적반영"], manualPage: 137, description: "졸업생 학적반영은 진급자보다 반드시 먼저 처리 (생기부/건강기록부 마감 필수)" },
    ],
  },
  student_life: {
    title: "학생생활",
    icon: "Smile",
    items: [
      { id: "changche_manage", name: "창의적체험활동 (자율·동아리·봉사·진로)", category: "창체", manualPage: 157, description: "자율자치/진로활동 누가기록 및 학생부자료기록, 봉사활동 실적 연계" },
      { id: "club_activity_manage", name: "동아리활동관리 (부서개설·배정·누가기록)", category: "창체", stepBoxes: ["부서만들기", "부서배정", "동아리활동관리"], manualPage: 162, description: "동아리부서 개설 -> 지도교사 배정 -> 담임 학생배정 -> 동아리담임 누가기록" },
      { id: "awards_manage", name: "수상대장관리 / 상장출력", category: "수상", manualPage: 178, description: "상장번호설정(자동채번3), 상장서식관리, 수상대장등록 및 출력" },
      { id: "career_info_manage", name: "진로정보관리 (중학교 전송)", category: "진로", manualPage: 185, description: "6학년 개인정보 동의서 등록, 동의여부 마감, 사전승인 및 중학교 전송" },
      { id: "behavior_opinion", name: "행동특성 및 종합의견", category: "행특", manualPage: 190, description: "수시 누가기록, 학생부반영기록, 훈령정보조회, 맞춤법검사 및 복원" },
      { id: "school_violence", name: "학교폭력조치상황관리 (2026 1~3학년)", category: "학폭", manualPage: 195, description: "2026학년도 1·2·3학년 조치사항 전용 메뉴 등록, 삭제 규정 안내" },
      { id: "parent_service_approval", name: "학부모서비스 승인관리", category: "대국민", manualPage: 199, description: "학부모 나이스 서비스 신청건 확인, 일괄승인 및 승인거부 처리" },
    ],
  },
  grades: {
    title: "성적",
    icon: "GraduationCap",
    items: [
      { id: "eval_plan_manage", name: "평가계획(안)관리 (성취기준·평가기준)", category: "평가계획", stepBoxes: ["성취기준관리", "성취기준(평가기준)관리", "예시문", "평가계획(안)마감"], manualPage: 204, description: "교과별 평가영역, 성취기준, 4단계 평가기준 일괄입력 및 평가계획 마감·결재" },
      { id: "subject_evaluation", name: "교과평가 (성취기준별·영역별·교과별)", category: "학생평가", manualPage: 216, description: "학생별 성취기준 단계 평가결과 입력 및 학생/학부모서비스 반영" },
      { id: "term_comprehensive_opinion", name: "학기말종합의견", category: "학생평가", manualPage: 218, description: "교과평가·관찰기록 참고자료 조회 후 복사, 교과평가 일괄복사, 예시문 활용" },
      { id: "learning_development_status", name: "교과학습발달상황 (생기부 반영)", category: "학생평가", manualPage: 219, description: "학기말종합의견을 교과학습발달상황으로 일괄저장 (생기부 반영 항목)" },
      { id: "grade_inquiry_analysis", name: "성적조회 / 수행영역분석표", category: "성적조회", manualPage: 224, description: "교과별·개인별 성적일람표 조회 및 학생별 수행영역 방사형/막대 분석 그래프" },
      { id: "observation_records", name: "관찰내용관리 (나이스플러스 연계)", category: "관찰기록", manualPage: 227, description: "수업/평가 장면 수시 관찰기록, 나이스플러스 자료 가져오기 연계" },
    ],
  },
  student_record: {
    title: "학생부",
    icon: "FileText",
    items: [
      { id: "record_sync_apply", name: "학교생활기록부 반영", category: "학생부", manualPage: 232, description: "인적/출결/창체/성적/행특 모든 입력 데이터를 학교생활기록부에 최종 반영" },
      { id: "record_verify_close", name: "자료검증 및 반마감", category: "학생부", manualPage: 232, description: "기록 누락/오류 유무 검증, 확인필요 오류 수정 및 예외처리사유 일괄입력 후 반마감" },
      { id: "record_inspect_print", name: "학생부 조회 및 출력 / 마감", category: "학생부", manualPage: 235, description: "학생부 세부사항 조회 및 학년 전체마감, 관리자 승인요청 상신" },
      { id: "record_rectification", name: "정정대장관리 (4단 결재)", category: "정정대장", stepBoxes: ["1.정정대장목록", "2.정정대장등록", "3.항목별정정", "4.승인요청"], manualPage: 237, description: "이전학년도 오류 정정, 객관적 증빙 첨부, 담임-부장-교감-교장 4단 결재 필수" },
      { id: "report_card_manage", name: "생활통지표 등록·반영·마감", category: "생활통지표", stepBoxes: ["통지표 등록", "자료반영 및 마감관리", "통지표 조회 및 출력", "통지표 마감", "종합일람표"], manualPage: 244, description: "통지표 표지/교육목표 설정 -> 자료 전체반영 -> 개인통신문 -> 반마감 -> 학기마감" },
    ],
  },
  autonomous_time: {
    title: "학교자율시간 (2022개정)",
    icon: "Sparkles",
    items: [
      { id: "auto_curriculum_hours", name: "학교자율시간 편제 및 시수설정", category: "자율시간", manualPage: 306, description: "2026학년도 3~6학년 특색 교육과정 과목(활동) 편제 및 시수 편성 (3~4학년 29h+, 5~6학년 32h+)" },
      { id: "auto_subject_open", name: "과목(활동) 개설 및 학생배정", category: "자율시간", stepBoxes: ["학생선택그룹 편성", "과목(활동) 개설", "학생배정(학생선택)", "학교자율시간관리(전체)"], manualPage: 310, description: "학급공통 일괄편성 또는 학생선택그룹 편성 및 담당교사 지정" },
      { id: "auto_eval_plan", name: "학교자율시간 평가계획(안)관리", category: "자율시간", manualPage: 314, description: "자율시간 과목(활동) 성취기준 및 4단계 평가기준 등록 및 마감" },
      { id: "auto_student_eval", name: "학교자율시간 학생평가 / 종합의견", category: "자율시간", manualPage: 325, description: "교과평가 입력, 학기말종합의견 및 교과학습발달상황 연계 반영" },
    ],
  },
  health: {
    title: "보건",
    icon: "Activity",
    items: [
      { id: "health_class_register", name: "건강기록부 반별등록", category: "건강기록부", manualPage: 290, description: "인적사항생성, 예방접종, 신체발달(BMI 자동계산), 신체능력(PAPS), 건강검진, 자료검증" },
      { id: "health_batch_items", name: "항목별 등록 / 일괄조회", category: "건강기록부", manualPage: 296, description: "취학전후 예방접종 일괄등록, PAPS 자료 불러오기, 검진일 연동" },
      { id: "health_close_transfer", name: "건강기록부 마감 및 상급학교 전송", category: "건강기록부", manualPage: 299, description: "반마감 후 학년 전체마감 승인요청, 중학교 전송 사전승인" },
      { id: "health_rectification", name: "건강기록부 정정대장", category: "정정대장", manualPage: 301, description: "건강기록부 정정대장 등록 및 결재 완료 후 완결자료반영" },
    ],
  },
  admission: {
    title: "입학/진학",
    icon: "GraduationCap",
    items: [
      { id: "admission_target_manage", name: "취학대상자 관리", category: "취학", manualPage: 280, description: "행정복지센터 명부 파일올리기, 본교확인(대상/비대상) 설정" },
      { id: "admission_create_record", name: "학적 일괄생성", category: "취학", manualPage: 281, description: "취학 아동 1학년 학적 일괄생성 및 생성취소 관리" },
      { id: "middle_school_assign", name: "중학교 진학학교확인 / 사전승인", category: "진학", manualPage: 283, description: "교육지원청 중학교 배정 결과 확인 및 학생자료 사전일괄승인" },
    ],
  },
  special_edu: {
    title: "개별화교육계획",
    icon: "HeartHandshake",
    items: [
      { id: "iep_student_manage", name: "인적사항관리 (대상자등록)", category: "개별화", manualPage: 252, description: "특수교육대상자 등록, 기본사항Ⅰ(배치/장애유형), 기본사항Ⅱ(행동특성), 진단평가" },
      { id: "iep_area_manage", name: "개별화교육계획 영역개설 / 수강편성", category: "개별화", manualPage: 258, description: "생활지원/교과 영역 개설 및 특수교육 수강학생 편성" },
      { id: "iep_plan_eval_manage", name: "개별화교육계획 및 평가 관리", category: "개별화", manualPage: 261, description: "학기별/월별 교육목표, 교육내용, 평가준거 작성, 마감 및 승인요청" },
      { id: "iep_transfer_manage", name: "개별화교육계획 전송관리", category: "개별화", manualPage: 273, description: "유치원 자료 전송요청 및 상급학교(중학교) 전송 승인" },
    ],
  },
};

export const INITIAL_TEACHERS: Teacher[] = [
  { id: "t01", name: "김교사", role: "교사(초등)", grade: 3, classNum: 1, subject: "담임" },
  { id: "t02", name: "이교사", role: "교사(초등)", grade: 3, classNum: 2, subject: "담임" },
  { id: "t03", name: "박교사", role: "교사(초등)", grade: 4, classNum: 1, subject: "담임/학년부장" },
  { id: "t04", name: "최교사", role: "교사(초등)", grade: 6, classNum: 1, subject: "담임/교무부장" },
  { id: "t05", name: "정교사", role: "전담교사", grade: 4, classNum: 0, subject: "영어" },
  { id: "t06", name: "강교사", role: "전담교사", grade: 4, classNum: 0, subject: "과학" },
  { id: "t07", name: "조교사", role: "특수교사", grade: 0, classNum: 0, subject: "특수학급" },
  { id: "t08", name: "윤교감", role: "교감" },
  { id: "t09", name: "한교장", role: "교장" },
  { id: "t10", name: "송주무", role: "교육행정직" },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "s01",
    name: "강민우",
    gender: "남",
    birth: "2016-04-12",
    residentId: "160412-3******",
    grade: 4,
    classNum: 1,
    studentNumber: 1,
    status: "재학",
    address: "경기도 수원시 영통구 광교중앙로 123",
    attendance: { present: 190, absent_sick: 0, absent_unauth: 0, absent_etc: 0, late: 0, early: 0, specialRemark: "개근" },
    healthRecord: { height: 139.5, weight: 34.2, bmi: 17.6, papsGrade: "1등급", verified: true, vaccineDone: true },
    subjects: {
      "국어": { achievement: "매우잘함", comment: "자신의 생각을 논리정연하게 표현하며 친구들의 의견을 경청하는 태도가 우수함.", verified: true },
      "수학": { achievement: "매우잘함", comment: "분수와 소수의 연산 원리를 명확히 이해하고 다양한 문제 해결 전략을 스스로 탐구함.", verified: true },
      "사회": { achievement: "잘함", comment: "우리 고장의 환경과 역사적 유래에 관심이 많고 조사활동에 적극적으로 참여함.", verified: true },
      "디지털 민주시민(활동)": { achievement: "매우잘함", comment: "디지털 기기의 올바른 활용법과 정보윤리를 실천하며 협업 프로젝트를 주도함.", verified: true }
    },
    behaviorOpinion: "밝고 성실하며 급우들과의 교우 관계가 매우 원만함. 정해진 규칙을 잘 준수하고 자기 주도적 학습 능력이 뛰어남.",
    clubName: "로봇코딩부",
    clubRemark: "기초 센서 동작 원리를 이해하고 블록 코딩으로 자율주행 알고리즘을 성공적으로 구현함.",
    careerHope: "소프트웨어 엔지니어"
  },
  {
    id: "s02",
    name: "김하은",
    gender: "여",
    birth: "2016-07-25",
    residentId: "160725-4******",
    grade: 4,
    classNum: 1,
    studentNumber: 2,
    status: "재학",
    address: "경기도 수원시 영통구 매영로 45",
    attendance: { present: 188, absent_sick: 2, absent_unauth: 0, absent_etc: 0, late: 0, early: 0, remarks: "05/12 질병결석(감기)" },
    healthRecord: { height: 137.8, weight: 31.0, bmi: 16.3, papsGrade: "2등급", verified: true, vaccineDone: true },
    subjects: {
      "국어": { achievement: "매우잘함", comment: "어휘력이 풍부하며 독서 후 인물의 감정에 공감하는 서술 능력이 돋보임.", verified: true },
      "수학": { achievement: "잘함", comment: "도형의 성질을 정확히 파악하고 평면도형의 이동을 직관적으로 잘 이해함.", verified: true },
      "사회": { achievement: "매우잘함", comment: "지도의 기호와 축척을 정확히 해석하고 지리적 특성을 체계적으로 정리함.", verified: true },
      "디지털 민주시민(활동)": { achievement: "잘함", comment: "인터넷 예절과 저작권 보호 규칙을 철저히 지키며 모둠 과제에 성실히 기여함.", verified: true }
    },
    behaviorOpinion: "배려심이 깊어 도움이 필요한 친구를 솔선수범하여 돕고 학급 공동체 활동에 긍정적인 에너지를 불어넣음.",
    clubName: "어린이방송부",
    clubRemark: "아침 방송 아나운서로서 정확한 발음과 전달력 있는 어조로 학교 소식을 명확하게 전달함.",
    careerHope: "방송 작가"
  },
  {
    id: "s03",
    name: "박도윤",
    gender: "남",
    birth: "2016-01-18",
    residentId: "160118-3******",
    grade: 4,
    classNum: 1,
    studentNumber: 3,
    status: "재학",
    address: "경기도 수원시 영통구 청명로 78",
    attendance: { present: 190, absent_sick: 0, absent_unauth: 0, absent_etc: 0, late: 0, early: 0, specialRemark: "개근" },
    healthRecord: { height: 142.1, weight: 36.5, bmi: 18.1, papsGrade: "1등급", verified: true, vaccineDone: true },
    subjects: {
      "국어": { achievement: "잘함", comment: "문장의 구조를 바르게 이해하고 일기나 생활문 작성 시 솔직 담백하게 표현함.", verified: true },
      "수학": { achievement: "매우잘함", comment: "자연수의 곱셈과 나눗셈 계산이 신속 정확하며 수학적 논리 전개가 명확함.", verified: true },
      "과학": { achievement: "매우잘함", comment: "실험 탐구 과정에서 가설을 설정하고 변인을 통제하여 결론을 도출하는 능력이 뛰어남.", verified: true },
      "디지털 민주시민(활동)": { achievement: "매우잘함", comment: "생성형 AI와 디지털 도구를 활용하여 학교 생활 개선 아이디어를 창의적으로 시각화함.", verified: true }
    },
    behaviorOpinion: "호기심이 많고 탐구적인 자세로 새로운 분야에 도전하는 것을 즐기며, 과제 해결 과정에서 끈기가 돋보임.",
    clubName: "환경지킴이부",
    clubRemark: "교내 분리배출 캠페인 및 학교 텃밭 가꾸기 활동에 책임감을 갖고 능동적으로 참여함.",
    careerHope: "생명과학 연구원"
  },
  {
    id: "s04",
    name: "이지유",
    gender: "여",
    birth: "2016-09-05",
    residentId: "160905-4******",
    grade: 4,
    classNum: 1,
    studentNumber: 4,
    status: "재학",
    address: "경기도 수원시 영통구 효원로 210",
    attendance: { present: 189, absent_sick: 1, absent_unauth: 0, absent_etc: 0, late: 0, early: 0 },
    healthRecord: { height: 135.2, weight: 29.8, bmi: 16.3, papsGrade: "2등급", verified: true, vaccineDone: true },
    subjects: {
      "국어": { achievement: "잘함", comment: "교과서 지문의 주제를 잘 파악하고 자신의 경험과 연계하여 발표를 조리 있게 함.", verified: true },
      "음악": { achievement: "매우잘함", comment: "리코더 연주 기법이 안정적이며 악곡의 빠르기와 셈여림을 살려 아름답게 표현함.", verified: true },
      "미술": { achievement: "매우잘함", comment: "색채 감각이 탁월하고 다양한 재료의 특성을 살려 창의적인 조형 작품을 제작함.", verified: true }
    },
    behaviorOpinion: "예술적 감수성이 풍부하고 매사에 온화하며 타인의 의견을 잘 경청하는 모범적인 태도를 지님.",
    clubName: "창의미술부",
    clubRemark: "점묘화 및 공예 활동에서 섬세한 손재주를 발휘하며 수준 높은 작품을 완성함.",
    careerHope: "일러스트레이터"
  },
  {
    id: "s05",
    name: "정시우",
    gender: "남",
    birth: "2016-11-30",
    residentId: "161130-3******",
    grade: 4,
    classNum: 1,
    studentNumber: 5,
    status: "전입",
    address: "경기도 수원시 팔달구 권광로 99",
    attendance: { present: 185, absent_sick: 0, absent_unauth: 0, absent_etc: 0, late: 1, early: 0 },
    healthRecord: { height: 140.0, weight: 35.0, bmi: 17.9, papsGrade: "2등급", verified: false, vaccineDone: true },
    subjects: {
      "국어": { achievement: "잘함", comment: "전입 초기 원만한 적응력을 보이며 모둠 학습에서 협력적인 자세로 참여함.", verified: false },
      "체육": { achievement: "매우잘함", comment: "기초 체력이 우수하고 구기 종목에서 협동심과 규칙 준수 태도가 매우 훌륭함.", verified: false }
    },
    behaviorOpinion: "적응력이 뛰어나고 활달한 성격으로 급우들과 빠르게 친화력을 형성함.",
    clubName: "배드민턴부",
    clubRemark: "기본 스트로크 및 풋워크를 빠르게 익혀 경기 운영 능력이 향상됨."
  }
];

export const INITIAL_APPROVAL_DOCS: ApprovalDocument[] = [
  {
    id: "appr-01",
    title: "2026학년도 1학기 4학년 평가계획(안) 마감 승인",
    docType: "평가계획",
    applicant: "박교사",
    dept: "4학년부",
    date: "2026-03-16",
    status: "완결",
    approvalLine: [
      { role: "기안(담당)", name: "박교사", signed: true, date: "2026-03-16 10:15" },
      { role: "교감", name: "윤교감", signed: true, date: "2026-03-16 11:30" },
      { role: "교장", name: "한교장", signed: true, date: "2026-03-16 14:00" },
    ],
    details: "2026학년도 4학년 1학기 공통교과 및 학교자율시간(디지털 민주시민) 성취기준 및 평가기준안 승인의 건"
  },
  {
    id: "appr-02",
    title: "2026학년도 3월 학급별 출결 월마감 승인요청",
    docType: "월별출결",
    applicant: "최교사",
    dept: "교무부",
    date: "2026-03-31",
    status: "결재중",
    approvalLine: [
      { role: "기안(담당)", name: "최교사", signed: true, date: "2026-03-31 16:20" },
      { role: "교감", name: "윤교감", signed: true, date: "2026-03-31 17:00" },
      { role: "교장", name: "한교장", signed: false },
    ],
    details: "2026학년도 3월 전 학급 일일출결 및 비고등록 완료에 따른 월별 출결 및 재적 현황 마감 상신의 건"
  },
  {
    id: "appr-03",
    title: "학교생활기록부 정정대장 작성 승인의 건 (제2026-01호)",
    docType: "정정대장",
    applicant: "박교사",
    dept: "4학년 1반",
    date: "2026-04-17",
    status: "결재대기",
    approvalLine: [
      { role: "담임(기안)", name: "박교사", signed: true, date: "2026-04-17 09:30" },
      { role: "학생부부장", name: "최교사", signed: false },
      { role: "교감", name: "윤교감", signed: false },
      { role: "교장", name: "한교장", signed: false },
    ],
    details: "3학년 재학 당시 출결상황 수업일수(186일 -> 191일) 오기재에 대한 객관적 증빙자료 첨부 및 4단 결재 정정의 건"
  }
];

// 12 Interactive Tutorial Scenarios
export const TUTORIAL_SCENARIOS: TutorialScenario[] = [
  {
    id: "tut-transfer-in",
    title: "전입생 5단계 등록 및 학적반영 마스터",
    category: "학적/출결",
    badgeColor: "bg-blue-600 text-white",
    description: "전편입학생 등록부터 전출교 자료요청, 전입자료 조회, 기안 상신, 학적반영 및 자료이관까지 완벽 마스터하기",
    relatedManualPage: "매뉴얼 90p~94p",
    steps: [
      {
        stepNumber: 1,
        title: "전입관리 메뉴 이동",
        instruction: "좌측 메뉴에서 [학적] > [전입관리 (5단계 프로세스)] 메뉴를 클릭하세요.",
        hint: "학적 하위의 전입관리 메뉴를 선택합니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "transfer_in",
        actionRequired: "NAVIGATE",
        completedText: "전입관리 화면으로 성공적으로 이동했습니다."
      },
      {
        stepNumber: 2,
        title: "전편입/재취학생 등록 팝업 열기",
        instruction: "우측 상단의 [등록] 버튼을 클릭하여 전입생 등록 팝업을 엽니다.",
        hint: "파란색 {등록} 버튼을 클릭하세요.",
        targetMenuId: "academic_record",
        targetSubMenuId: "transfer_in",
        targetStepBox: "전편입재취학생등록",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-register-transfer-in",
        completedText: "전입생 등록 팝업이 호출되었습니다."
      },
      {
        stepNumber: 3,
        title: "전입생 정보 조회 및 신규학적 배정",
        instruction: "학생명 '정시우'를 검색하여 선택하고 학년 4학년, 1반, 번호 5번을 지정한 후 [저장]을 누르세요.",
        hint: "전입생의 신규취득학적 반과 번호를 확인하고 저장합니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "transfer_in",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-transfer-in-dialog",
        completedText: "전입생 신규 학적 정보가 저장되었습니다."
      },
      {
        stepNumber: 4,
        title: "전출교로 자료요청 송부",
        instruction: "[자료요청 및 취소] 스텝박스로 이동 후 학생을 선택하고 [자료요청] 버튼을 클릭하세요.",
        hint: "전출교에 생활기록부 및 건강기록부 자료 송부를 요청합니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "transfer_in",
        targetStepBox: "자료요청및취소",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-request-data",
        completedText: "전출교로 전입자료 요청이 완료되었습니다."
      },
      {
        stepNumber: 5,
        title: "기안문서 상신 및 최종 학적반영",
        instruction: "[상신] 스텝박스에서 결재선 지정 후 상신하고, [학적반영] 스텝박스에서 [학적반영] 버튼을 눌러 이관을 완료하세요.",
        hint: "학적반영 시 전출교에서 보낸 전출자료가 자동으로 전입교로 자료이관됩니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "transfer_in",
        targetStepBox: "학적반영",
        actionRequired: "APPROVE",
        actionTargetId: "btn-apply-transfer-in-record",
        completedText: "전입생 학적반영 및 자료이관이 완벽하게 완료되었습니다! 🎉"
      }
    ]
  },
  {
    id: "tut-eval-plan",
    title: "교과 평가계획(안) 수립 및 평가기준 일괄입력",
    category: "성적/평가",
    badgeColor: "bg-emerald-600 text-white",
    description: "2026학년도 교과별 성취기준 등록, 4단계 평가기준 일괄입력, 예시문 활용 및 평가계획 마감·결재",
    relatedManualPage: "매뉴얼 204p~213p",
    steps: [
      {
        stepNumber: 1,
        title: "평가계획(안)관리 메뉴 이동",
        instruction: "좌측 메뉴에서 [성적] > [평가계획(안)관리] 메뉴를 클릭하세요.",
        hint: "성적 대메뉴 하위의 평가계획(안)관리 항목입니다.",
        targetMenuId: "grades",
        targetSubMenuId: "eval_plan_manage",
        actionRequired: "NAVIGATE",
        completedText: "평가계획(안)관리 화면에 진입했습니다."
      },
      {
        stepNumber: 2,
        title: "성취기준 조회 및 영역 등록",
        instruction: "학년(4학년), 교과(국어)를 선택하고 [조회]를 누른 뒤 성취기준을 확인하세요.",
        hint: "국가교육과정성취기준 또는 영역명관리를 통해 성취기준을 구성합니다.",
        targetMenuId: "grades",
        targetSubMenuId: "eval_plan_manage",
        targetStepBox: "성취기준관리",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-search-eval-plan",
        completedText: "국어과 성취기준 목록이 조회되었습니다."
      },
      {
        stepNumber: 3,
        title: "성취기준(평가기준)관리에서 평가기준 일괄입력",
        instruction: "[성취기준(평가기준)관리] 탭을 누르고, [일괄입력] 버튼을 눌러 매우잘함/잘함/보통/노력요함 4단계를 설정하세요.",
        hint: "전과목일괄입력 또는 일괄입력 팝업을 활용합니다.",
        targetMenuId: "grades",
        targetSubMenuId: "eval_plan_manage",
        targetStepBox: "성취기준(평가기준)관리",
        actionRequired: "SAVE",
        actionTargetId: "btn-batch-eval-criteria-save",
        completedText: "평가기준이 성공적으로 일괄 등록되었습니다."
      },
      {
        stepNumber: 4,
        title: "평가계획(안) 마감 및 승인요청 상신",
        instruction: "[평가계획(안)마감] 탭에서 마감 체크박스를 선택하고 [저장] 후 [승인요청]을 클릭하세요.",
        hint: "평가계획안 마감 후 결재권자에게 승인요청을 상신합니다.",
        targetMenuId: "grades",
        targetSubMenuId: "eval_plan_manage",
        targetStepBox: "평가계획(안)마감",
        actionRequired: "APPROVE",
        actionTargetId: "btn-submit-eval-plan-approval",
        completedText: "평가계획(안)이 마감되고 관리자 결재 상신이 완료되었습니다!"
      }
    ]
  },
  {
    id: "tut-autonomous-time",
    title: "2026 학교자율시간(2022개정) 편제 및 배정",
    category: "학교자율시간",
    badgeColor: "bg-purple-600 text-white",
    description: "2022 개정 교육과정 3~6학년 학교자율시간 편제 등록(3~4학년 29시간 이상)과 과목개설 및 학생 일괄편성",
    relatedManualPage: "매뉴얼 305p~312p",
    steps: [
      {
        stepNumber: 1,
        title: "학교자율시간 편제 메뉴 진입",
        instruction: "좌측 메뉴에서 [학교자율시간] > [학교자율시간 편제 및 시수설정]을 클릭하세요.",
        hint: "학교자율시간 대메뉴에서 편제 설정을 선택합니다.",
        targetMenuId: "autonomous_time",
        targetSubMenuId: "auto_curriculum_hours",
        actionRequired: "NAVIGATE",
        completedText: "학교자율시간 편제 관리 화면에 진입했습니다."
      },
      {
        stepNumber: 2,
        title: "자율시간 과목(활동) 등록",
        instruction: "[등록] 버튼을 누르고 운영방식(학급공통), 관련교과(사회/도덕), 활동명('디지털 민주시민'), 시수(29)를 입력 후 [저장]하세요.",
        hint: "3~4학년군은 29시간 이상, 5~6학년군은 32시간 이상 편성해야 합니다.",
        targetMenuId: "autonomous_time",
        targetSubMenuId: "auto_curriculum_hours",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-autonomous-curriculum",
        completedText: "학교자율시간 '디지털 민주시민(활동)' 편제(29시수)가 등록되었습니다."
      },
      {
        stepNumber: 3,
        title: "과목(활동) 개설 및 학급공통 일괄편성",
        instruction: "[과목(활동) 개설 및 학생배정] 메뉴로 이동하여 [학급공통 일괄편성] 버튼을 눌러 학생들을 배정하세요.",
        hint: "학급공통 과목은 일괄편성 버튼으로 반 학생 전체가 자동 배정됩니다.",
        targetMenuId: "autonomous_time",
        targetSubMenuId: "auto_subject_open",
        targetStepBox: "과목(활동) 개설",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-auto-class-batch-assign",
        completedText: "학교자율시간 과목 개설 및 4학년 학생 일괄 배정이 완료되었습니다!"
      }
    ]
  },
  {
    id: "tut-record-rectification",
    title: "학교생활기록부 정정대장 작성 및 4단 결재",
    category: "학생부/통지표",
    badgeColor: "bg-red-600 text-white",
    description: "이전학년도 생기부 오류 수정을 위한 정정대장 작성, 객관적 증빙 첨부 및 담임-부장-교감-교장 4단 결재",
    relatedManualPage: "매뉴얼 237p~242p",
    steps: [
      {
        stepNumber: 1,
        title: "정정대장관리 메뉴 진입",
        instruction: "좌측 메뉴에서 [학생부] > [정정대장관리 (4단 결재)]를 클릭하세요.",
        hint: "학생부 하위의 정정대장작성 메뉴입니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_rectification",
        actionRequired: "NAVIGATE",
        completedText: "정정대장관리 화면으로 이동했습니다."
      },
      {
        stepNumber: 2,
        title: "정정대상 학생 선택 및 등록 화면 호출",
        instruction: "학생 '박도윤'을 클릭하여 [2.정정대장등록] 탭을 활성화하고 클릭하세요.",
        hint: "학생을 선택해야 정정대장등록 스텝박스가 열립니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_rectification",
        targetStepBox: "2.정정대장등록",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-step-rectification-register",
        completedText: "정정대장 등록 화면이 활성화되었습니다."
      },
      {
        stepNumber: 3,
        title: "정정항목 및 오류/정정내용 입력",
        instruction: "정정항목(출결상황), 오류내용(1학년 수업일수 186일), 정정내용(수업일수 191일), 정정사유(입력오류) 입력 후 [저장]하세요.",
        hint: "객관적 증빙자료에 근거하여 심의일자와 함께 입력합니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_rectification",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-rectification-entry",
        completedText: "정정내용이 저장되었습니다."
      },
      {
        stepNumber: 4,
        title: "4단 결재선(담임-부장-교감-교장) 지정 및 상신",
        instruction: "[4.승인요청] 탭에서 결재선을 확인하고 [상신] 버튼을 클릭하세요.",
        hint: "생기부 정정대장은 반드시 담임-학생부부장-교감-교장의 4단 결재를 거쳐야 하며 기결취소가 불가합니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_rectification",
        targetStepBox: "4.승인요청",
        actionRequired: "APPROVE",
        actionTargetId: "btn-submit-rectification-approval",
        completedText: "4단 결재 상신이 완료되었습니다! 완결 시 생기부에 자동 반영됩니다."
      }
    ]
  },
  {
    id: "tut-attendance-close",
    title: "일일출결 비고등록 & 월별 출결마감 및 승인",
    category: "학적/출결",
    badgeColor: "bg-indigo-600 text-white",
    description: "일일 결석/지각/조퇴 입력, 비고등록(보조장부), 출결특기사항(개근 일괄), 월별 마감 및 승인요청",
    relatedManualPage: "매뉴얼 118p~124p",
    steps: [
      {
        stepNumber: 1,
        title: "출결관리 메뉴 이동",
        instruction: "[학적] > [출결관리 (일일출결/특기사항/월마감)] 메뉴로 이동하세요.",
        hint: "출결관리 메뉴를 클릭합니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "attendance_manage",
        actionRequired: "NAVIGATE",
        completedText: "출결관리 화면에 진입했습니다."
      },
      {
        stepNumber: 2,
        title: "일일출결 비고등록 확인",
        instruction: "김하은 학생의 5월 12일 결석 칸을 클릭하고 사유(질병결석: 감기)를 확인 후 [저장]하세요.",
        hint: "결석 발생 시 보조장부인 비고등록을 권장합니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "attendance_manage",
        targetStepBox: "일일출결관리",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-daily-attendance",
        completedText: "일일출결 및 비고가 저장되었습니다."
      },
      {
        stepNumber: 3,
        title: "출결특기사항 개근 일괄입력",
        instruction: "[출결특기사항등록] 탭을 누르고 [개근 일괄입력] 버튼을 클릭한 뒤 [저장]하세요.",
        hint: "결석/지각/조퇴가 없는 학생에게 '개근'이 일괄 입력됩니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "attendance_manage",
        targetStepBox: "출결특기사항등록",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-batch-perfect-attendance",
        completedText: "출결특기사항에 개근이 일괄 등록되었습니다."
      },
      {
        stepNumber: 4,
        title: "월별 출결 마감 및 승인요청",
        instruction: "[월별출결및재적현황] 탭으로 이동하여 3월 출결을 확인하고 [승인요청]을 클릭하세요.",
        hint: "방학으로 출석일수가 0일인 달도 마감 처리가 필수입니다.",
        targetMenuId: "academic_record",
        targetSubMenuId: "attendance_manage",
        targetStepBox: "월별출결및재적현황",
        actionRequired: "APPROVE",
        actionTargetId: "btn-submit-attendance-monthly-approval",
        completedText: "월별 출결 마감 및 승인요청이 완료되었습니다!"
      }
    ]
  },
  {
    id: "tut-club-activity",
    title: "동아리 부서개설, 학생배정, 누가기록 연계",
    category: "학생생활/창체",
    badgeColor: "bg-amber-600 text-white",
    description: "동아리부서 만들기, 지도교사 지정, 학생 부서배정, 동아리담임 누가기록 및 {동아리특기사항가져오기}",
    relatedManualPage: "매뉴얼 162p~169p",
    steps: [
      {
        stepNumber: 1,
        title: "동아리활동관리 이동",
        instruction: "[학생생활] > [동아리활동관리] 메뉴로 이동하세요.",
        hint: "창의적체험활동 하위의 동아리활동관리 메뉴입니다.",
        targetMenuId: "student_life",
        targetSubMenuId: "club_activity_manage",
        actionRequired: "NAVIGATE",
        completedText: "동아리활동관리 화면에 진입했습니다."
      },
      {
        stepNumber: 2,
        title: "동아리 부서개설 및 지도교사 지정",
        instruction: "[부서만들기] 스텝박스에서 [행추가]를 누르고 '로봇코딩부'(지도교사: 박교사)를 등록 후 [저장]하세요.",
        hint: "동아리부서구분(동아리활동/자율동아리/청소년단체)을 선택합니다.",
        targetMenuId: "student_life",
        targetSubMenuId: "club_activity_manage",
        targetStepBox: "부서만들기",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-club-department",
        completedText: "로봇코딩부 부서가 개설되었습니다."
      },
      {
        stepNumber: 3,
        title: "학생 부서배정",
        instruction: "[부서배정] 스텝박스로 이동하여 4학년 1반 학생 강민우를 '로봇코딩부'에 배정하고 [저장]하세요.",
        hint: "학급담임 권한으로 학생을 해당 동아리에 배정합니다.",
        targetMenuId: "student_life",
        targetSubMenuId: "club_activity_manage",
        targetStepBox: "부서배정",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-club-student-assign",
        completedText: "학생이 동아리부서에 배정되었습니다."
      },
      {
        stepNumber: 4,
        title: "누가기록 및 특기사항 입력",
        instruction: "[동아리활동관리] 스텝박스에서 활동일자별 누가기록을 작성하고 [저장]하세요.",
        hint: "동아리활동은 생기부에 비연동되므로 학생부자료기록 메뉴에서 {동아리특기사항가져오기}를 해야 최종 반영됩니다.",
        targetMenuId: "student_life",
        targetSubMenuId: "club_activity_manage",
        targetStepBox: "동아리활동관리",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-club-activity-log",
        completedText: "동아리활동 누가기록 저장이 완료되었습니다!"
      }
    ]
  },
  {
    id: "tut-record-verify",
    title: "생기부 자료검증, 예외처리 및 학년마감",
    category: "학생부/통지표",
    badgeColor: "bg-teal-600 text-white",
    description: "생기부 반영 -> 오류 자료검증 -> 예외처리사유 일괄입력 -> 반마감 -> 학년 전체마감 및 결재",
    relatedManualPage: "매뉴얼 232p~236p",
    steps: [
      {
        stepNumber: 1,
        title: "생활기록부 반영",
        instruction: "[학생부] > [학교생활기록부 반영] 메뉴에서 [전체반영] 버튼을 클릭하세요.",
        hint: "모든 교과 및 출결, 창체 기록을 생기부에 동기화합니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_sync_apply",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-sync-all-records",
        completedText: "생기부 전체 반영이 완료되었습니다."
      },
      {
        stepNumber: 2,
        title: "자료검증 실행",
        instruction: "[자료검증 및 반마감] 메뉴로 이동하여 [전체검증] 버튼을 클릭하세요.",
        hint: "누락된 항목 및 오류 항목을 검사합니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_verify_close",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-run-data-verification",
        completedText: "자료검증이 완료되었습니다. 확인필요 항목이 표시됩니다."
      },
      {
        stepNumber: 3,
        title: "예외처리사유 일괄입력 및 반마감",
        instruction: "[예외처리사유 일괄입력] 팝업에서 사유를 등록하고 [반마감] 버튼을 클릭하세요.",
        hint: "확인필요 오류가 해결되거나 예외사유가 입력되어야 반마감이 가능합니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_verify_close",
        actionRequired: "SAVE",
        actionTargetId: "btn-close-class-record",
        completedText: "반마감이 성공적으로 완료되었습니다."
      },
      {
        stepNumber: 4,
        title: "학년 전체마감 및 승인요청",
        instruction: "[학생부 조회 및 출력 / 마감] 메뉴에서 학년 전체마감 후 [승인요청]을 클릭하세요.",
        hint: "학년 내 모든 반이 마감되어야 전체마감 및 상신이 가능합니다.",
        targetMenuId: "student_record",
        targetSubMenuId: "record_inspect_print",
        actionRequired: "APPROVE",
        actionTargetId: "btn-submit-grade-record-approval",
        completedText: "해당 학년의 학교생활기록부 마감 및 결재 상신이 완료되었습니다!"
      }
    ]
  },
  {
    id: "tut-timetable-balance",
    title: "기초시간표 등록 및 1학기 시수편차 '0' 점검",
    category: "학년초",
    badgeColor: "bg-orange-600 text-white",
    description: "기초시간표 작성 및 반영, 교과별 기준시수와 시간표 편성시수 편차를 0으로 완벽 검증 (감사 1순위)",
    relatedManualPage: "매뉴얼 56p~60p",
    steps: [
      {
        stepNumber: 1,
        title: "학급시간표 관리 진입",
        instruction: "[교육과정] > [학급시간표 관리 (기초시간표)] 메뉴로 이동하세요.",
        hint: "교육과정 하위의 학급시간표 관리 메뉴입니다.",
        targetMenuId: "curriculum",
        targetSubMenuId: "class_timetable",
        actionRequired: "NAVIGATE",
        completedText: "학급시간표 관리 화면에 진입했습니다."
      },
      {
        stepNumber: 2,
        title: "기초시간표 작성 및 과목 드래그 앤 드롭",
        instruction: "[기초시간표] 버튼을 클릭하고 주간 교시별 과목을 배치한 후 [저장]하세요.",
        hint: "좌측 교과목을 우측 시간표 교시에 배치합니다.",
        targetMenuId: "curriculum",
        targetSubMenuId: "class_timetable",
        targetStepBox: "기초시간표",
        actionRequired: "SAVE",
        actionTargetId: "btn-save-base-timetable",
        completedText: "기초시간표가 작성되었습니다."
      },
      {
        stepNumber: 3,
        title: "기초시간표 기간 반영 및 편차 0 검증",
        instruction: "반영기간(03.01~08.18)을 설정하고 [반영]을 누른 뒤 과목별 편차가 '0'인지 확인하세요.",
        hint: "편차가 0이 아닐 경우 학사일정 또는 기준년도 {자료오류삭제} 후 재확인합니다.",
        targetMenuId: "curriculum",
        targetSubMenuId: "class_timetable",
        actionRequired: "CLICK_BUTTON",
        actionTargetId: "btn-apply-base-timetable-period",
        completedText: "모든 교과목의 시수 편차가 '0'으로 완벽하게 일치합니다! 감사 지적 예방 완료."
      }
    ]
  }
];

// Audit Tips and Manual Highlights
export const MANUAL_AUDIT_TIPS = [
  {
    id: "tip-01",
    title: "1·2학기 과목별 시수편차 '0' 확인 (주요 감사 지적사항)",
    category: "교육과정 / 시간표",
    page: "56p, 60p",
    summary: "[교육과정]-[시간표관리]-[학급시간표관리]에서 과목별 기준시수와 편차가 반드시 '0'이어야 합니다. 편차가 남아있을 경우 [학교정보]-[기준년도/학기관리]에서 {자료오류삭제}를 진행하거나 시간표를 증감 수정해야 합니다."
  },
  {
    id: "tip-02",
    title: "학적 변동 시 '전출-전입' 순서 및 공백일수 점검",
    category: "학적",
    page: "76p, 90p",
    summary: "입학 후 학적변동 시 전출-전입 순서가 맞아야 하며 전출입일 간 공백이 없어야 합니다. (단, 도서벽지 등 원격지 1일, 해외 3일 차이 인정). 전입생의 이전출결자료 확인 및 자료이관이 필수입니다."
  },
  {
    id: "tip-03",
    title: "6학년 졸업생 학적반영은 1~5학년 진급자 학적반영보다 반드시 먼저!",
    category: "졸업 / 진급",
    page: "283p, 137p",
    summary: "반드시 6학년 졸업생 학적반영을 먼저 처리한 후 1~5학년 진급자 학적반영을 순서대로(6->5->4->3->2->1) 진행해야 학적 충돌 오류가 발생하지 않습니다."
  },
  {
    id: "tip-04",
    title: "학교생활기록부 정정대장은 반드시 4단 결재 필수 (기결취소 불가)",
    category: "학생부",
    page: "237p, 240p",
    summary: "재학생 생기부 정정은 객관적 증빙자료가 있는 경우에만 가능하며, 반드시 '담임 - 학생부담당부장 - 교감 - 교장'의 4단 결재로 처리해야 합니다. 상신 후에는 기결취소가 불가하므로 상신 전 면밀한 검토가 필요합니다."
  },
  {
    id: "tip-05",
    title: "동아리활동 특기사항은 학생부 비연동이므로 가져오기 필수",
    category: "창체 / 학생생활",
    page: "157p, 176p",
    summary: "자율·자치 및 진로활동은 학생부와 연동되어 자동 입력되지만, 동아리활동은 비연동되므로 [학생부자료기록] 메뉴에서 {동아리특기사항가져오기}를 통해 반영해야 생기부에 기재됩니다."
  },
  {
    id: "tip-06",
    title: "2026학년도 학교폭력조치상황관리 메뉴는 1~3학년만 적용",
    category: "학생생활",
    page: "195p, 197p",
    summary: "2026학년도 기준 1,2,3학년만 [학교폭력조치상황관리] 전용 메뉴에 입력하며, 4~6학년은 기존 지침대로 '학적사항', '출결상황' 특기사항 및 '행동특성 및 종합의견'에 분리 기재합니다."
  },
  {
    id: "tip-07",
    title: "방학 달(8월, 1월 등)도 출석일수 0일로 월마감 필수",
    category: "출결",
    page: "118p, 124p",
    summary: "방학으로 인해 출석일수가 없는 달이라도 [출결관리]에서 0일로 마감 처리를 완료해야 상급 승인 및 학기말 통계 집계가 정상적으로 이루어집니다."
  }
];
