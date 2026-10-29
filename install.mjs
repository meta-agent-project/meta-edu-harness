import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

// Copies a pinned, already-downloaded package. No network, npm install, or Git mutations.
const source=await fs.realpath(path.dirname(fileURLToPath(import.meta.url)));
const hash=buffer=>createHash('sha256').update(buffer).digest('hex');
const options={};
const allowed=new Set(['--target','--repo','--commit','--source-proof']);
async function statOrNull(file){try{return await fs.lstat(file);}catch(e){if(e.code==='ENOENT')return null;throw e;}}
function inside(root,file){const rel=path.relative(root,file);return rel===''||(!rel.startsWith('..'+path.sep)&&rel!=='..'&&!path.isAbsolute(rel));}
async function checkedPath(root,relative){
  if(typeof relative!=='string'||relative.includes('\\')||relative.includes(':')||relative.split('/').some(s=>!s||s==='.'||s==='..'))throw Error('잘못된 설치 경로: '+relative);
  const resolved=path.resolve(root,relative);if(!inside(root,resolved))throw Error('설치 범위 밖 경로: '+relative);
  let cursor=root;
  for(const part of relative.split('/')){cursor=path.join(cursor,part);const stat=await statOrNull(cursor);if(stat?.isSymbolicLink())throw Error('심볼릭 링크에는 설치하지 않습니다: '+relative);}
  return resolved;
}
try{
  for(let i=2;i<process.argv.length;i+=2){const key=process.argv[i],value=process.argv[i+1];if(!allowed.has(key)||!value||options[key])throw Error('인자: --target 경로 --repo GitHub주소 --commit SHA [--source-proof git|mcp]');options[key]=value;}
  if(Number(process.versions.node.split('.')[0])<24)throw Error('Node.js 24 이상이 필요합니다.');
  if(!options['--target']||!options['--repo']||!/^[a-f0-9]{40}$/i.test(options['--commit']||''))throw Error('실제 대상 경로·GitHub 저장소 주소·40자리 커밋 SHA가 필요합니다.');
  const url=new URL(options['--repo']);
  if(url.protocol!=='https:'||url.hostname!=='github.com'||url.username||url.password||url.search||url.hash||!/^\/[\w.-]+\/[\w.-]+\/?$/.test(url.pathname))throw Error('인증정보 없는 https://github.com/소유자/저장소 주소를 사용하세요.');
  const repo=url.origin+url.pathname.replace(/\/$/,'').replace(/\.git$/,'');
  const commit=options['--commit'].toLowerCase(),proof=options['--source-proof']||'git';
  if(!['git','mcp'].includes(proof))throw Error('source-proof는 git 또는 mcp입니다.');
  if(proof==='git'){
    const top=await fs.realpath(execFileSync('git',['-C',source,'rev-parse','--show-toplevel'],{encoding:'utf8',windowsHide:true}).trim());
    const actual=execFileSync('git',['-C',source,'rev-parse','HEAD'],{encoding:'utf8',windowsHide:true}).trim();
    if(top!==source||actual!==commit)throw Error('다운로드한 저장소 HEAD가 지정한 커밋과 다릅니다.');
  }
  const target=await fs.realpath(path.resolve(options['--target']));
  if(!(await fs.stat(target)).isDirectory()||inside(source,target)||inside(target,source))throw Error('설치 원본과 분리된 실습 폴더를 선택하세요.');
  const manifestBytes=await fs.readFile(path.join(source,'manifest.json'));
  const manifest=JSON.parse(manifestBytes);
  if(manifest.schema!==1||!Array.isArray(manifest.files)||!Array.isArray(manifest.skills)||manifest.skills.length===0)throw Error('지원하지 않는 설치 목록입니다.');
  const payload=path.join(source,'payload');
  if((await fs.lstat(payload)).isSymbolicLink())throw Error('payload 링크를 지원하지 않습니다.');
  const plan=[],conflicts=[],seen=new Set();
  for(const entry of manifest.files){
    const from=await checkedPath(payload,entry.path),to=await checkedPath(target,entry.path);
    const key=entry.path.toLowerCase();if(seen.has(key))throw Error('중복 설치 경로: '+entry.path);seen.add(key);
    if(!/^[a-f0-9]{64}$/.test(entry.sha256||''))throw Error('해시 누락: '+entry.path);
    const bytes=await fs.readFile(from);if(hash(bytes)!==entry.sha256)throw Error('원본 해시 불일치: '+entry.path);
    const existing=await statOrNull(to);
    if(existing&&(!existing.isFile()||hash(await fs.readFile(to))!==entry.sha256))conflicts.push(entry.path);
    plan.push({to,bytes,exists:!!existing});
  }
  for(const skill of manifest.skills){if(!/^edu-[a-z-]+$/.test(skill)||!seen.has(`.claude/skills/${skill}/skill.md`))throw Error('스킬 누락: '+skill);}
  const receiptPath=await checkedPath(target,'.edu/install.json');
  const receipt={package:manifest.name,version:manifest.version,repository:repo,commit,sourceProof:proof==='git'?'local-git-head':'reported-by-mcp',manifestSha256:hash(manifestBytes),files:manifest.files.length,skills:manifest.skills};
  const old=await statOrNull(receiptPath);
  if(old){
    if(!old.isFile())conflicts.push('.edu/install.json');
    else {const prior=JSON.parse(await fs.readFile(receiptPath,'utf8'));if(Object.entries(receipt).some(([k,v])=>JSON.stringify(prior[k])!==JSON.stringify(v)))conflicts.push('.edu/install.json');}
  }
  if(conflicts.length)throw Error('기존 파일과 충돌하여 설치하지 않았습니다: '+conflicts.join(', '));
  let written=0;
  for(const item of plan){if(!item.exists){await fs.mkdir(path.dirname(item.to),{recursive:true});await fs.writeFile(item.to,item.bytes,{flag:'wx'});written++;}}
  if(!old){await fs.mkdir(path.dirname(receiptPath),{recursive:true});await fs.writeFile(receiptPath,JSON.stringify({...receipt,installedAt:new Date().toISOString()},null,2)+'\n',{flag:'wx'});}
  console.log(JSON.stringify({status:'installed',target,version:manifest.version,skills:manifest.skills.length,written,unchanged:plan.length-written,sourceProof:receipt.sourceProof,next:'npm run doctor → npm test → /edu-flow start → /edu-interview'},null,2));
}catch(error){console.error('설치 중단: '+error.message);console.error('기존 파일을 강제로 덮어쓰지 않았습니다. 오류를 해결한 뒤 같은 버전으로 다시 실행하세요.');process.exitCode=1;}
