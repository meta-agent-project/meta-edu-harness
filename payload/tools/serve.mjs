import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(), port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const target=path.resolve(root,'.'+name), rel=path.relative(root,target);
  if(rel.startsWith('..')||path.isAbsolute(rel)||rel.split(path.sep).some(s=>s==='.git'||s.startsWith('.env'))){res.writeHead(403);return res.end('Forbidden');}
  let file=target, stat=await fs.stat(file);if(stat.isDirectory())file=path.join(file,'index.html');
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(await fs.readFile(file));
}catch{res.writeHead(404);res.end('Not found');}});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'포트가 사용 중입니다. 기존 서버를 종료하거나 PORT 환경 변수로 다른 포트를 지정하세요.':e.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`실습 서버 http://127.0.0.1:${port} — 종료 Ctrl+C`));
