import { PracticeScreen, TutorialStep } from "../types";

/**
 * 가이드 학습(GuidedStepView) 단계별 '나이스형 실습 화면' 명세.
 *
 * 키 = `${lessonId}:${stepNumber}` (curriculum.ts의 레슨 id와 스텝 번호).
 * 전용 인터랙티브 시나리오가 없는 주제라도, 실제 4세대 나이스와 비슷한
 * 미니 입력 화면에서 값을 넣고 [저장]하면 "나이스에서 무엇이 바뀌는지"를 보여준다.
 *
 * 등장 인물(가상): 김·이교사(3학년 담임), 박교사(4-1 담임/학년부장),
 * 최교사(6-1 담임/교무부장), 정교사(영어전담), 강교사(과학전담),
 * 조교사(특수), 윤교감, 한교장, 송주무(행정).
 * 4-1 학생: 강민우·김하은·박도윤·이지유·정시우.
 */

const TEACHERS = ["김교사", "이교사", "박교사", "최교사", "정교사", "강교사", "조교사"];
const STUDENTS_4_1 = ["강민우", "김하은", "박도윤", "이지유", "정시우"];

// 초등 일반 결재선 (담당 → 교무부장 → 교감 → 교장)
const LINE_STD = [
  { role: "기안(담당)", name: "박교사" },
  { role: "교무부장", name: "최교사" },
  { role: "교감", name: "윤교감" },
  { role: "교장", name: "한교장" },
];

