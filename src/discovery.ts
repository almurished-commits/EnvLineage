import fs from 'node:fs/promises'; import path from 'node:path'; import type {Diagnostic} from './types.js';
const SKIP=new Set(['node_modules','.git','dist','build','coverage','.next','.turbo','.cache','vendor']);
const MAX_FILE=2*1024*1024, MAX_FILES=20000;
export interface FileEntry{abs:string;rel:string;kind:'code'|'template'|'dockerfile'|'compose'|'github-actions'}
export async function discover(root:string, diagnostics:Diagnostic[]):Promise<FileEntry[]>{
 const out:FileEntry[]=[]; const base=path.resolve(root);
 async function walk(dir:string){
  let ents; try{ents=await fs.readdir(dir,{withFileTypes:true})}catch(e){diagnostics.push({level:'error',code:'IO_READDIR',message:`Cannot read ${path.relative(base,dir)||'.'}: ${String(e)}`});return}
  for(const e of ents){ if(out.length>=MAX_FILES){diagnostics.push({level:'error',code:'LIMIT_FILES',message:`File limit ${MAX_FILES} reached`});return}
   if(SKIP.has(e.name))continue; const abs=path.join(dir,e.name); const rel=path.relative(base,abs);
   if(e.isSymbolicLink()){diagnostics.push({level:'warning',code:'SYMLINK_SKIPPED',message:`Skipped symlink ${rel}`});continue}
   if(e.isDirectory()){await walk(abs);continue} if(!e.isFile())continue;
   let kind:FileEntry['kind']|undefined; if(/\.(?:[cm]?[jt]sx?)$/.test(e.name))kind='code';
   else if(['.env.example','.env.sample','.env.template'].includes(e.name))kind='template';
   else if(/^Dockerfile(?:\..+)?$/i.test(e.name))kind='dockerfile';
   else if(/^(?:compose|docker-compose)(?:\.[^.]+)?\.ya?ml$/i.test(e.name))kind='compose';
   else if(rel.replaceAll('\\','/').startsWith('.github/workflows/') && /\.ya?ml$/i.test(e.name))kind='github-actions';
   if(kind){const st=await fs.stat(abs); if(st.size>MAX_FILE){diagnostics.push({level:'warning',code:'LIMIT_SIZE',message:`Skipped oversized file ${rel}`});continue} out.push({abs,rel,kind})}
  }
 }
 await walk(base); return out.sort((a,b)=>a.rel.localeCompare(b.rel));
}
