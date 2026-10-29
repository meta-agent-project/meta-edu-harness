import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const major=Number(process.versions.node.split('.')[0]);
let ok=major>=24;console.log(`Node ${process.version}: ${ok?'OK':'24 이상 필요'}`);
for(const p of ['CLAUDE.md','.claude/edu-rules.md','samples/lecture.html']){const exists=fs.existsSync(p);console.log(`${p}: ${exists?'OK':'없음'}`);ok&&=exists;}
try{console.log('Git: '+execFileSync('git',['--version'],{encoding:'utf8',windowsHide:true}).trim());}catch{ok=false;console.log('Git: 실행 불가 - 주최 측 설치 확인 필요');}
console.log('Claude 로그인·Code 로컬 세션·모델·사용량·스킬 인식은 사람이 화면에서 확인합니다. GitHub/MCP는 수업 필수가 아닙니다.');
process.exitCode=ok?0:1;
