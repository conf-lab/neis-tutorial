// 브라우저 localStorage에 JSON 상태를 저장/복원하는 얇은 헬퍼.
// 시크릿 모드·저장 차단 환경에서도 throw 하지 않도록 모두 try/catch 처리한다.

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 저장 불가 환경은 무시 */
  }
}

export function removeKeys(...keys: string[]): void {
  try {
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* 무시 */
  }
}

export const STORAGE_KEYS = {
  students: "neis_students_v1",
  teachers: "neis_teachers_v1",
  approvals: "neis_approvals_v1",
  practice: "neis_practice_v1",
};
