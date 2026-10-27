import test from 'node:test';
import assert from 'node:assert/strict';
test('환경 확인: 앱 기능 검사는 아직 없음',()=>assert.ok(Number(process.versions.node.split('.')[0])>=24));
