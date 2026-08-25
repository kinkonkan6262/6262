const { chromium } = await import(process.env.PW_MODULE || "playwright");
import fs from "fs";
const row = (bg) => `<div style="background:${bg};padding:14px;display:flex;gap:18px;align-items:center">` +
 [16,32,48,64,128].map(n=>`<img src="png-folder/anna-folder-${n}.png" width="${n}" height="${n}">`).join("") +
 `<span style="color:${bg==='#fff'?'#333':'#eee'};font:12px sans-serif">16 / 32 / 48 / 64 / 128</span></div>`;
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:520,height:230}});
fs.writeFileSync("x.html",`<body style="margin:0;font-family:sans-serif">${row('#fff')}${row('#202124')}${row('#e8eaf0')}</body>`);
await p.goto("file://" + process.cwd() + "/x.html");
await p.screenshot({path:"folder_small.png"});
await b.close();console.log("ok");
