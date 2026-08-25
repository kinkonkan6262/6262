import fs from "fs";
const b64 = (f) => "data:image/png;base64," + fs.readFileSync(f).toString("base64");
const app = (s) => b64(`png/anna-${s}.png`);
const fd = (s) => b64(`png-folder/anna-folder-${s}.png`);

const strip = (srcFn, sizes) => sizes.map(s =>
  `<figure class="chip"><img src="${srcFn(s)}" width="${s}" height="${s}" alt="${s}ピクセルのアイコン"><figcaption>${s}px</figcaption></figure>`
).join("");

const html = `<title>Anna ブランドアイコン</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@500;600&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap">
<style>
:root{
  --ground:#FAF6EC; --surface:#FFFFFF; --surface-2:#F4EFE1;
  --ink:#1B2140; --ink-soft:#5C6288; --line:#E5DCC7;
  --blue:#2F3C9E; --blue-deep:#26317F; --blue-ink:#2F3C9E;
  --gold:#C9990B; --gold-bright:#F7C51A; --on-blue:#FFFFFF;
  --shadow:0 14px 40px rgba(38,49,127,.16);
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --ground:#11152C; --surface:#191F3F; --surface-2:#20264B;
    --ink:#ECEAF6; --ink-soft:#A7ACCB; --line:#2E3560;
    --blue:#2F3C9E; --blue-deep:#26317F; --blue-ink:#9AA5F0;
    --gold:#F0C43A; --gold-bright:#F7C51A; --on-blue:#FFFFFF;
    --shadow:0 14px 40px rgba(0,0,0,.45);
  }
}
:root[data-theme="dark"]{
  --ground:#11152C; --surface:#191F3F; --surface-2:#20264B;
  --ink:#ECEAF6; --ink-soft:#A7ACCB; --line:#2E3560;
  --blue:#2F3C9E; --blue-deep:#26317F; --blue-ink:#9AA5F0;
  --gold:#F0C43A; --gold-bright:#F7C51A; --on-blue:#FFFFFF;
  --shadow:0 14px 40px rgba(0,0,0,.45);
}
*{box-sizing:border-box}
body{
  margin:0; background:var(--ground); color:var(--ink);
  font-family:"Zen Kaku Gothic New","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;
  font-size:16px; line-height:1.85; -webkit-font-smoothing:antialiased;
}
.wrap{max-width:880px; margin:0 auto; padding:40px 24px 72px}
.eyebrow{
  font-family:Cinzel,"Times New Roman",serif; font-weight:600;
  letter-spacing:.3em; text-transform:uppercase; font-size:11px;
  color:var(--gold); margin:0 0 10px;
}
h1{font-size:clamp(26px,4.4vw,36px); line-height:1.35; margin:0 0 10px; text-wrap:balance; letter-spacing:.01em}
h2{font-size:20px; margin:0 0 6px; letter-spacing:.02em}
p{margin:0 0 14px; max-width:62ch}
.lead{color:var(--ink-soft); font-size:14.5px; margin:0}
.hero{
  display:flex; gap:32px; align-items:center; flex-wrap:wrap;
  background:linear-gradient(160deg,var(--blue),var(--blue-deep));
  border-radius:20px; padding:34px 32px; color:var(--on-blue);
  box-shadow:var(--shadow); position:relative; overflow:hidden;
}
.hero::after{
  content:""; position:absolute; inset:12px; border-radius:14px;
  border:1px solid rgba(247,197,26,.45); pointer-events:none;
}
.hero img{width:168px; height:168px; flex:none; filter:drop-shadow(0 10px 22px rgba(0,0,0,.35))}
.hero .eyebrow{color:var(--gold-bright)}
.hero h1{color:#fff; margin-bottom:6px}
.hero .lead{color:#D5DAF7}
.script{font-family:"Alex Brush",cursive; font-size:44px; line-height:1; color:var(--gold-bright); margin:0 0 2px}
.rule{display:flex; align-items:center; gap:10px; margin:44px 0 22px}
.rule span{height:1px; background:var(--line); flex:1}
.rule i{width:8px; height:8px; background:var(--gold); transform:rotate(45deg); flex:none}
section{margin-bottom:6px}
.card{background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:20px 22px; margin-top:16px}
.band{border-radius:12px; padding:18px 20px; display:flex; align-items:flex-end; gap:22px; flex-wrap:wrap; overflow-x:auto}
.band.light{background:#FFFFFF; border:1px solid var(--line)}
.band.dark{background:#1E2024; border:1px solid #2C2F36; margin-top:12px}
.chip{margin:0; text-align:center}
.chip img{display:block; margin:0 auto 6px; image-rendering:auto}
.chip figcaption{
  font-family:Cinzel,serif; font-size:10.5px; letter-spacing:.14em;
  font-variant-numeric:tabular-nums;
}
.band.light .chip figcaption{color:#7A7F95}
.band.dark .chip figcaption{color:#9BA0B4}
.note{font-size:13.5px; color:var(--ink-soft); margin:12px 0 0}
.shot{display:flex; gap:26px; align-items:flex-start; flex-wrap:wrap}
.shot img{
  width:min(300px,100%); border-radius:12px; border:1px solid var(--line);
  box-shadow:var(--shadow);
}
.shot div{flex:1; min-width:240px}
.swatches{display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-top:16px}
.sw{border:1px solid var(--line); border-radius:12px; overflow:hidden; background:var(--surface)}
.sw b{display:block; height:64px}
.sw p{margin:0; padding:10px 12px; font-size:13px; line-height:1.6}
.sw code{
  font-family:Cinzel,serif; font-size:12px; letter-spacing:.08em;
  color:var(--ink-soft); font-variant-numeric:tabular-nums;
}
ol.steps{margin:16px 0 0; padding-left:0; list-style:none; counter-reset:s}
ol.steps li{
  counter-increment:s; position:relative; padding-left:42px; margin-bottom:14px; font-size:14.5px;
}
ol.steps li::before{
  content:counter(s); position:absolute; left:0; top:1px;
  width:26px; height:26px; border-radius:50%; background:var(--blue); color:#fff;
  font-family:Cinzel,serif; font-size:12px; display:grid; place-items:center;
}
footer{margin-top:52px; padding-top:20px; border-top:1px solid var(--line); font-size:13px; color:var(--ink-soft)}
@media (max-width:560px){ .hero{padding:26px 22px; gap:22px} .hero img{width:120px;height:120px} }
</style>

<div class="wrap">
  <header class="hero">
    <img src="${app(512)}" alt="Anna のアプリアイコン">
    <div>
      <p class="eyebrow">合同会社 anna</p>
      <p class="script">Anna</p>
      <h1>AI支援記録Pro のアイコン</h1>
      <p class="lead">商品ラベルのロイヤルブルーとゴールドの花柄を、そのままソフトのアイコンにしました。文字はラベルと同じ筆記体です。</p>
    </div>
  </header>

  <div class="rule"><span></span><i></i><span></span></div>

  <section>
    <p class="eyebrow">App icon</p>
    <h2>実際の大きさ</h2>
    <p class="lead">ブラウザのタブやデスクトップに並んだときの見え方です。16〜48pxでは、細かい花柄を省いた「A」のモノグラムに自動で切り替わるので、小さくても潰れません。</p>
    <div class="band light">${strip(app, [16, 32, 48, 64, 128])}</div>
    <div class="band dark">${strip(app, [16, 32, 48, 64, 128])}</div>
  </section>

  <div class="rule"><span></span><i></i><span></span></div>

  <section>
    <p class="eyebrow">Folder icon</p>
    <h2>パソコンのフォルダー用</h2>
    <p class="lead">エクスプローラーのフォルダーに設定できる、フォルダー型のアイコンです。こちらも小さいサイズでは飾りを省いて、「Anna」が読めるようにしています。</p>
    <div class="band light">${strip(fd, [16, 32, 48, 64, 128])}</div>
    <div class="band dark">${strip(fd, [16, 32, 48, 64, 128])}</div>
  </section>

  <div class="rule"><span></span><i></i><span></span></div>

  <section>
    <p class="eyebrow">Product</p>
    <h2>ソフトを開いたときの画面</h2>
    <div class="card shot">
      <img src="${b64("shot_gate.png")}" alt="ライセンス認証画面">
      <div>
        <p>起動して最初に出るライセンス認証の画面です。アイコンを掲げ、配色をブランドカラーに揃えました。</p>
        <p class="note">認証のしくみ、ライセンスキー、アプリの機能には手を加えていません。変更したのは、アイコンの埋め込み・タイトル・この画面と起動画面の配色だけです。</p>
      </div>
    </div>
  </section>

  <div class="rule"><span></span><i></i><span></span></div>

  <section>
    <p class="eyebrow">Colors</p>
    <h2>ブランドカラー</h2>
    <p class="lead">チラシや名刺、メール署名に使うときは、この4色でまとめると統一感が出ます。</p>
    <div class="swatches">
      <div class="sw"><b style="background:#2F3C9E"></b><p>ロイヤルブルー<br><code>#2F3C9E</code></p></div>
      <div class="sw"><b style="background:#26317F"></b><p>ブルー（濃い側）<br><code>#26317F</code></p></div>
      <div class="sw"><b style="background:#F7C51A"></b><p>ゴールド<br><code>#F7C51A</code></p></div>
      <div class="sw"><b style="background:#C9990B"></b><p>ゴールド（濃い側）<br><code>#C9990B</code></p></div>
    </div>
  </section>

  <div class="rule"><span></span><i></i><span></span></div>

  <section>
    <p class="eyebrow">How to use</p>
    <h2>使いかた</h2>
    <ol class="steps">
      <li><b>お客様へ送る</b>：<code>Anna_AI支援記録Pro_v7.98.html</code> をそのままメールに添付します。アイコンはファイルの中に入っているので、他のファイルは要りません。</li>
      <li><b>ショートカットのアイコン</b>：ショートカットを右クリック →「プロパティ」→「アイコンの変更」→ <code>anna.ico</code> を選びます。</li>
      <li><b>フォルダーのアイコン</b>：<code>anna-folder.ico</code> と設定用のファイルをフォルダーに入れて、<code>フォルダーアイコンを設定.bat</code> をダブルクリックします。</li>
    </ol>
  </section>

  <footer>合同会社anna ／ Anna AI支援記録Pro v7.98 — サポート窓口：azu18ei20@gmail.com</footer>
</div>`;

const out = "/tmp/claude-0/-home-user-6262/9661a096-5f5d-51ab-834d-51eb6318b0f5/scratchpad/anna-brand-sheet.html";
fs.writeFileSync(out, html);
console.log(out, (fs.statSync(out).size / 1048576).toFixed(2), "MB");