export const PRACTICE_SCREENS: Record<string, PracticeScreen> = {
  // ─────────────────────────────────────────────────────────────
  // 1단계 · 학년 초 준비
  // ─────────────────────────────────────────────────────────────

  // l-work-assign · 학교업무분장 담당자 지정 · 부서 · 권한 관리
  "l-work-assign:2": {
    kind: "grid",
    activeStepBox: "부서 관리",
    intro:
      "부서를 만들고 부서장을 지정합니다. 부서 단위로 단위업무(메뉴) 권한이 묶이므로, 학교 조직표와 똑같이 맞추세요.",
    toolbar: ["조회", "행추가", "행삭제"],
    columns: [
      { key: "dept", label: "부서명", sample: "연구부" },
      { key: "head", label: "부서장", type: "select", options: TEACHERS, sample: "김교사" },
      {
        key: "task",
        label: "주요 단위업무",
        sample: "교육과정·평가",
      },
      { key: "order", label: "정렬순서", type: "number", sample: "3" },
    ],
    seedRows: [
      { dept: "교무부", head: "최교사", task: "학적·출결·나이스", order: "1" },
      { dept: "4학년부", head: "박교사", task: "4학년 교육과정·생활", order: "2" },
    ],
    sampleRow: { dept: "연구부", head: "김교사", task: "교육과정·평가", order: "3" },
    result: [
      "부서 목록에 새 부서가 추가되고, 부서장에게 '부서장' 표시가 붙습니다.",
      "이 부서는 다음 단계 [업무관리(부서원 편성)] 화면의 부서 목록에 바로 나타납니다.",
      "부서에 묶인 단위업무 메뉴 권한은 [메뉴·자료권한 관리]에서 부서원에게 부여됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-work-assign:3": {
    kind: "grid",
    activeStepBox: "업무관리(부서원 편성)",
    intro:
      "각 부서의 단위업무에 담당 교원을 배정합니다. 여기서 배정돼야 해당 교원에게 그 업무의 메뉴가 열립니다.",
    toolbar: ["조회", "행추가", "행삭제"],
    columns: [
      { key: "dept", label: "부서", type: "select", options: ["교무부", "연구부", "4학년부"], sample: "4학년부" },
      { key: "task", label: "단위업무", sample: "출결관리" },
      { key: "teacher", label: "담당교원", type: "select", options: TEACHERS, sample: "박교사" },
      { key: "note", label: "비고", sample: "정" },
    ],
    seedRows: [
      { dept: "교무부", task: "학적·전출입", teacher: "최교사", note: "정" },
      { dept: "교무부", task: "나이스 권한관리", teacher: "최교사", note: "정" },
    ],
    sampleRow: { dept: "4학년부", task: "출결관리", teacher: "박교사", note: "정" },
    result: [
      "배정된 교원의 나이스 좌측 메뉴에 해당 단위업무 메뉴가 추가됩니다(다음 접속 시 반영).",
      "부서원 편성 결과는 [메뉴·자료권한 관리]에서 교원별 권한 부여의 기준이 됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-work-assign:4": {
    kind: "form",
    activeStepBox: "업무관리(메뉴,자료권한)",
    intro:
      "교원별로 메뉴 조회/관리 권한과 학년·반·교과·동아리 자료권한을 부여합니다. 자료권한은 이 화면에서 저장한 뒤 다음 주제에서 '결재'를 올려야 실제로 적용됩니다.",
    toolbar: ["조회", "권한복사"],
    fields: [
      { key: "teacher", label: "대상 교원", type: "select", options: TEACHERS, sample: "박교사" },
      {
        key: "menu",
        label: "메뉴 권한",
        type: "select",
        options: ["조회만", "조회+관리"],
        sample: "조회+관리",
      },
      { key: "grade", label: "학년·반 자료권한", sample: "4학년 1반" },
      { key: "subject", label: "교과 자료권한", sample: "4학년 담임교과", optional: true },
      { key: "club", label: "동아리 자료권한", sample: "로봇코딩부", optional: true },
    ],
    result: [
      "교원별 메뉴 권한이 즉시 저장되어, 다음 접속 때 해당 메뉴가 열리거나 잠깁니다.",
      "학년·반/교과/동아리 자료권한은 '승인대기' 상태로 등록됩니다 — 아직 학생 자료는 안 보입니다.",
      "다음 주제 [교무자료권한 승인관리]에서 학교장 결재가 완결돼야 담임이 자기 반 학생 자료를 열 수 있습니다.",
    ],
    resultBadge: "저장됨 · 자료권한 승인대기",
  },

  // l-perm-approval · 교무자료권한 승인관리
  "l-perm-approval:2": {
    kind: "approve",
    intro:
      "앞에서 부여한 자료권한 목록을 학교장 결재로 확정합니다. 상신하면 담당자는 더 이상 임의로 고칠 수 없고, [결재함]에서 진행 상황을 볼 수 있습니다.",
    docTitle: "2026학년도 교무자료권한 부여 승인요청",
    approvalLine: [
      { role: "기안(담당)", name: "최교사" },
      { role: "교감", name: "윤교감" },
      { role: "교장", name: "한교장" },
    ],
    result: [
      "자료권한 승인요청 문서가 상신되어 상태가 '결재중'으로 바뀝니다.",
      "교장 결재가 완결되면 자료권한 상태가 '완료'로 바뀌고, 담임·전담이 자기 학년·반·교과 자료를 열 수 있게 됩니다.",
      "완결 전까지는 담임이 자기 반 학생 자료도 조회할 수 없습니다.",
    ],
    resultBadge: "결재중",
  },

  // l-temp-teacher · 발령 전 임시교원 등록 / 권한이양
  "l-temp-teacher:1": {
    kind: "form",
    intro:
      "3월 1일 발령 전이라도 임시 ID로 신규 교원을 미리 등록해 학년 초 업무를 시작하게 합니다.",
    toolbar: ["조회", "등록", "삭제"],
    fields: [
      { key: "name", label: "성명", sample: "한지민" },
      { key: "birth", label: "생년월일", type: "date", sample: "1994-05-12" },
      {
        key: "grade",
        label: "담당 학년",
        type: "select",
        options: ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"],
        sample: "3학년",
      },
      { key: "cls", label: "담당 반", type: "select", options: ["1반", "2반", "3반"], sample: "3반" },
      { key: "role", label: "직위/역할", sample: "학급담임", optional: true },
    ],
    result: [
      "임시 ID(예: temp_한지민)가 생성되어 부서·권한 편성 화면에 대상자로 나타납니다.",
      "임시교원은 이 ID로 로그인해 학년 초 업무를 시작할 수 있습니다.",
      "정식 발령(3.1) 후 6개월 이내에 [권한이양]으로 정식 ID에 자료를 넘겨야 합니다.",
    ],
    resultBadge: "임시 ID 생성됨",
  },
  "l-temp-teacher:2": {
    kind: "form",
    intro: "임시교원에게도 정식 교원과 똑같이 부서와 자료권한을 부여합니다.",
    toolbar: ["조회", "권한복사"],
    fields: [
      { key: "target", label: "대상 임시교원", type: "select", options: ["temp_한지민"], sample: "temp_한지민" },
      { key: "dept", label: "부서", type: "select", options: ["교무부", "연구부", "3학년부"], sample: "3학년부" },
      { key: "menu", label: "메뉴 권한", type: "select", options: ["조회만", "조회+관리"], sample: "조회+관리" },
      { key: "grade", label: "학년·반 자료권한", sample: "3학년 3반" },
    ],
    result: [
      "임시교원의 부서·메뉴 권한이 저장됩니다.",
      "자료권한은 '승인대기'로 등록되며, [교무자료권한 승인관리] 결재가 완결돼야 적용됩니다.",
    ],
    resultBadge: "저장됨 · 자료권한 승인대기",
  },
  "l-temp-teacher:3": {
    kind: "form",
    intro:
      "정식 발령 후, 임시 ID로 입력한 자료를 정식 ID로 옮깁니다. 이관 후 임시 ID는 폐기됩니다.",
    toolbar: ["조회", "권한이양"],
    fields: [
      { key: "from", label: "임시 ID", type: "select", options: ["temp_한지민"], sample: "temp_한지민" },
      { key: "to", label: "정식 ID(발령)", sample: "hanjm2026" },
      {
        key: "scope",
        label: "이관 자료",
        type: "select",
        options: ["담당 학년·반 전체", "선택 항목만"],
        sample: "담당 학년·반 전체",
      },
      { key: "confirm", label: "임시 ID의 입력 자료를 정식 ID로 이관함을 확인", type: "checkbox" },
    ],
    result: [
      "임시 ID가 입력한 출결·기록 등 모든 자료의 작성자가 정식 ID로 바뀝니다.",
      "임시 ID는 비활성화되어 더 이상 로그인할 수 없습니다.",
      "6개월이 지나면 권한이양이 불가하므로 발령 즉시 처리해야 합니다.",
    ],
    resultBadge: "권한이양 완료",
  },

  // l-base-year · 기준년도 / 학기 관리
  "l-base-year:2": {
    kind: "form",
    intro:
      "교무학년도와 학기, 학기 시작·종료일을 확정합니다. 이 값이 시간표·출결·수업일수 계산의 기준이 됩니다.",
    toolbar: ["조회", "저장"],
    fields: [
      { key: "year", label: "교무학년도", type: "select", options: ["2026"], sample: "2026" },
      { key: "term", label: "학기", type: "select", options: ["1학기", "2학기"], sample: "1학기" },
      { key: "start", label: "학기 시작일", type: "date", sample: "2026-03-02" },
      { key: "end", label: "학기 종료일", type: "date", sample: "2026-08-18" },
      { key: "days", label: "예정 수업일수", type: "number", suffix: "일", sample: "95" },
    ],
    result: [
      "2026학년도 1학기 기준정보가 확정되어 시간표·학사일정·출결 메뉴가 이 기간을 기준으로 동작합니다.",
      "이후 수업일수·편차 경고가 뜨면 다음 단계 [자료오류삭제]로 바로잡고 시간표를 다시 반영해야 합니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-base-year:3": {
    kind: "batch",
    intro:
      "수업일수나 시수 편차 경고가 뜰 때, 잘못 계산된 자료를 지우고 다시 계산하도록 합니다.",
    batchAction: "자료오류삭제 실행",
    batchPreview: [
      "시간표 편성시수 캐시 (2026-1학기)",
      "요일별 기준수업시수 재계산 대상",
      "학사일정 연동 수업일수 집계",
    ],
    batchNote: "실행 후 반드시 [학급시간표 관리]에서 기초시간표를 다시 [반영]해야 편차가 0으로 맞습니다.",
    result: [
      "잘못 계산된 편차·수업일수 자료가 삭제됩니다.",
      "시간표를 다시 반영하면 교과별 시수 편차가 정상적으로 재계산됩니다.",
    ],
    resultBadge: "삭제 완료 · 시간표 재반영 필요",
  },

  // l-grade-class · 학년 / 반 정보 관리
  "l-grade-class:2": {
    kind: "grid",
    intro:
      "새 학년도의 학년별 학급 수를 등록합니다. [전년도 복사]로 만든 뒤 반 수만 조정하는 것이 빠릅니다.",
    toolbar: ["조회", "전년도 복사", "일괄등록", "행추가"],
    columns: [
      { key: "grade", label: "학년", type: "select", options: ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"], sample: "1학년" },
      { key: "classes", label: "학급 수", type: "number", sample: "3" },
      { key: "names", label: "반 이름", sample: "1반,2반,3반" },
    ],
    seedRows: [
      { grade: "3학년", classes: "3", names: "1반,2반,3반" },
      { grade: "4학년", classes: "2", names: "1반,2반" },
    ],
    sampleRow: { grade: "1학년", classes: "3", names: "1반,2반,3반" },
    minRows: 1,
    result: [
      "등록된 학급이 담임편성·반편성·출결 등 모든 학급 선택 목록에 나타납니다.",
      "반 이름과 정렬 순서는 실제 학교와 똑같아야 합니다 — 나중에 바꾸면 이력이 꼬입니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-admission · 취학대상자 관리 · 1학년 학적 일괄생성
  "l-admission:2": {
    kind: "upload",
    intro: "행정복지센터에서 받은 취학 명부 파일을 올려 취학대상 아동을 한꺼번에 등록합니다.",
    fileKind: "엑셀(.xlsx)",
    fileName: "2026_취학대상자_명부.xlsx",
    result: [
      "명부의 아동이 취학대상자 목록에 '본교확인 대기' 상태로 올라옵니다.",
      "다음 단계에서 본교 취학 대상/비대상을 지정해야 학적을 생성할 수 있습니다.",
    ],
    resultBadge: "42명 등록됨",
  },
  "l-admission:3": {
    kind: "grid",
    intro:
      "명단에서 우리 학교로 취학하는 아동(대상)과 다른 학교·유예 등(비대상)을 구분합니다.",
    toolbar: ["조회", "일괄지정"],
    columns: [
      { key: "name", label: "성명", sample: "오서준" },
      { key: "birth", label: "생년월일", type: "date", sample: "2019-03-11" },
      { key: "confirm", label: "본교확인", type: "select", options: ["대상", "비대상"], sample: "대상" },
    ],
    seedRows: [
      { name: "김하늘", birth: "2019-01-22", confirm: "대상" },
      { name: "이준호", birth: "2019-11-30", confirm: "비대상" },
    ],
    sampleRow: { name: "오서준", birth: "2019-03-11", confirm: "대상" },
    result: [
      "본교확인이 끝난 아동만 다음 단계 [학적 일괄생성] 대상이 됩니다.",
      "비대상으로 지정한 아동은 우리 학교 학적이 만들어지지 않습니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-admission:4": {
    kind: "batch",
    intro: "본교확인이 끝난 취학 아동의 1학년 학적을 한 번에 만듭니다.",
    batchAction: "1학년 학적 일괄생성",
    batchPreview: [
      "본교 취학 대상 아동 39명",
      "학년/반: 1학년 (반편성 전, 미배정)",
      "학적상태: 취학예정 → 재학",
    ],
    batchNote: "생성 후에는 [반편성]과 [기본신상관리]에서 반·번호와 인적사항을 입력합니다.",
    result: [
      "취학 아동 39명의 1학년 학적이 생성되어 '재학' 상태가 됩니다.",
      "이제 반편성·기본신상·사진 등록 등 후속 학적 업무를 진행할 수 있습니다.",
      "잘못 생성한 경우 [생성취소]로 되돌릴 수 있습니다(입력 자료가 없을 때만).",
    ],
    resultBadge: "39명 학적 생성됨",
  },

  // l-curriculum-hours · 학교교육과정 편제 및 시간배당
  "l-curriculum-hours:2": {
    kind: "grid",
    intro:
      "학년군별 교과 기준시수와 창의적체험활동 시수를 등록합니다. 2026학년도는 1~6학년 전 학년에 2022 개정 교육과정이 적용됩니다.",
    toolbar: ["조회", "전년도 불러오기", "행추가"],
    columns: [
      { key: "group", label: "학년군", type: "select", options: ["1~2학년", "3~4학년", "5~6학년"], sample: "3~4학년" },
      { key: "subject", label: "교과/영역", sample: "국어" },
      { key: "base", label: "기준시수(연간)", type: "number", sample: "408" },
    ],
    seedRows: [
      { group: "3~4학년", subject: "수학", base: "272" },
      { group: "3~4학년", subject: "창의적 체험활동", base: "204" },
    ],
    sampleRow: { group: "3~4학년", subject: "국어", base: "408" },
    result: [
      "학년군별 편제가 저장되어 시간표 시수편차 검증의 기준이 됩니다.",
      "여기 등록한 기준시수와 실제 시간표 편성시수의 차이가 '편차'로 계산됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-curriculum-hours:3": {
    kind: "form",
    intro:
      "2022 개정 학교자율시간 시수를 편제에 반영합니다. 3~4학년군은 29시간 이상, 5~6학년군은 32시간 이상이어야 합니다.",
    fields: [
      { key: "group", label: "학년군", type: "select", options: ["3~4학년", "5~6학년"], sample: "3~4학년" },
      { key: "name", label: "활동명", sample: "디지털 민주시민" },
      { key: "hours", label: "시수", type: "number", suffix: "시간", sample: "29" },
      { key: "related", label: "관련 교과", sample: "사회/도덕" },
    ],
    result: [
      "학교자율시간 시수가 편제에 반영되어 총 이수시간에 합산됩니다.",
      "29시간(3~4학년) 미만이면 저장 시 경고가 뜹니다.",
      "과목 개설 후 [학교자율시간 평가계획(안)관리]에서 성취기준·평가기준을 따로 등록해야 합니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-homeroom-assign · 학급담임 · 담당교과 편성
  "l-homeroom-assign:2": {
    kind: "grid",
    intro:
      "교원을 각 학급의 담임으로 배정합니다. 실제 나이스는 드래그로 하지만 여기서는 표에서 선택합니다. 필요하면 복수담임도 지정합니다.",
    toolbar: ["조회", "행추가"],
    columns: [
      { key: "cls", label: "학급", sample: "4학년 1반" },
      { key: "homeroom", label: "담임교원", type: "select", options: TEACHERS, sample: "박교사" },
      { key: "co", label: "복수담임", type: "select", options: ["(없음)", ...TEACHERS], sample: "(없음)" },
    ],
    seedRows: [
      { cls: "3학년 1반", homeroom: "김교사", co: "(없음)" },
      { cls: "3학년 2반", homeroom: "이교사", co: "(없음)" },
    ],
    sampleRow: { cls: "4학년 1반", homeroom: "박교사", co: "(없음)" },
    result: [
      "담임이 배정된 교원에게 담임업무 메뉴(출결·창체·생기부 등)가 열립니다.",
      "복수담임도 같은 학급 자료에 접근할 수 있게 됩니다.",
      "담임 편성 결과는 [담당교과편성]과 시간표의 기준이 됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-homeroom-assign:3": {
    kind: "grid",
    intro: "교과전담교사의 담당 과목과 학년·반을 학기별로 등록합니다.",
    toolbar: ["조회", "행추가"],
    columns: [
      { key: "teacher", label: "전담교사", type: "select", options: ["정교사", "강교사"], sample: "정교사" },
      { key: "subject", label: "과목", type: "select", options: ["영어", "과학", "체육", "음악", "미술"], sample: "영어" },
      { key: "classes", label: "담당 학년·반", sample: "3~6학년 전체" },
      { key: "term", label: "학기", type: "select", options: ["1학기", "2학기", "1·2학기"], sample: "1·2학기" },
    ],
    seedRows: [{ teacher: "강교사", subject: "과학", classes: "3~6학년 전체", term: "1·2학기" }],
    sampleRow: { teacher: "정교사", subject: "영어", classes: "3~6학년 전체", term: "1·2학기" },
    result: [
      "전담교사에게 담당 학년·반·과목의 평가·시간표 메뉴가 열립니다.",
      "담당교과 편성이 끝나야 시간표에서 전담 과목을 배치할 수 있습니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-academic-calendar · 학사일정 관리
  "l-academic-calendar:2": {
    kind: "batch",
    intro:
      "학사일정 작업의 맨 처음 단계입니다. 법정 공휴일을 학사일정에 자동으로 채워 넣습니다.",
    batchAction: "공휴일정보생성",
    batchPreview: [
      "삼일절 (3/1), 어린이날 (5/5), 부처님오신날 (5/24)",
      "현충일 (6/6), 광복절 (8/15)",
      "개천절·한글날·성탄절, 설·추석 연휴",
    ],
    batchNote: "반드시 이 작업을 먼저 실행한 뒤 임시공휴일·행사를 등록하고 기초시간표에 반영하세요.",
    result: [
      "법정 공휴일이 학사일정 달력에 '휴업일'로 자동 표시됩니다.",
      "이제 요일별 기준수업시수와 학교 행사·임시공휴일을 등록할 수 있습니다.",
    ],
    resultBadge: "공휴일 반영됨",
  },
  "l-academic-calendar:3": {
    kind: "grid",
    intro: "요일별 기준수업시수, 임시공휴일, 학교 행사를 등록합니다.",
    toolbar: ["조회", "행추가", "행삭제"],
    columns: [
      { key: "date", label: "일자", type: "date", sample: "2026-05-15" },
      { key: "kind", label: "구분", type: "select", options: ["행사", "임시공휴일", "휴업일", "재량휴업일"], sample: "행사" },
      { key: "name", label: "명칭", sample: "스승의 날 행사" },
      { key: "count", label: "수업일수 반영", type: "select", options: ["예", "아니오"], sample: "예" },
    ],
    seedRows: [{ date: "2026-05-01", kind: "재량휴업일", name: "재량휴업일", count: "아니오" }],
    sampleRow: { date: "2026-05-15", kind: "행사", name: "스승의 날 행사", count: "예" },
    result: [
      "등록한 일정이 학사 달력에 표시되고 수업일수 산정에 반영됩니다.",
      "임시공휴일·휴업일은 수업일수에서 빠지므로, 이후 시간표를 다시 반영해야 편차가 맞습니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-student-basic · 학생 기본신상 · 사진 · 주소 연계
  "l-student-basic:2": {
    kind: "form",
    intro:
      "주소가 바뀐 학생은 이전 주소를 지우지 말고 [누가주소등록]으로 이력을 남기며 수정합니다.",
    toolbar: ["조회", "누가주소등록"],
    fields: [
      { key: "student", label: "대상 학생", type: "select", options: STUDENTS_4_1, sample: "정시우" },
      { key: "addr", label: "새 주소", sample: "경기도 수원시 팔달구 권광로 99", full: true },
      { key: "date", label: "전입/변경일", type: "date", sample: "2026-04-01" },
      { key: "reason", label: "변경 사유", type: "select", options: ["전입", "이사", "행정정보 연계", "정정"], sample: "전입" },
    ],
    result: [
      "새 주소가 현재 주소로 저장되고, 이전 주소는 '누가주소' 이력으로 남습니다.",
      "생기부 학적사항의 주소 변경 이력에 반영됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-student-basic:3": {
    kind: "upload",
    intro:
      "학생 사진을 압축파일로 한꺼번에 올립니다. 파일명은 학번, 장당 200KB 이하여야 합니다.",
    fileKind: "이미지 ZIP",
    fileName: "4학년1반_사진.zip",
    result: [
      "사진이 학생별로 매칭되어 기본신상·명렬표·생기부에 표시됩니다.",
      "용량(200KB) 초과나 파일명 불일치 건은 목록에 '실패'로 표시되니 개별 보정합니다.",
    ],
    resultBadge: "5명 중 5명 등록",
  },
  "l-student-basic:4": {
    kind: "batch",
    intro:
      "행정정보공동이용시스템에서 주민등록 주소를 가져와 학생 주소와 대조·연계합니다.",
    batchAction: "행정정보공동이용 주소 연계",
    batchPreview: ["4학년 1반 5명 주민등록 주소 조회", "현재 주소와 불일치 건 표시", "생기부 누가반영 대상 선택"],
    result: [
      "주민등록 주소와 다른 학생이 목록에 표시됩니다 — 확인 후 [누가반영]하면 생기부에 반영됩니다.",
      "개인정보이므로 연계 결과는 담임·권한자만 조회할 수 있습니다.",
    ],
    resultBadge: "연계 완료",
  },

  // l-iep-setup · 개별화교육계획 대상자 등록 · 영역 개설
  "l-iep-setup:2": {
    kind: "form",
    intro:
      "특수교육대상자를 등록하고 배치·장애유형·행동특성·진단평가를 입력합니다.",
    toolbar: ["조회", "등록", "저장"],
    fields: [
      { key: "student", label: "대상 학생", type: "select", options: STUDENTS_4_1, sample: "정시우" },
      {
        key: "place",
        label: "배치 유형",
        type: "select",
        options: ["일반학급 전일제 통합", "특수학급(시간제)", "특수학교"],
        sample: "특수학급(시간제)",
      },
      {
        key: "type",
        label: "장애 유형",
        type: "select",
        options: ["지적장애", "자폐성장애", "학습장애", "의사소통장애", "정서·행동장애"],
        sample: "자폐성장애",
      },
      { key: "behavior", label: "행동 특성", type: "textarea", sample: "규칙적인 일과를 선호하며 변화에 민감함. 시각 자료 제시 시 집중도가 높음.", full: true },
      { key: "eval", label: "진단·평가 결과", type: "textarea", sample: "기초학습 기능검사 결과 읽기·쓰기 2학년 수준, 수 연산 3학년 수준.", full: true },
    ],
    result: [
      "학생이 특수교육대상자로 등록되어 개별화교육계획(IEP) 메뉴의 대상자 목록에 나타납니다.",
      "다음 단계에서 교육영역을 개설하고 월별 교육목표·평가를 입력할 수 있게 됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-iep-setup:3": {
    kind: "grid",
    intro: "생활지원·교과 영역을 개설하고 수강할 학생을 편성합니다.",
    toolbar: ["조회", "영역개설", "행추가"],
    columns: [
      { key: "area", label: "영역 구분", type: "select", options: ["생활지원", "교과"], sample: "교과" },
      { key: "name", label: "영역명", sample: "국어" },
      { key: "teacher", label: "담당교사", type: "select", options: ["조교사", "박교사"], sample: "조교사" },
      { key: "students", label: "수강학생", sample: "정시우" },
    ],
    seedRows: [{ area: "생활지원", name: "일상생활 적응", teacher: "조교사", students: "정시우" }],
    sampleRow: { area: "교과", name: "국어", teacher: "조교사", students: "정시우" },
    result: [
      "개설한 영역별로 월별 교육목표·교육내용·평가준거를 입력할 수 있게 됩니다.",
      "수강 편성된 학생만 해당 영역의 개별화교육계획 작성 대상이 됩니다.",
    ],
    resultBadge: "저장됨",
  },
};

/** 이 단계에 띄울 실습 화면 명세를 찾는다 (스텝에 직접 붙은 것 우선). */
export function getPracticeScreen(
  lessonId: string | undefined,
  step: TutorialStep
): PracticeScreen | undefined {
  if (step.practice) return step.practice;
  if (!lessonId || step.stepNumber == null) return undefined;
  return PRACTICE_SCREENS[`${lessonId}:${step.stepNumber}`];
}
