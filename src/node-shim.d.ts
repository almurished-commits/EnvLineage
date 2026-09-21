declare const process: { argv:string[]; stdout:{isTTY?:boolean;write(s:string):void}; env:Record<string,string|undefined>; exitCode?:number };
declare module 'node:path' { const path:any; export default path; }
declare module 'node:crypto' { const crypto:any; export default crypto; }
declare module 'node:fs/promises' { const fs:any; export default fs; }
