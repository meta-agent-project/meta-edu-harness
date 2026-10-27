# SDD 교육 프로젝트 공통 규칙

이 프로젝트는 비개발자 4시간 워크숍이다. 현재 spec 한 개를 순차로 다룬다.

- 사용자가 인터뷰에서 확정한 목적·MVP 범위·외부 DB 없음 조건을 보존한다. HTML 편집기 8개 기능은 선택 가능한 수업 예시이며 모든 프로젝트의 기본 요구사항이 아니다.
- .edu/contract.md와 현재 spec·plan, 직접 관련된 코드만 우선 읽는다. 전체 문서·전체 로그를 매번 다시 읽지 않는다.
- 구현 전 spec→필요한 목업→선택→plan을 남긴다. 이미 확정된 선택은 반복해서 묻지 않는다. 미결정 범위·시안·요구사항 변경은 짧게 물어 확정한다.
- 병렬 에이전트, worktree, 외부 모델 재검토, 끝까지 자동 진행하는 루프는 기본 흐름에 포함하지 않는다.
- 새 아이디어는 .edu/backlog.md에 기록하고 현재 작업을 계속한다. 현재 spec의 결함은 현재 작업에서 고친다.
- 핵심 검사는 먼저 작성하고 의도된 실패를 확인한다. 대표 기능은 red→green→필요한 정리의 TDD를 보여준다. 사후 검사를 TDD라고 부르지 않는다.
- 유효한 기존 검사는 보존한다. 바뀐 요구사항의 검사는 근거와 함께 갱신한다. 실패를 감추기 위해 검사를 제거·완화하지 않는다.
- 같은 실패에 두 번 수정해도 해결되지 않으면 상태를 blocked로 기록하고 원인·시도·다음 선택을 강사에게 보여준다. 시간 경과나 미실행을 통과로 기록하지 않는다.
- Git은 Claude Code에 자연어로 요청한다. GitHub Desktop은 요구하지 않는다. 변경 파일·검사 결과·추천 커밋 메시지·대상 remote를 보여 주고, 사용자가 요청한 범위에서 commit·push를 실행한다. 이미 명확히 요청한 실행은 재확인하지 않는다. 요청 없이 자동 게시하지 않으며 리셋·강제 push는 기본 흐름에 포함하지 않는다.
- 첫 커밋 전에 작성자 이름·이메일을 확인한다. 값이 없으면 사용자에게 필요한 값만 받아 해당 프로젝트의 로컬 Git 설정으로 저장한다. GitHub MCP 인증과 로컬 Git 인증을 혼동하지 않는다. 비밀번호·토큰을 대화나 저장소에 기록하지 않는다.
- 기능 검증이 끝나면 ready로 기록하고, 사람의 화면 확인과 실제 commit을 확인한 뒤 done으로 바꾼다. 상태만 보고 구현됐다고 추정하지 않는다.
- 요구사항 변경은 같은 spec 파일을 최신화하고 .edu/history.md에 전후·이유·영향을 남긴다. 원문과 최신 내용을 한 spec 안에 중복 보존하지 않는다.
- 만들 대상과 목적은 edu-interview, 기대 동작 자체의 변경은 edu-change, 명세와 다른 실제 동작은 edu-fix, 나중에 할 아이디어는 edu-flow backlog로 다룬다. 버그를 숨기려고 spec을 바꾸지 않는다.
- 테스트 출력은 이름·결과·필요한 오류만 요약한다. 로컬 실행과 모델의 결과 해석 사용량을 구분한다.

## 파일과 상태

.edu/interview.md: 질문·답변 요약, 만들 앱·MVP 범위와 확정 근거. .edu/contract.md: 확정한 목표·제약·기술·실행 명령.
.edu/mvp-roadmap.md: 최초 MVP 작업 순서. .edu/roadmap.md: MVP 경험 후 전체 로드맵.
.edu/backlog.md: 아이디어·상태·연결 spec. .edu/history.md: 요구사항 변경 기록.
.edu/bugs.md: BUG ID별 재현·기대/실제·원인·수정 전후 검사·해결 상태. 버그 수정은 요구사항 변경 history와 구분한다.
.edu/specs/001/spec.md, mockups/a.html·b.html·selected.html, plan.md, validation.md.
.edu/catalog.json: 진행 상태 목록. 문서·실제 검사에서 확인한 사실만 기록한다.

catalog 형식: {"project":"이름","features":[{"id":"SPEC-001","title":"이름","status":"draft","spec":"specs/001/spec.md","plan":"specs/001/plan.md","validation":"specs/001/validation.md","summary":"설명","evidence":[],"commit":""}]}
status: draft, specified, designed, planned, building, ready, done, blocked. 변경 시 기존 done을 planned 등 실제 단계로 되돌리고 오래된 검사 근거는 현재 통과 근거로 쓰지 않는다.

문서 템플릿은 .claude/edu-templates/에 있다. 해당 단계의 템플릿만 읽는다. 앱 코드는 src/, tests/에 둔다. 기본 명령: npm start, npm test, npm run doctor.
