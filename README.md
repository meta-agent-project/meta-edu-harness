# 비개발자 SDD 교육 스킬

4시간 수업에서 사용하는 Claude Code 프로젝트 스킬 9개다. 수강생은 강사가 제공한 실습 폴더를 Code 로컬 세션에서 연다. GitHub 계정·MCP·원격 push 없이 로컬 Git을 사용한다. Node.js 24, Claude Desktop, Git은 주최 측이 사전 설치한다.

## 흐름

`edu-flow start → edu-interview → edu-spec → edu-mockup → edu-plan → edu-build → edu-converge → 로컬 커밋`

MVP 사용자 테스트 뒤 `edu-flow roadmap`으로 본개발을 확정한다. 기대 동작 변경은 `edu-change`, 이번 회차 완료 후 시각적 기능 지도는 `edu-wiki`다. 별도 history.md를 만들지 않고 Git 메시지와 diff에 변경 이유를 남긴다.

| 스킬 | 역할 |
|---|---|
| edu-flow | 환경 점검·진행·로드맵·backlog |
| edu-interview | 무엇을 만들지와 MVP 범위 확정 |
| edu-spec | 사용자 동작과 완료 조건 |
| edu-mockup | few-shot 사진 2개 참고·목업 2안 선택 |
| edu-plan | 구현 순서와 검사 방법 |
| edu-build | 실패 테스트·구현·통과·회귀 검사 |
| edu-converge | 명세·문서·코드와 검사 근거 일치 확인 |
| edu-change | 같은 spec을 먼저 고치는 요구 변경 |
| edu-wiki | 검증된 현재 기능의 로컬 HTML 지도 |

## 제공·설치

강사는 [INSTALL.md](INSTALL.md)에 따라 새 실습 폴더를 준비해 제공한다. 주소를 받아 설치하는 경우에도 공개 저장소 읽기에 GitHub 가입이나 MCP를 필수로 요구하지 않는다. 단순 검토 요청을 설치 요청으로 해석하지 않는다. 기존 프로젝트를 자동 덮어쓰지 않는다.

`payload/`는 완성 앱이 아니라 스킬·샘플·로컬 서버·환경 검사다. 교안·슬라이드·워크북은 포함하지 않는다. 디자인 참고 PNG 3종은 edu-mockup의 assets에 있다. 앱은 브라우저에서 실행하고 Node.js는 로컬 서버와 자동 테스트에 사용한다.

## 2.0 정리

edu-start를 edu-flow start로 통합하고 edu-converge·edu-wiki를 추가했다. 수업에서 사용하지 않는 별도 edu-fix는 제외했다. 수업에서 사용하지 않는 별도 edu-fix는 제외했다. 수업에서 사용하지 않는 별도 edu-fix는 제외했다. 별도 history·일상 ADR·수강생 GitHub/MCP 설정·정적 디자인 갤러리는 제외했다. 기존 1.x 사용자 파일을 자동 삭제하거나 업그레이드하지 않으므로 새 실습 폴더를 준비한다.

스킬 문서·설치기·로컬 검사 결과와 실제 Claude 수업 수행은 구분한다. 모델 사용량과 30명 수업 완주를 보장하지 않으며 수업 전 실제 환경 리허설이 필요하다.
