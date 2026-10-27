# SDD 교육 스킬과 실습 시작 프로젝트

이 폴더는 GitHub 주소로 설치되는 교육 프로젝트의 기본 파일이다. 수강생은 GitHub MCP를 연결하고 강사 저장소 URL과 설치 요청을 Claude Code에 전달한다. 저장소의 README·INSTALL.md에 따라 현재 프로젝트에 파일을 설치한다. 이 폴더를 ZIP으로 직접 배포하는 방식은 기본 수업 흐름이 아니다.

설치가 끝났다면 Claude Desktop Code의 로컬 세션에서 이 프로젝트를 열고 `/edu-start`를 실행한다. `.edu/install.json`이 있으면 설치 버전과 출처를 확인할 수 있다. 강사 스킬 저장소와 수강생 앱 저장소는 별개다.

`/edu-interview`에서 만들 앱·사용자·문제·MVP 범위를 정하고 확정한다. 공통 수업 예제는 HTML 편집기이며 다른 앱을 선택할 수도 있다. 이미 합의한 답변은 반복해서 묻지 않는다.

Node.js 24 이상이 필요하다. `npm run doctor`로 환경을 확인하고 `npm start`로 로컬 서버를 켠다. 별도 npm install은 필요 없다. `npm test`의 최초 결과는 환경 확인이며 앱 기능이 완성됐다는 뜻이 아니다.

스킬 9개: edu-start, edu-interview, edu-spec, edu-mockup, edu-plan, edu-build, edu-change, edu-fix, edu-flow.

기본 순서: start → interview → spec → mockup 선택 → plan → build → 사람 확인·commit. MVP를 써 본 후 전체 roadmap을 만든다. 기대 동작을 바꾸면 change, 명세와 달리 고장 나면 fix, 나중에 할 아이디어는 flow backlog다.

예: `/edu-change SPEC-003 취소를 1회에서 10회로 바꿔줘`는 요구사항 변경이다. `/edu-fix SPEC-003 취소하면 이전 문구가 복원되지 않아`는 버그 조사다. 증상을 실제로 재현한 뒤 수정하며, 재현하지 못한 버그를 해결됐다고 기록하지 않는다.

기존 교육 프로젝트를 갱신할 때는 변경 내용을 확인해 `.claude`의 교육 규칙·스킬·템플릿만 반영한다. 직접 수정한 스킬은 비교해 합치고, 앱 코드와 `.edu` 기록을 starter 파일로 덮어쓰지 않는다.

`.edu` 문서는 수업 중 만든다. 스킬은 프로젝트 안에만 설치되어 다른 개인 프로젝트의 규칙을 바꾸지 않는다. GitHub 게시와 커밋은 수강생이 직접 수행한다.

원본 흐름 참고: https://github.com/meta-agent-project/metakit-sdd-harness
교육용: 순차 실행, 간단한 문서, 선택적 TDD, 회귀 검사, history, 기능별 검증 기록.
