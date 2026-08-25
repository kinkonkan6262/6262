const { chromium } = await import(process.env.PW_MODULE || "playwright");
import fs from "fs";
const full = fs.readFileSync("anna-icon.svg","utf8");
const small = fs.readFileSync("anna-icon-small.svg","utf8");
const html = `<body style="margin:0;background:#eceff3;font-family:sans-serif">
<div style="display:flex;gap:24px;align-items:flex-end;padding:24px">
 <div>${full.replace('width="512" height="512"','width="360" height="360"')}<div>360</div></div>
 <div>${full.replace('width="512" height="512"','width="180" height="180"')}<div>180</div></div>
 <div>${full.replace('width="512" height="512"','width="64" height="64"')}<div>64</div></div>
 <div>${full.replace('width="512" height="512"','width="32" height="32"')}<div>32</div></div>
 <div>${small.replace('width="512" height="512"','width="64" height="64"')}<div>S64</div></div>
 <div>${small.replace('width="512" height="512"','width="32" height="32"')}<div>S32</div></div>
 <div>${small.replace('width="512" height="512"','width="16" height="16"')}<div>S16</div></div>
</div></body>`;
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:900,height:440}});
await p.setContent(html);
await p.screenshot({path:"preview.png"});
await b.close();
console.log("preview.png");
