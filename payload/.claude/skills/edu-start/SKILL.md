---
name: edu-start
description: 교육 프로젝트 폴더와 실행 환경을 점검하고 만들 앱을 정하는 인터뷰로 연결한다. 처음 시작하거나 설치 상태를 확인할 때 사용한다.
---

# 실행 환경 준비

1. CLAUDE.md, .claude/edu-rules.md를 읽고 기존 .edu 문서가 있으면 이어 쓴다. 기존 파일을 빈 템플릿으로 덮어쓰지 않는다.
   .edu/install.json이 있으면 설치 버전·커밋·출처를 재사용한다. 설치 기록만으로 MCP 인증이나 스킬 화면 인식이 확인됐다고 주장하지 않는다. 설치가 끝난 프로젝트를 다시 다운로드하지 않는다.
2. .edu 폴더를 만들고 backlog.md, history.md, bugs.md, catalog.json은 없을 때만 만든다. catalog는 project="미정", 빈 features 배열로 시작한다. 앱 이름·목적·MVP를 임의로 채우지 않는다.
3. 실제 package.json과 도구를 확인한 뒤 제공된 starter에서는 npm run doctor와 npm test를 실행한다. 다른 프로젝트에서는 존재하는 해당 명령만 실행한다. 환경 검사와 앱 검사를 구분해 결과를 .edu/setup.md에 적는다. 확인하지 못한 버전·실행 명령을 추정하지 않는다.
4. 실행 환경 문제가 있어도 인터뷰는 진행할 수 있다. 구현 전 해결해야 할 문제만 기록한다. 사용자 전역 설정·Git 저장소·원격은 자동으로 바꾸지 않는다.
5. 목적과 MVP가 아직 확정되지 않았으면 /edu-interview로 연결한다. 기존 contract·로드맵에 사용자 확정 근거가 있으면 다시 인터뷰를 강요하지 않고 edu-flow로 이어 간다. 이 단계에서 spec이나 앱을 만들지 않는다.
