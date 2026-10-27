# SDD 교육 스킬: 주소로 설치하고 인터뷰부터 시작하기

비개발자 4시간 수업용 Claude Code 프로젝트 스킬 9개다. 수강생은 GitHub MCP가 연결된 Code 로컬 세션에서 이 저장소의 주소와 설치 요청을 전달한다.

## Claude가 설치 요청을 받았다면

1. GitHub MCP로 이 저장소의 README와 [INSTALL.md](INSTALL.md)를 읽는다.
2. 요청한 버전의 실제 커밋을 확인하고 INSTALL 절차대로 현재 프로젝트에 설치한다.
3. 스킬 원문 전체를 대화에 출력하거나 다시 생성하지 않는다. 원문 파일을 가져와 설치한다.
4. 설치·환경 검사·스킬 인식 결과를 짧게 보고한 뒤 edu-start와 edu-interview로 이어 간다.

사용자가 주소만 보냈고 대화에서 설치 의도가 이미 명확하면 그 의도를 따른다. 단순 열람·검토 요청을 설치 요청으로 해석하지 않는다.

## 수강생 요청문

이 GitHub 저장소의 교육 스킬을 현재 프로젝트에 설치해줘: https://github.com/meta-agent-project/meta-edu-harness

연결된 GitHub MCP로 README와 INSTALL.md를 확인하고 따라줘. 설치된 버전·스킬 수·검사 결과를 요약해줘.

설치 요청 전에 GitHub MCP 인증과 Node.js 24 이상, Git, Code의 로컬 파일 쓰기가 준비돼 있어야 한다. MCP는 저장소를 읽고 Code의 로컬 도구가 파일을 설치한다.

처음 참여한다면 [수강생·강사 준비 안내](PREPARATION.md)를 먼저 확인한다. 프로그램 설치는 강의실에서 미리 마치고, 개인 로그인·Git 작성자 설정·MCP 연결·스킬 설치는 수업 시작 후 함께 진행한다. 이 개인 설정 시간을 4시간 운영에 포함한다.

만드는 결과물은 브라우저에서 실행하는 웹 앱이다. Claude Desktop의 Code 탭은 개발 도구이며, Node.js는 스킬 설치기·로컬 미리보기 서버·자동 테스트를 실행한다. Electron 등 데스크톱 앱으로 패키징하지 않는다. Node.js 24는 교육 환경을 통일한 지원 기준이다. 수강생에게 Node나 Git 명령어 암기를 요구하지 않는다. Git 작업은 Claude Code에 자연어로 요청하며 GitHub Desktop은 필요하지 않다.

## 스킬

start(환경) → interview(만들 앱·MVP) → spec → mockup → plan → build.
mockup에는 디자인 few-shot 예시 3종과 선택용 페이지가 포함된다. 요청→결과 2쌍을 골라 목업 2안을 만든다. change는 요구사항 변경, fix는 버그 수정, flow는 로드맵·backlog·상태를 관리한다. 실제 명령은 /edu-start처럼 edu- 접두사를 쓴다.

HTML 편집기는 선택 가능한 수업 예제다. 인터뷰는 다른 앱도 다룬다. 외부 DB 없이 시작하고 필요한 저장은 로컬 JSON 등을 검토한다. 회귀 검사는 표현한 조건을 확인하며 모든 버그가 없음을 보장하지 않는다.

## 저장소 구성

- INSTALL.md: Claude가 따라갈 설치 절차.
- install.mjs: Node 내장 기능으로 파일 검증·로컬 복사. 기존 파일 충돌 시 중단.
- manifest.json: 버전·스킬 목록·설치 파일과 SHA-256.
- payload/: 프로젝트에 설치할 .claude·CLAUDE.md와 기본 실행 환경. 완성 앱은 포함하지 않는다.
- PREPARATION.md: 사전 설치, 수업 중 개인 설정, 30명·강사 1명 운영 제안.

처음 수업은 새 실습 폴더를 사용한다. 강사 스킬 저장소의 .git은 설치하지 않으며, 수강생 앱의 GitHub 저장소는 MVP 이후 별도로 만든다. 인증정보·개인 설정·완성형 예제는 이 저장소에 올리지 않는다.

흐름 참고: [metakit-sdd-harness](https://github.com/meta-agent-project/metakit-sdd-harness). 교육용 절차는 별도로 작성했다.
