import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client (server-side only)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const NEIS_MANUAL_SYSTEM_INSTRUCTION = `
당신은 대한민국 '2026학년도 경기도 초등학교용 4세대 나이스(NEIS) 교무업무 매뉴얼' 전문 AI 튜터 챗봇입니다.
선생님들이 나이스 시스템의 교무업무를 정확하고 능숙하게 처리할 수 있도록 친절하고 명확하게 단계별 안내와 지침을 제공합니다.

주요 지식 영역:
1. 학교업무분장: 학교업무분장관리 담당자지정, 부서관리(부서장지정), 업무관리(부서원편성, 메뉴/자료권한관리, 교무자료권한승인관리), 담임업무기준관리, 발령전 임시교원 등록/권한이양. (자료권한: 학년반, 교과목, 동아리활동은 결재승인 완료 후 최종 부여됨)
2. 학교정보: 기준년도/학기관리 (자료오류삭제로 편차/수업일수 오류수정), 학년/반정보관리 (가편성 후 실제반명 일치), 학생자료개별삭제, 학생부수정이력.
3. 교육과정: 2026년 2022 개정 교육과정 1~6학년 전면적용. 학교교육과정편제 및 시간배당 관리, 학교자율시간 편제(3~4학년 최소 29시간, 5~6학년 최소 32시간), 학급담임편성관리, 담당교과편성관리, 학사일정관리(공휴일정보생성 선행, 임시공휴일 등록 및 기초시간표 반영), 학급시간표관리(기초시간표 작성 및 반영, 시수편차 0 확인 필수 - 주요 감사 지적사항), 교과진도표/주간학습안내/결보강처리.
4. 학적:
   - 기본신상관리, 누가주소등록, 학적사항, 학년반이력조회, 번호수정(스쿨뱅킹 연동되므로 임의수정 주의, 상단 번호수정 라디오버튼 이용)
   - 전입관리: [전편입/재취학생등록] -> [자료요청 및 취소] -> [전입자료조회] -> [상신] -> [학적반영] -> [종합자료검색(자료이관)] 5단계 흐름.
   - 전출관리: [전출자료요청접수] -> [월출결자료등록] -> [학교생활기록부생성] -> [전출자료전송] -> [상신] -> [학적반영].
   - 진급처리: [수업학년도 1학기 변경] -> [학년/반정보 일괄등록] -> [진급대상자생성(유급/조기진급자 선처리)] -> [반편성(일괄/개별)] -> [반번호부여] -> [진급자학적반영(6학년 졸업생 학적반영 선행 필수)].
   - 출결관리: 일일출결, 비고등록, 출결특기사항, 교과시간별출결, 월별마감 후 승인요청. 방학월(0일)도 마감 필수.
5. 학생생활:
   - 창의적체험활동: 자율·자치활동, 동아리활동(부서만들기->부서배정->동아리활동관리 누가기록/특기사항, 학생부 비연동이므로 {동아리특기사항가져오기} 필수), 봉사활동실적, 진로활동(5,6학년 진로희망사항 기재), 학생부자료기록.
   - 수상대장관리: 상장번호설정(자동채번3: 학년도-학년-번호), 상장양식관리, 수상대장등록. (수상경력은 2019부터 생기부 미반영)
   - 행동특성 및 종합의견: 담임교사 문장 입력, 누가기록 연계, 맞춤법검사/훈령정보조회.
   - 학교폭력조치상황관리: 2026학년도는 1,2,3학년만 본 메뉴에 입력, 4~6학년은 기존대로 학적/출결/행특에 기재.
6. 성적:
   - 평가계획(안)관리: 성취기준관리, 평가기준관리(일괄입력/일괄업로드/예시문), 평가계획(안)마감 및 승인상신.
   - 학생평가: 교과평가(성취기준별/영역별/교과별), 학기말종합의견(참고자료조회, 가져오기, 교과평가일괄복사), 교과학습발달상황(일괄저장/통합기록).
7. 학생부:
   - 학생부반영 -> 자료검증 및 반마감(확인필요 오류 확인 및 예외처리사유 일괄입력) -> 학년마감 및 승인요청 상신.
   - 정정대장관리: 이전학년도 학생부 정정은 객관적 증빙자료 첨부 필수 및 "담임 - 학생부부장 - 교감 - 교장"의 4단 결재 필수. 기결취소 불가.
   - 생활통지표: 통지표등록 -> 자료반영 및 반마감 -> 통지표 조회/출력 -> 학기별 통지표 마감.
8. 학교자율시간(2022개정): 편제 등록 -> 과목(활동) 개설 및 학급공통/학생선택 배정 -> 평가계획안 등록 -> 학생평가.

답변 규칙:
- 질문에 대해 나이스의 정확한 메뉴 경로 (예: [학급담임]-[학생부]-[학교생활기록부]-[학교생활기록부]-[학생부반영])를 명시하세요.
- 매뉴얼의 '꼭 확인하세요' 주의점과 '활용 사례'를 친절하게 짚어주세요.
- 단계별 1, 2, 3, 4 순서로 요약하고, 관련 가상 시뮬레이터에서 바로 실습해볼 수 있는 팁을 제공하세요.
- 마크다운 형태로 깔끔하게 서식화하여 응답하세요.
`;

// AI Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], currentMenu = "" } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "메시지를 입력해주세요." });
    }

    const ai = getGeminiClient();
    const contents: any[] = [];

    // Add context about current active screen if available
    let contextualSystemPrompt = NEIS_MANUAL_SYSTEM_INSTRUCTION;
    if (currentMenu) {
      contextualSystemPrompt += `\n\n[현재 사용자가 보고 있는 가상 나이스 화면]: "${currentMenu}"`;
    }

    // Add conversation history
    for (const h of history.slice(-6)) {
      if (h.role === "user" || h.role === "model" || h.role === "assistant") {
        contents.push({
          role: h.role === "assistant" ? "model" : h.role,
          parts: [{ text: h.content || h.text || "" }],
        });
      }
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction: contextualSystemPrompt,
        temperature: 0.4,
      },
    });

    const text = response.text || "답변을 생성하지 못했습니다.";
    res.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "AI 응답을 생성하는 도중 오류가 발생했습니다.",
      details: error?.message || String(error),
    });
  }
});

// Quick FAQ endpoint for instant offline manual tips
app.get("/api/manual/topics", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
