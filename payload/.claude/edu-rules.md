# SDD 교육 프로젝트 공통 규칙

비개발자 4시간 수업이다. 현재 spec 하나를 순차로 진행한다. 외부 DB 없이 시작하며 필요하면 로컬 JSON을 사용한다. HTML 편집기 8개 동작은 수업 예시이고 다른 앱에 강요하지 않는다.

- 먼저 .edu/contract.md, 현재 spec·plan, 직접 관련 코드·검사만 읽는다. 전체 자료나 성공 로그를 매번 다시 읽지 않는다. 기본 흐름에 병렬 에이전트·worktree·외부 모델 검수·무제한 자동 반복을 넣지 않는다.
- 초기 로드맵은 MVP와 본개발의 큰 방향이다. MVP를 작동시켜 사용자 테스트한 뒤 보완점과 우선순위로 본개발 로드맵을 확정한다. 상세 spec은 해당 기능을 시작할 때 만든다.
- 기능 흐름: spec → 필요한 목업과 선택 → plan → 실패 테스트 → 구현 → 통과 → 빠른 누적 회귀 검사 → edu-converge → 사람 확인·로컬 Git 커밋. 사후 테스트를 TDD라고 부르지 않는다.
- 매 코드 편집마다 전체 브라우저 통합 테스트를 반복하지 않는다. 기능 완료 때 빠른 누적 테스트 전체를 실행하고 영향받는 실제 사용자 흐름을 확인한다. 미실행 검사는 미실행으로 남기며 모든 회귀 방지를 보장하지 않는다.
- 미착수 로드맵은 사용자의 확정된 추가·변경에 따라 의존성·우선순위를 확인해 조정할 수 있다. 아직 채택하지 않은 아이디어는 backlog에 기록한다. 진행 중인 spec에 새 기능을 몰래 끼워 넣지 않는다.
- 완료한 기능의 기대 동작 변경은 edu-change다. 명세와 다른 실제 동작은 새 요구로 바꾸지 않고 현재 개발 단계에서 재현·수정·검사한다. 버그를 맞는 동작으로 보이게 spec을 고치거나 유효한 검사를 삭제하지 않는다.
- 별도 history.md와 일상적인 ADR은 만들지 않는다. 현재 spec·plan·코드·검사 근거를 Git으로 함께 기록한다. 커밋 메시지 본문에 무엇을 왜 바꿨는지, 검사 갱신 이유를 적는다. 기존 프로젝트의 과거 기록은 요청 없이 삭제하지 않는다.
- GitHub 가입·MCP·원격 push는 수업 필수가 아니다. 기본은 로컬 Git이다. 첫 커밋 전 이름·이메일을 확인하고 없으면 필요한 값만 받아 프로젝트 로컬 설정에 저장한다. 전역 설정이나 remote를 임의로 변경하지 않는다.
- 변경 파일·실행한 검사·추천 메시지를 보여주고 사용자가 요청한 범위에서 커밋한다. 이미 명확히 요청한 실행은 다시 묻지 않는다. 자동 게시·강제 push·작업 덮어쓰기를 하지 않는다.
- 동일 실패에 두 번 수정해도 해결되지 않으면 원인·시도·다음 선택을 요약하고 강사에게 넘긴다. 무한 재시도나 임의로 검사를 약하게 만드는 방식으로 시간을 쓰지 않는다.
- 이번 회차의 spec을 모두 마친 뒤 edu-wiki로 검증된 현재 기능과 연결 관계를 HTML 지도에 정리한다. 미래 기능을 구현된 것으로 표시하지 않는다.

## 파일과 상태

.edu/setup.md: 실제 환경 확인. interview.md: 목적과 MVP 합의. contract.md: 목표·제약·실행 명령.
.edu/mvp-roadmap.md: 최초 MVP 작업 순서. roadmap.md: 큰 방향과 사용자 테스트 후 확정한 본개발 범위.
.edu/feedback.md: 사용자 테스트 관찰·추가/보완점. backlog.md: 채택 전 아이디어.
.edu/specs/번호/: spec.md, 필요한 mockups/, plan.md, validation.md. 정합성 확인은 validation.md에 짧게 남긴다.
.edu/catalog.json: {"project":"이름","features":[{"id":"SPEC-001","title":"이름","status":"draft","spec":"specs/001/spec.md","plan":"specs/001/plan.md","validation":"specs/001/validation.md","summary":"설명","evidence":[]}]}
상태: draft, specified, designed, planned, building, ready, done, blocked. 실제 근거 없이 다음 상태로 넘기지 않는다. 변경한 spec의 과거 검사를 현재 통과 근거로 재사용하지 않는다.
커밋 SHA는 git log에서 조회한다. 자기 커밋의 SHA를 추적 파일에 적으려고 무한 추가 커밋하지 않는다.
문서 템플릿은 .claude/edu-templates/에서 필요한 것만 읽는다. 기본 명령은 실제 package.json의 npm start, npm test, npm run doctor다.
