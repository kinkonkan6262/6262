const { chromium } = await import(process.env.PW_MODULE || "playwright");
const file = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 900, height: 900 } });
const errs = [];
p.on("pageerror", e => errs.push("pageerror: " + e.message));
p.on("console", m => { if (m.type() === "error") errs.push("console: " + m.text().slice(0,160)); });
await p.goto("file://" + file);
await p.waitForTimeout(3500);
await p.screenshot({ path: "gate.png" });
const info = await p.evaluate(() => ({
  title: document.title,
  icons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => l.rel + " " + (l.sizes?.value||"") + " " + l.href.slice(0,30)),
  gate: !!document.getElementById("licenseGate"),
  gateShown: getComputedStyle(document.getElementById("licenseGate")).display,
  btn: !!document.getElementById("licenseBtn"),
}));
console.log(JSON.stringify(info, null, 1));
console.log("ERRORS:", errs.length ? errs.slice(0,8) : "none");
await b.close();
