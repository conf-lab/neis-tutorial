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

  // ─────────────────────────────────────────────────────────────
  // 2단계 · 학기 중 수시 업무
  // ─────────────────────────────────────────────────────────────

  // l-daily-attendance · 일일출결 입력 · 비고등록
  "l-daily-attendance:2": {
    kind: "form",
    activeStepBox: "일일출결관리",
    intro:
      "해당 날짜·학생 칸을 눌러 결석/지각/조퇴를 입력합니다. 결석은 질병·미인정·기타로 구분합니다.",
    toolbar: ["조회", "저장"],
    fields: [
      { key: "student", label: "학생", type: "select", options: STUDENTS_4_1, sample: "김하은" },
      { key: "date", label: "일자", type: "date", sample: "2026-05-12" },
      {
        key: "type",
        label: "출결 구분",
        type: "select",
        options: ["결석(질병)", "결석(미인정)", "결석(기타)", "지각", "조퇴", "결과"],
        sample: "결석(질병)",
      },
    ],
    result: [
      "일일출결부의 해당 칸이 선택한 구분으로 표시됩니다.",
      "월별 출결 마감 시 이 기록이 집계되어 재적 통계와 출결특기사항의 근거가 됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-daily-attendance:3": {
    kind: "form",
    activeStepBox: "일일출결관리",
    intro:
      "결석 사유는 보조장부인 '비고'에 함께 적어 두는 것이 좋습니다. 나중에 특기사항 작성과 감사 대비에 쓰입니다.",
    fields: [
      { key: "student", label: "학생", type: "select", options: STUDENTS_4_1, sample: "김하은" },
      { key: "date", label: "일자", type: "date", sample: "2026-05-12" },
      { key: "memo", label: "비고(사유)", type: "textarea", sample: "감기로 인한 질병결석. 보호자 확인 및 병원 진료확인서 제출.", full: true },
    ],
    result: [
      "비고(보조장부)에 사유가 기록되고 일일출결과 함께 저장됩니다.",
      "3일 이상 연속 결석이면 별도 관리 대상으로 표시됩니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-lesson-progress · 교과진도표 · 주간학습안내 · 결보강
  "l-lesson-progress:1": {
    kind: "batch",
    intro: "학기 교육과정을 바탕으로 교과별 진도표를 자동 생성합니다.",
    batchAction: "교과진도표 생성",
    batchPreview: [
      "2026-1학기 4학년 전 교과 진도표",
      "편제 시수 기준 차시 배분",
      "학사일정(수업일수) 반영",
    ],
    result: [
      "교과별 주차·차시별 진도표가 생성됩니다.",
      "[주간학습안내작성]에서 [진도표 불러오기]로 주간 계획을 만들 수 있게 됩니다.",
    ],
    resultBadge: "생성됨",
  },
  "l-lesson-progress:2": {
    kind: "grid",
    intro: "진도표를 불러와 이번 주 교과별 학습주제를 정리하고 안내장을 만듭니다.",
    toolbar: ["조회", "진도표 불러오기", "행추가", "출력"],
    columns: [
      { key: "subject", label: "교과", type: "select", options: ["국어", "수학", "사회", "과학", "영어"], sample: "국어" },
      { key: "hours", label: "차시", type: "number", sample: "4" },
      { key: "topic", label: "학습 주제", sample: "이야기의 흐름 파악하기" },
    ],
    seedRows: [{ subject: "수학", hours: "4", topic: "분수의 덧셈과 뺄셈" }],
    sampleRow: { subject: "국어", hours: "4", topic: "이야기의 흐름 파악하기" },
    result: [
      "이번 주 주간학습안내가 저장되고 출력·가정 안내가 가능해집니다.",
      "진도 실적은 교과진도표에 자동 반영됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-lesson-progress:3": {
    kind: "approve",
    intro:
      "교사 결강이 생기면 보강 교사와 시간을 지정해 결재로 올립니다.",
    docTitle: "결보강 처리 승인요청 (5/20 4교시 과학)",
    approvalLine: [
      { role: "기안(담당)", name: "강교사" },
      { role: "교무부장", name: "최교사" },
      { role: "교감", name: "윤교감" },
    ],
    result: [
      "결보강 문서가 상신되어 '결재중'이 됩니다.",
      "완결되면 결강·보강 시수가 복무·시간표 실적에 반영됩니다.",
    ],
    resultBadge: "결재중",
  },

  // l-changche-log · 창의적체험활동 누가기록
  "l-changche-log:2": {
    kind: "form",
    intro:
      "자율·자치활동과 진로활동의 누가기록을 활동일자별로 남깁니다. (자율·자치·진로는 생기부 연동, 동아리는 비연동)",
    toolbar: ["조회", "저장"],
    fields: [
      { key: "area", label: "영역", type: "select", options: ["자율·자치활동", "진로활동"], sample: "자율·자치활동" },
      { key: "date", label: "활동일자", type: "date", sample: "2026-05-08" },
      { key: "target", label: "대상", type: "select", options: ["학급 전체", "모둠", "개인"], sample: "학급 전체" },
      { key: "content", label: "활동 내용", type: "textarea", sample: "학급 규칙 제정을 위한 학급회의를 진행하며 의견을 조율하고 다수결로 결정하는 과정을 경험함.", full: true },
    ],
    result: [
      "누가기록이 활동일자순으로 쌓입니다.",
      "[학생부자료기록]에서 반영하면 생기부 창의적체험활동 자율·진로 영역에 자동 연동됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-changche-log:3": {
    kind: "batch",
    intro: "쌓인 누가기록을 확인하고 생기부에 반영합니다.",
    batchAction: "학생부자료기록 반영",
    batchPreview: ["자율·자치활동 누가기록 → 생기부", "진로활동 누가기록 → 생기부", "봉사활동 실적 연계"],
    result: [
      "자율·자치·진로활동 특기사항이 생기부 창의적체험활동 영역에 반영됩니다.",
      "동아리활동은 비연동이므로 학기 말 {동아리특기사항가져오기}를 따로 실행해야 합니다.",
    ],
    resultBadge: "반영됨",
  },

  // l-club-log · 동아리활동 누가기록
  "l-club-log:2": {
    kind: "form",
    activeStepBox: "동아리활동관리",
    intro: "동아리담임이 활동일자별 누가기록과 특기사항을 입력합니다.",
    toolbar: ["조회", "저장"],
    fields: [
      { key: "club", label: "동아리", type: "select", options: ["로봇코딩부", "어린이방송부", "환경지킴이부", "창의미술부", "배드민턴부"], sample: "로봇코딩부" },
      { key: "date", label: "활동일자", type: "date", sample: "2026-05-14" },
      { key: "content", label: "활동 내용", type: "textarea", sample: "라인트레이서 센서 값을 읽어 조건에 따라 방향을 바꾸는 블록 코딩을 완성하고 시연함.", full: true },
      { key: "remark", label: "특기사항", type: "textarea", sample: "센서 동작 원리를 정확히 이해하고 오류 상황을 스스로 디버깅하는 문제해결력이 돋보임.", full: true, optional: true },
    ],
    result: [
      "동아리 누가기록이 쌓여 학기 말 특기사항의 원본이 됩니다.",
      "동아리활동은 생기부 비연동이므로, 학기 말 [학생부자료기록]에서 {동아리특기사항가져오기}가 필요합니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-awards · 수상대장 관리 · 상장 출력
  "l-awards:2": {
    kind: "form",
    intro: "상장번호 채번 규칙을 정합니다. 초등학교는 보통 자동채번3(학년도-학년-번호)을 씁니다.",
    fields: [
      { key: "rule", label: "채번 방식", type: "select", options: ["자동채번3 (학년도-학년-번호)", "자동채번1 (연번)", "수동입력"], sample: "자동채번3 (학년도-학년-번호)" },
      { key: "start", label: "시작 번호", type: "number", sample: "1" },
    ],
    result: [
      "이후 수상대장을 등록하면 상장번호가 규칙에 따라 자동으로 매겨집니다.",
      "2019학년도부터 교내 수상경력은 생기부에 반영되지 않고 대장으로만 관리됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-awards:3": {
    kind: "grid",
    intro: "수상 내역을 대장에 등록합니다. 상장번호는 저장 시 자동 부여됩니다.",
    toolbar: ["조회", "행추가", "상장출력"],
    columns: [
      { key: "name", label: "수상명", sample: "교내 독서골든벨 최우수" },
      { key: "date", label: "수여일", type: "date", sample: "2026-05-30" },
      { key: "student", label: "대상 학생", type: "select", options: STUDENTS_4_1, sample: "김하은" },
      { key: "rank", label: "등급", sample: "최우수(1위)" },
    ],
    seedRows: [{ name: "교내 사생대회 우수", date: "2026-04-25", student: "이지유", rank: "우수" }],
    sampleRow: { name: "교내 독서골든벨 최우수", date: "2026-05-30", student: "김하은", rank: "최우수(1위)" },
    result: [
      "수상대장에 기록되고 상장번호(2026-4-00N)가 자동 부여됩니다.",
      "[상장출력]으로 상장 서식을 인쇄할 수 있습니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-behavior-log · 행동특성 및 종합의견 누가기록
  "l-behavior-log:2": {
    kind: "form",
    intro: "학생별 행동 관찰 내용을 수시로 누가기록합니다. 이 기록이 학기 말 종합의견 문장의 근거가 됩니다.",
    toolbar: ["조회", "저장"],
    fields: [
      { key: "student", label: "학생", type: "select", options: STUDENTS_4_1, sample: "박도윤" },
      { key: "date", label: "관찰일자", type: "date", sample: "2026-05-20" },
      { key: "content", label: "관찰 내용", type: "textarea", sample: "과학 실험에서 변인을 스스로 통제하며 결과를 기록하고, 모둠원에게 절차를 차분히 설명함.", full: true },
    ],
    result: [
      "관찰 누가기록이 날짜순으로 쌓입니다.",
      "학기 말 [행동특성 및 종합의견]에서 이 기록을 불러와 종합의견 문장을 작성합니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-school-violence · 학교폭력 조치상황 관리
  "l-school-violence:2": {
    kind: "form",
    intro:
      "2026학년도는 1·2·3학년만 이 메뉴에 입력합니다. 4~6학년은 학적사항·출결 특기사항 및 행동특성에 분리 기재합니다.",
    toolbar: ["조회", "등록", "저장"],
    fields: [
      { key: "grade", label: "대상 학년", type: "select", options: ["1학년", "2학년", "3학년"], sample: "3학년" },
      { key: "student", label: "학생", sample: "3학년 2반 05번" },
      { key: "date", label: "조치일자", type: "date", sample: "2026-06-03" },
      {
        key: "measure",
        label: "조치 결정사항",
        type: "select",
        options: ["제1호 서면사과", "제2호 접촉·협박·보복 금지", "제3호 학교봉사", "제4호 사회봉사", "제5호 특별교육", "제6호 출석정지", "제7호 학급교체"],
        sample: "제1호 서면사과",
      },
    ],
    result: [
      "학교폭력 조치사항이 전용 메뉴에 기록됩니다(1~3학년).",
      "4~6학년 사안은 이 메뉴가 아니라 관련 특기사항 항목에 나눠 적어야 합니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-observation · 관찰내용 관리 (나이스플러스 연계)
  "l-observation:2": {
    kind: "form",
    intro: "수업·평가 장면의 관찰기록을 남기거나, 나이스플러스에서 자료를 가져옵니다.",
    toolbar: ["조회", "나이스플러스 가져오기", "저장"],
    fields: [
      { key: "student", label: "학생", type: "select", options: STUDENTS_4_1, sample: "강민우" },
      { key: "subject", label: "교과", type: "select", options: ["국어", "수학", "사회", "과학", "영어"], sample: "수학" },
      { key: "scene", label: "관찰 장면", sample: "분수 나눗셈 문제해결 발표", optional: true },
      { key: "content", label: "관찰 내용", type: "textarea", sample: "분수를 소수로 바꾸는 여러 방법을 비교하고, 가장 효율적인 방법을 근거를 들어 설명함.", full: true },
    ],
    result: [
      "관찰기록이 학생·교과별로 축적됩니다.",
      "교과평가와 학기말 종합의견 작성 시 [참고자료조회]로 불러와 활용할 수 있습니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-parent-service · 학부모서비스 승인관리
  "l-parent-service:2": {
    kind: "batch",
    intro: "학부모 나이스 서비스 신청 건을 확인하고 본인확인이 된 건을 일괄 승인합니다.",
    batchAction: "일괄승인",
    batchPreview: [
      "강민우 보호자 (본인확인 완료)",
      "박도윤 보호자 (본인확인 완료)",
      "이지유 보호자 (본인확인 완료)",
    ],
    batchNote: "본인확인이 안 된 신청은 승인하지 말고 별도 확인 후 처리합니다.",
    result: [
      "승인된 보호자는 자녀의 성적·출결·생기부를 학부모서비스에서 조회할 수 있게 됩니다.",
      "승인 거부한 건은 사유와 함께 신청자에게 통지됩니다.",
    ],
    resultBadge: "3건 승인",
  },

  // l-iep-monthly · 개별화교육계획 월별 목표 · 평가
  "l-iep-monthly:2": {
    kind: "form",
    intro: "학기별·월별 교육목표와 교육내용, 평가준거를 작성합니다.",
    fields: [
      { key: "student", label: "대상 학생", type: "select", options: STUDENTS_4_1, sample: "정시우" },
      { key: "month", label: "해당 월", type: "select", options: ["3월", "4월", "5월", "6월", "7월"], sample: "5월" },
      { key: "goal", label: "교육 목표", type: "textarea", sample: "받침 있는 글자를 정확히 읽고 쓸 수 있다.", full: true },
      { key: "content", label: "교육 내용", type: "textarea", sample: "받침 카드 짝짓기, 낱말 받아쓰기, 짧은 문장 만들기 활동.", full: true },
      { key: "criteria", label: "평가 준거", type: "textarea", sample: "받침 있는 낱말 10개 중 8개 이상 정확히 읽고 쓴다.", full: true },
    ],
    result: [
      "월별 개별화교육계획이 저장됩니다.",
      "작성이 끝나면 다음 단계에서 [마감] 후 [승인요청]으로 상신합니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-iep-monthly:3": {
    kind: "close",
    thenApprove: true,
    closeUnit: "개별화교육계획 (5월)",
    intro: "작성이 끝난 월별 계획을 마감하고 결재로 올립니다.",
    closeChecklist: [
      "월별 교육목표·교육내용·평가준거를 모두 입력했습니다.",
      "담당 특수교사 검토를 마쳤습니다.",
    ],
    approvalLine: [
      { role: "기안(특수교사)", name: "조교사" },
      { role: "교감", name: "윤교감" },
      { role: "교장", name: "한교장" },
    ],
    result: [
      "해당 월 개별화교육계획이 마감되어 잠기고, 승인요청 문서가 상신됩니다.",
      "완결되면 보호자에게 개별화교육계획이 안내됩니다.",
    ],
    resultBadge: "마감 · 결재중",
  },

  // ─────────────────────────────────────────────────────────────
  // 4단계 · 학기 말 마감
  // ─────────────────────────────────────────────────────────────

  // l-subject-eval · 교과평가 입력
  "l-subject-eval:2": {
    kind: "grid",
    intro:
      "학년·교과·평가영역을 선택한 뒤 학생별 성취기준 도달 단계를 입력합니다. (매우잘함/잘함/보통/노력요함 4단계)",
    toolbar: ["조회", "일괄복사", "저장"],
    columns: [
      { key: "student", label: "학생", sample: "강민우" },
      {
        key: "level",
        label: "도달 단계",
        type: "select",
        options: ["매우잘함", "잘함", "보통", "노력요함"],
        sample: "매우잘함",
      },
    ],
    seedRows: [
      { student: "강민우", level: "" },
      { student: "김하은", level: "" },
      { student: "박도윤", level: "" },
      { student: "이지유", level: "" },
      { student: "정시우", level: "" },
    ],
    minRows: 5,
    result: [
      "학생별 교과평가 결과가 저장됩니다.",
      "다음 단계 [학생/학부모서비스 반영]을 실행해야 학생·보호자가 결과를 볼 수 있습니다.",
      "이 결과는 학기말 종합의견·교과학습발달상황의 바탕이 됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-subject-eval:3": {
    kind: "batch",
    intro: "입력한 교과평가 결과를 학생·학부모서비스에 공개합니다.",
    batchAction: "학생/학부모서비스 반영",
    batchPreview: ["4학년 1반 전 교과 평가결과", "성취기준별 도달 단계", "교과별 평어"],
    result: [
      "학생과 보호자가 학부모서비스에서 교과평가 결과를 조회할 수 있게 됩니다.",
      "반영 후 결과를 고치면 다시 반영해야 최신 내용이 공개됩니다.",
    ],
    resultBadge: "반영됨",
  },

  // l-term-opinion · 학기말 종합의견 작성
  "l-term-opinion:2": {
    kind: "batch",
    intro: "교과평가와 관찰기록을 불러와 종합의견 초안을 만듭니다.",
    batchAction: "참고자료 가져오기",
    batchPreview: [
      "교과평가 평어 (국어·수학·사회·과학)",
      "관찰내용관리 누가기록",
      "교과평가 일괄복사 문구",
    ],
    result: [
      "학생별 참고자료가 종합의견 입력란에 초안으로 채워집니다.",
      "초안을 그대로 두지 말고 학생 개별 특성에 맞게 문장을 다듬어야 합니다.",
    ],
    resultBadge: "불러옴",
  },
  "l-term-opinion:3": {
    kind: "form",
    intro: "학생별 문장을 다듬고 맞춤법 검사를 한 뒤 저장합니다.",
    toolbar: ["조회", "맞춤법검사", "저장"],
    fields: [
      { key: "student", label: "학생", type: "select", options: STUDENTS_4_1, sample: "강민우" },
      {
        key: "opinion",
        label: "학기말 종합의견",
        type: "textarea",
        sample: "자신의 생각을 논리적으로 표현하고 친구의 의견을 경청하며, 수학적 문제 상황에서 다양한 해결 전략을 스스로 탐구하는 태도가 우수함.",
        full: true,
      },
    ],
    result: [
      "학생별 종합의견 문장이 저장됩니다.",
      "다음 단계에서 [교과학습발달상황 일괄저장]으로 생기부에 반영합니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-learning-dev · 교과학습발달상황 생기부 반영
  "l-learning-dev:2": {
    kind: "batch",
    intro: "학기말 종합의견을 교과학습발달상황으로 통합 기록해 생기부에 반영합니다.",
    batchAction: "학기말종합의견 일괄저장",
    batchPreview: ["4학년 1반 5명 종합의견", "교과학습발달상황 항목으로 통합", "생기부 반영 대기 → 반영"],
    result: [
      "종합의견이 생기부 교과학습발달상황 영역으로 저장됩니다.",
      "이후 자료검증에서 이 항목의 누락 여부가 점검됩니다.",
    ],
    resultBadge: "반영됨",
  },

  // l-autonomous-eval · 학교자율시간 학생평가 · 종합의견
  "l-autonomous-eval:2": {
    kind: "grid",
    intro: "학교자율시간 과목(활동)의 평가결과와 종합의견을 입력하고 교과학습발달상황에 연계합니다.",
    toolbar: ["조회", "저장"],
    columns: [
      { key: "student", label: "학생", sample: "강민우" },
      { key: "level", label: "평가결과", type: "select", options: ["매우잘함", "잘함", "보통", "노력요함"], sample: "매우잘함" },
      { key: "opinion", label: "종합의견(요약)", sample: "정보윤리를 실천하며 협업을 주도함" },
    ],
    seedRows: [
      { student: "강민우", level: "", opinion: "" },
      { student: "김하은", level: "", opinion: "" },
    ],
    minRows: 2,
    result: [
      "학교자율시간 '디지털 민주시민(활동)' 평가가 저장됩니다.",
      "교과학습발달상황에 연계 반영되어 생기부의 별도 항목으로 기재됩니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-attendance-special · 출결특기사항 (개근 일괄입력)
  "l-attendance-special:2": {
    kind: "batch",
    activeStepBox: "출결특기사항등록",
    intro: "결석·지각·조퇴가 없는 학생에게 '개근'을 한 번에 입력한 뒤, 개별 특기사항을 보완합니다.",
    batchAction: "개근 일괄입력",
    batchPreview: [
      "강민우 · 박도윤 (결석·지각·조퇴 0) → '개근'",
      "김하은 (질병결석 2) → 개근 제외, 개별 특기사항 필요",
      "정시우 (지각 1) → 개근 제외",
    ],
    result: [
      "출결이 완전한 학생에게 '개근'이 일괄 입력됩니다.",
      "개근이 아닌 학생은 결석·지각 사유를 특기사항에 개별 입력해야 합니다.",
      "출결특기사항이 완성되면 생기부 출결상황 영역이 확정됩니다.",
    ],
    resultBadge: "개근 3명 입력",
  },

  // l-changche-special · 창체 특기사항 정리 · 동아리특기사항 가져오기
  "l-changche-special:2": {
    kind: "batch",
    intro:
      "동아리활동 특기사항은 생기부에 자동 연동되지 않습니다. 이 버튼으로 동아리담임이 입력한 특기사항을 생기부로 가져와야 합니다.",
    batchAction: "동아리특기사항가져오기",
    batchPreview: ["로봇코딩부 · 어린이방송부 · 환경지킴이부 등 부서별 특기사항", "부서원별 매칭 → 생기부 동아리활동 영역"],
    result: [
      "동아리담임이 입력한 특기사항이 생기부 창의적체험활동 동아리활동 영역으로 복사됩니다.",
      "이 작업을 빠뜨리면 동아리활동 칸이 비어 감사 지적을 받습니다.",
    ],
    resultBadge: "가져옴",
  },
  "l-changche-special:3": {
    kind: "close",
    closeUnit: "생기부 창의적체험활동",
    primaryAction: "저장",
    intro: "자율·자치·진로·동아리 4개 영역이 모두 채워졌는지 확인하고 저장합니다.",
    closeChecklist: [
      "자율·자치활동 특기사항이 반영되었습니다.",
      "진로활동 특기사항이 반영되었습니다.",
      "동아리활동 특기사항을 {동아리특기사항가져오기}로 가져왔습니다.",
    ],
    result: [
      "창의적체험활동 4개 영역이 모두 생기부에 반영됩니다.",
      "이후 자료검증에서 빈 영역이 없는지 다시 확인합니다.",
    ],
    resultBadge: "저장됨",
  },

  // l-behavior-opinion · 행동특성 및 종합의견 완성
  "l-behavior-opinion:2": {
    kind: "form",
    intro: "누가기록 연계 자료를 참고해 학생별 종합의견을 작성하고 맞춤법 검사를 실행합니다.",
    toolbar: ["조회", "누가기록 불러오기", "맞춤법검사", "훈령정보조회"],
    fields: [
      { key: "student", label: "학생", type: "select", options: STUDENTS_4_1, sample: "박도윤" },
      {
        key: "opinion",
        label: "행동특성 및 종합의견",
        type: "textarea",
        sample: "호기심이 많고 탐구적인 자세로 새로운 과제에 도전하며, 실험 과정에서 끈기 있게 결과를 확인함. 급우들에게 절차를 차분히 설명하는 배려심이 돋보임.",
        full: true,
      },
    ],
    result: [
      "학생별 행동특성 및 종합의견 문장이 저장됩니다.",
      "맞춤법 검사에서 걸린 표현은 저장 전에 다듬는 것이 좋습니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-behavior-opinion:3": {
    kind: "batch",
    intro: "작성한 종합의견을 생기부에 반영합니다.",
    batchAction: "학생부반영기록 저장",
    batchPreview: ["4학년 1반 5명 행동특성 및 종합의견", "생기부 '행동특성 및 종합의견' 영역 반영"],
    result: [
      "행동특성 및 종합의견이 생기부에 반영됩니다.",
      "반영 후 수정하면 다시 저장해야 생기부에 최신 문장이 들어갑니다.",
    ],
    resultBadge: "반영됨",
  },

  // l-health-record · 건강기록부 반별 등록
  "l-health-record:2": {
    kind: "batch",
    intro: "학급 학생을 건강기록부에 올려 입력 준비를 합니다.",
    batchAction: "인적사항생성",
    batchPreview: ["4학년 1반 5명 → 건강기록부 명단", "예방접종·신체발달·PAPS·검진 입력칸 생성"],
    result: [
      "학급 학생이 건강기록부에 등록되어 항목별 입력이 가능해집니다.",
      "전입생 등 누락 학생은 개별로 추가합니다.",
    ],
    resultBadge: "5명 생성",
  },
  "l-health-record:3": {
    kind: "grid",
    intro: "키·몸무게를 입력하면 BMI가 자동 계산됩니다. PAPS 등급과 건강검진 결과도 입력합니다.",
    toolbar: ["조회", "PAPS 불러오기", "저장"],
    columns: [
      { key: "student", label: "학생", sample: "강민우" },
      { key: "height", label: "키(cm)", type: "number", sample: "139.5" },
      { key: "weight", label: "몸무게(kg)", type: "number", sample: "34.2" },
      { key: "paps", label: "PAPS 등급", type: "select", options: ["1등급", "2등급", "3등급", "4등급", "5등급"], sample: "1등급" },
      { key: "checkup", label: "검진일", type: "date", sample: "2026-04-18" },
    ],
    seedRows: [
      { student: "강민우", height: "", weight: "", paps: "", checkup: "" },
      { student: "김하은", height: "", weight: "", paps: "", checkup: "" },
    ],
    minRows: 2,
    result: [
      "신체발달 항목이 저장되고 키·몸무게로 BMI가 자동 계산됩니다.",
      "다음 단계 [자료검증]에서 누락·이상치를 점검합니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-health-record:4": {
    kind: "batch",
    intro: "건강기록부 입력값의 누락·오류를 자동 점검합니다.",
    batchAction: "자료검증",
    batchPreview: ["예방접종 미입력 여부", "신체발달 이상치(키/몸무게)", "PAPS·검진 누락 여부"],
    result: [
      "'확인필요' 항목 목록이 표시됩니다 — 보완해야 반마감이 가능합니다.",
      "검증을 통과하면 다음 주제에서 반마감·학년마감을 진행합니다.",
    ],
    resultBadge: "검증 완료",
  },

  // l-health-close · 건강기록부 반마감 · 학년마감
  "l-health-close:2": {
    kind: "close",
    closeUnit: "우리 반 건강기록부 (4학년 1반)",
    intro: "검증을 통과한 학급 건강기록부를 반마감합니다.",
    closeChecklist: [
      "예방접종·신체발달·PAPS·건강검진을 모두 입력했습니다.",
      "[자료검증] 결과 '확인필요' 항목이 없습니다.",
    ],
    result: [
      "우리 반 건강기록부가 마감되어 잠깁니다.",
      "학년 내 모든 반이 반마감되면 [학년 전체마감]을 할 수 있습니다.",
    ],
    resultBadge: "반마감",
  },
  "l-health-close:3": {
    kind: "close",
    thenApprove: true,
    closeUnit: "4학년 전체 건강기록부",
    intro: "모든 반이 반마감되면 학년 전체를 마감하고 승인요청을 상신합니다.",
    closeChecklist: ["4학년 전체 학급이 반마감되었습니다."],
    approvalLine: [
      { role: "기안(담당)", name: "박교사" },
      { role: "보건교사", name: "보건교사" },
      { role: "교감", name: "윤교감" },
      { role: "교장", name: "한교장" },
    ],
    result: [
      "4학년 건강기록부가 학년마감되고 승인요청 문서가 상신됩니다.",
      "완결되면 생기부와 함께 확정되고, 졸업생은 상급학교 전송 대상이 됩니다.",
    ],
    resultBadge: "학년마감 · 결재중",
  },

  // l-record-close · 학생부 학년 전체마감 및 승인요청
  "l-record-close:3": {
    kind: "close",
    thenApprove: true,
    closeUnit: "4학년 학교생활기록부",
    intro: "학년 내 모든 반이 마감되면 학년 전체를 마감하고 관리자에게 승인요청을 상신합니다.",
    closeChecklist: [
      "4학년 전체 학급이 반마감되었습니다.",
      "자료검증 '확인필요' 항목이 모두 해결되었거나 예외처리되었습니다.",
      "학생별 세부사항을 최종 확인했습니다.",
    ],
    approvalLine: [
      { role: "기안(학년부장)", name: "박교사" },
      { role: "교무부장", name: "최교사" },
      { role: "교감", name: "윤교감" },
      { role: "교장", name: "한교장" },
    ],
    result: [
      "4학년 생기부가 학년마감되어 결재 라인에 올라갑니다.",
      "완결되면 해당 학년 생기부가 최종 확정되고, 이후 수정은 정정대장(4단 결재)으로만 가능합니다.",
    ],
    resultBadge: "학년마감 · 결재중",
  },

  // l-report-card · 생활통지표 등록 · 반영 · 마감
  "l-report-card:1": {
    kind: "form",
    activeStepBox: "통지표 등록",
    intro: "통지표 표지와 학교 교육목표를 설정합니다.",
    fields: [
      { key: "title", label: "통지표 제목", sample: "2026학년도 1학기 생활통지표" },
      { key: "goal", label: "학교 교육목표", type: "textarea", sample: "배움을 즐기고 서로를 존중하는 어린이", full: true },
      { key: "cover", label: "표지 안내 문구", sample: "가정에서 자녀와 함께 읽어 주세요.", optional: true, full: true },
    ],
    result: [
      "통지표 서식이 만들어져 다음 단계에서 자료를 반영할 수 있게 됩니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-report-card:2": {
    kind: "batch",
    activeStepBox: "자료반영 및 마감관리",
    intro: "여러 메뉴에 입력한 자료를 통지표로 모아 넣습니다.",
    batchAction: "전체반영",
    batchPreview: ["교과평가 결과", "출결 현황", "창의적체험활동 특기사항", "행동특성 및 종합의견"],
    result: [
      "흩어진 자료가 통지표 양식에 채워집니다.",
      "이후 항목을 고치면 다시 [전체반영]해야 통지표에 반영됩니다.",
    ],
    resultBadge: "반영됨",
  },
  "l-report-card:3": {
    kind: "form",
    intro: "학생별 개인통신문(담임 개별 메시지)을 작성합니다.",
    toolbar: ["조회", "맞춤법검사", "저장"],
    fields: [
      { key: "student", label: "학생", type: "select", options: STUDENTS_4_1, sample: "이지유" },
      { key: "message", label: "개인통신문", type: "textarea", sample: "예술적 감수성이 풍부하고 친구를 배려하는 마음이 따뜻합니다. 2학기에는 발표에 조금 더 자신감을 가지면 좋겠습니다.", full: true },
    ],
    result: ["학생별 개인통신문이 통지표에 포함됩니다."],
    resultBadge: "저장됨",
  },
  "l-report-card:4": {
    kind: "close",
    activeStepBox: "통지표 마감",
    closeUnit: "우리 반 통지표",
    thenApprove: false,
    intro: "반마감 후 학기별 통지표 마감을 실행합니다.",
    closeChecklist: [
      "전체반영을 실행해 통지표에 자료가 채워졌습니다.",
      "개인통신문을 모두 작성했습니다.",
    ],
    result: [
      "통지표가 반마감·학기마감되어 출력·배부할 수 있습니다.",
      "마감 후 자료가 바뀌면 마감취소 후 다시 반영·마감해야 합니다.",
    ],
    resultBadge: "마감",
  },

  // l-career-transfer · 진로정보 관리 · 중학교 전송 (6학년)
  "l-career-transfer:2": {
    kind: "grid",
    intro: "6학년 학생·보호자의 개인정보 제공 동의서를 등록하고 동의여부를 마감합니다.",
    toolbar: ["조회", "행추가", "동의여부 마감"],
    columns: [
      { key: "student", label: "학생", sample: "6학년 1반 01번" },
      { key: "agree", label: "개인정보 제공 동의", type: "select", options: ["동의", "미동의"], sample: "동의" },
      { key: "guardian", label: "보호자 확인", type: "select", options: ["확인", "미확인"], sample: "확인" },
    ],
    seedRows: [{ student: "6학년 1반 02번", agree: "동의", guardian: "확인" }],
    sampleRow: { student: "6학년 1반 01번", agree: "동의", guardian: "확인" },
    result: [
      "동의여부가 저장되고 마감됩니다.",
      "'동의' 건만 다음 단계에서 중학교로 전송할 수 있습니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-career-transfer:3": {
    kind: "approve",
    intro: "사전승인을 받은 뒤 진로정보를 진학 중학교로 전송합니다.",
    docTitle: "6학년 진로정보 중학교 전송 사전승인",
    approvalLine: [
      { role: "기안(담당)", name: "최교사" },
      { role: "교감", name: "윤교감" },
      { role: "교장", name: "한교장" },
    ],
    result: [
      "사전승인 문서가 상신됩니다.",
      "완결되면 [중학교 전송]이 활성화되어 동의한 학생의 진로정보가 배정 중학교로 넘어갑니다.",
    ],
    resultBadge: "결재중",
  },

  // ─────────────────────────────────────────────────────────────
  // 5단계 · 학년 말 처리
  // ─────────────────────────────────────────────────────────────

  // l-graduation · 졸업 처리
  "l-graduation:2": {
    kind: "batch",
    activeStepBox: "졸업대상자생성",
    intro: "졸업 요건을 갖춘 6학년을 졸업대상자로 만듭니다. 조기졸업자를 먼저 처리합니다.",
    batchAction: "졸업대상자생성",
    batchPreview: ["6학년 전체 재학생", "수료 요건(수업일수) 충족 확인", "조기졸업자 선처리"],
    batchNote: "졸업 전에 6학년 생기부·건강기록부 마감이 완료되어 있어야 합니다.",
    result: [
      "6학년이 졸업대상자 목록에 오릅니다.",
      "다음 단계에서 졸업장 번호부여·출력, 졸업생 학적반영을 진행합니다.",
    ],
    resultBadge: "대상자 생성",
  },
  "l-graduation:3": {
    kind: "form",
    activeStepBox: "졸업장번호부여",
    intro: "졸업장에 일련번호를 부여하고 졸업장을 출력합니다.",
    fields: [
      { key: "start", label: "졸업장 시작번호", sample: "제2026-001호" },
      { key: "date", label: "졸업일자", type: "date", sample: "2027-01-05" },
      { key: "form", label: "출력 양식", type: "select", options: ["표준 양식", "학교 자체 양식"], sample: "표준 양식" },
    ],
    result: [
      "졸업대상자에게 졸업장 번호가 순서대로 부여됩니다.",
      "[졸업장출력]으로 졸업장을 인쇄할 수 있습니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-graduation:4": {
    kind: "batch",
    activeStepBox: "졸업생학적반영",
    intro: "6학년을 졸업 상태로 학적에 확정합니다. 되돌리기가 매우 어렵습니다.",
    batchAction: "졸업생 학적반영",
    batchPreview: ["6학년 졸업대상자 전체", "학적상태: 재학 → 졸업", "졸업일자 확정"],
    batchNote: "졸업생 학적반영은 1~5학년 진급자 학적반영보다 반드시 먼저 해야 학적 충돌이 없습니다!",
    result: [
      "6학년이 '졸업' 상태로 확정되고 재적에서 빠집니다.",
      "이제 1~5학년 진급 처리를 진행할 수 있습니다.",
    ],
    resultBadge: "졸업 확정",
  },

  // l-promotion · 진급자 반편성 및 학적반영
  "l-promotion:2": {
    kind: "batch",
    activeStepBox: "대상자생성",
    intro: "새 학년도 진급대상자 명단을 만듭니다. 유급·조기진급자를 먼저 처리합니다.",
    batchAction: "진급대상자생성",
    batchPreview: ["1~5학년 재학생 → 다음 학년 진급대상", "유급·조기진급자 선처리 대상 표시"],
    result: [
      "진급대상자 명단이 만들어져 반편성을 할 수 있게 됩니다.",
      "졸업생 학적반영이 끝난 뒤여야 6학년 자리 충돌이 없습니다.",
    ],
    resultBadge: "대상자 생성",
  },
  "l-promotion:3": {
    kind: "grid",
    activeStepBox: "일괄반편성",
    intro: "진급대상 학생을 새 학년의 각 반에 배정합니다. [일괄반편성] 또는 개별 조정을 씁니다.",
    toolbar: ["조회", "일괄반편성", "행추가"],
    columns: [
      { key: "student", label: "학생 (현재)", sample: "3학년 1반 강민우" },
      { key: "newclass", label: "새 학년·반", sample: "4학년 2반" },
    ],
    seedRows: [{ student: "3학년 1반 김하은", newclass: "4학년 1반" }],
    sampleRow: { student: "3학년 1반 강민우", newclass: "4학년 2반" },
    result: [
      "새 학년도 반 구성이 저장됩니다.",
      "반편성이 끝나면 [반번호부여]로 출석번호를 정합니다.",
    ],
    resultBadge: "저장됨",
  },
  "l-promotion:4": {
    kind: "batch",
    activeStepBox: "반번호부여",
    intro: "새로 편성된 반의 학생 출석번호를 정합니다.",
    batchAction: "반번호부여",
    batchPreview: ["새 학급별 학생 정렬(성명 가나다 또는 생년월일)", "출석번호 1번부터 부여"],
    result: ["새 학급의 학생 출석번호가 부여됩니다.", "결과를 조회해 이상이 없는지 확인합니다."],
    resultBadge: "번호 부여됨",
  },
  "l-promotion:5": {
    kind: "batch",
    activeStepBox: "진급자학적반영",
    intro: "진급을 학적에 최종 확정합니다.",
    batchAction: "진급자 학적반영",
    batchPreview: ["6학년(졸업반영 완료) → 5 → 4 → 3 → 2 → 1학년 순서", "학년·반·번호 확정"],
    batchNote: "반드시 6→5→4→3→2→1학년 순서로 실행해야 학적 충돌이 없습니다.",
    result: [
      "1~5학년이 다음 학년으로 진급하고 새 반이 확정됩니다.",
      "학적반영 후에는 되돌리기가 매우 어렵습니다.",
    ],
    resultBadge: "진급 확정",
  },

  // l-middle-school · 중학교 진학학교 확인 · 사전승인
  "l-middle-school:2": {
    kind: "batch",
    intro: "교육지원청의 중학교 배정 결과를 확인하고 학생자료를 사전 일괄승인합니다.",
    batchAction: "사전일괄승인",
    batchPreview: ["6학년 졸업생별 배정 중학교", "학생 인적·학적 자료 확인", "전송 대상 승인"],
    result: [
      "졸업생의 중학교 진학 자료가 승인되어 전송 준비가 끝납니다.",
      "생기부·건강기록부는 각 메뉴에서 별도로 전송 승인해야 합니다.",
    ],
    resultBadge: "승인 완료",
  },

  // l-health-transfer · 건강기록부 상급학교 전송
  "l-health-transfer:2": {
    kind: "approve",
    intro: "마감된 건강기록부를 진학 중학교로 사전승인 후 전송합니다.",
    docTitle: "졸업생 건강기록부 중학교 전송 사전승인",
    approvalLine: [
      { role: "기안(보건)", name: "보건교사" },
      { role: "교감", name: "윤교감" },
      { role: "교장", name: "한교장" },
    ],
    result: [
      "전송 사전승인 문서가 상신됩니다.",
      "완결되면 졸업생 건강기록부가 배정 중학교로 이관됩니다.",
    ],
    resultBadge: "결재중",
  },

  // l-iep-transfer · 개별화교육계획 전송관리
  "l-iep-transfer:2": {
    kind: "approve",
    intro: "상급학교(중학교)로 특수교육대상자의 개별화교육계획을 전송 승인합니다.",
    docTitle: "개별화교육계획 상급학교 전송 승인",
    approvalLine: [
      { role: "기안(특수교사)", name: "조교사" },
      { role: "교감", name: "윤교감" },
      { role: "교장", name: "한교장" },
    ],
    result: [
      "전송 승인 문서가 상신됩니다.",
      "완결되면 특수교육대상자의 개별화교육계획이 진학 학교로 인계됩니다.",
    ],
    resultBadge: "결재중",
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
