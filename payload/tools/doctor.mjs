import fs from 'node:fs';
const major=Number(process.versions.node.split('.')[0]);
let ok=major>=24;console.log(`Node ${process.version}: ${ok?'OK':'24 이상 필요'}`);
for(const p of ['CLAUDE.md','.claude/edu-rules.md','samples/lecture.html']){const exists=fs.existsSync(p);console.log(`${p}: ${exists?'OK':'없음'}`);ok&&=exists;}
console.log('Claude 로그인·모델·사용량·GitHub 인증은 사람이 화면에서 확인합니다.');
process.exitCode=ok?0:1;
