const { chromium } = await import(process.env.PW_MODULE || "playwright");
import fs from "fs";
const f = fs.readFileSync("anna-folder.svg","utf8");
const sz=(n)=>f.replace('width="512" height="512"',`width="${n}" height="${n}"`);
const html=`<body style="margin:0;background:#f2f4f8;font-family:sans-serif"><div style="display:flex;gap:20px;align-items:flex-end;padding:20px">
<div>${sz(300)}<div>300</div></div><div>${sz(128)}<div>128</div></div><div>${sz(64)}<div>64</div></div><div>${sz(48)}<div>48</div></div><div>${sz(32)}<div>32</div></div><div>${sz(16)}<div>16</div></div></div></body>`;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:640,height:360}});await p.setContent(html);await p.screenshot({path:"folder_preview.png"});await b.close();console.log("ok");
