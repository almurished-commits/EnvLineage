import path from 'node:path'; import crypto from 'node:crypto';
export const posix=(p:string)=>p.split(path.sep).join('/');
export const loc=(path:string,line:number,column=1)=>({path:posix(path),line,column});
export const fp=(...parts:string[])=>crypto.createHash('sha256').update(parts.join('\0')).digest('hex').slice(0,16);
export function lineCol(text:string,index:number){const before=text.slice(0,index); const lines=before.split(/\r?\n/); return {line:lines.length,column:(lines.at(-1)?.length??0)+1}}
export const uniq=<T>(xs:T[], key:(x:T)=>string)=>[...new Map(xs.map(x=>[key(x),x])).values()];
