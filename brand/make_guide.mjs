import fs from "fs";
const b64 = (f) => "data:image/png;base64," + fs.readFileSync(f).toString("base64");
const ICON48 = b64("png-folder/anna-folder-48.png");
const ICON96 = b64("png-folder/anna-folder-128.png");
const TILE48 = b64("png/anna-48.png");

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<title>Annaアイコンの設定方法</title>
<style>
@page{ size:A4; margin:13mm 14mm; }
*{box-sizing:border-box}
body{
  margin:0; font-family:"Liberation Sans",Arial,"Yu Gothic","Hiragino Kaku Gothic ProN",Meiryo,"IPAGothic",sans-serif;
  color:#1B2140; font-size:10.5pt; line-height:1.75; -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
.head{display:flex; align-items:center; gap:14px; border-bottom:2px solid #F7C51A; padding-bottom:12px; margin-bottom:18px}
.head img{width:52px;height:52px}
.head h1{font-size:17pt; margin:0 0 2px; letter-spacing:.02em}
.head p{margin:0; font-size:9pt; color:#5C6288}
h2{
  font-size:11.5pt; margin:22px 0 8px; padding:5px 12px; color:#fff;
  background:#2F3C9E; border-radius:5px; display:inline-block;
}
.prep{background:#F6F8FE; border:1px solid #DDE3F6; border-left:4px solid #F7C51A; border-radius:6px; padding:12px 16px; margin:0}
.prep b{color:#2F3C9E}
ul.files{margin:8px 0 0; padding-left:20px}
ul.files li{margin-bottom:3px}
.step{display:flex; gap:16px; align-items:flex-start; margin:0 0 16px; break-inside:avoid}
.num{
  flex:none; width:26px; height:26px; border-radius:50%; background:#2F3C9E; color:#fff;
  font-size:11pt; font-weight:bold; display:flex; align-items:center; justify-content:center; margin-top:2px;
}
.body{flex:1}
.body p{margin:0 0 6px}
.fig{margin-top:8px}
.win{
  border:1px solid #B9BEC9; border-radius:4px; background:#fff; width:320px;
  box-shadow:0 2px 5px rgba(0,0,0,.13); font-size:8.5pt; overflow:hidden;
}
.win .bar{background:#F0F0F0; border-bottom:1px solid #DADADA; padding:5px 9px; font-size:8pt; color:#333}
.win .in{padding:9px 11px}
.menu{width:190px; border:1px solid #B9BEC9; background:#fff; box-shadow:0 2px 6px rgba(0,0,0,.16); font-size:8.5pt; border-radius:4px; overflow:hidden}
.menu div{padding:4px 12px; color:#333}
.menu div.on{background:#2F3C9E; color:#fff; font-weight:bold}
.tabs{display:flex; gap:3px; border-bottom:1px solid #DADADA; margin-bottom:9px}
.tabs span{padding:3px 9px; white-space:nowrap; font-size:8pt; color:#666; border:1px solid transparent}
.tabs span.on{background:#fff; border:1px solid #DADADA; border-bottom-color:#fff; color:#1B2140; font-weight:bold; border-radius:3px 3px 0 0}
.btn{display:inline-block; white-space:nowrap; border:1px solid #ADB2BD; background:#F4F4F4; border-radius:3px; padding:3px 10px; font-size:8pt}
.btn.on{border:2px solid #E0A800; background:#FFF6D9; font-weight:bold; color:#8A6200}
.field{border:1px solid #C6CEEA; background:#FBFCFF; border-radius:3px; padding:3px 7px; font-size:8pt; color:#5C6288}
.row{display:flex; align-items:center; gap:7px}
.row.hl{background:#2F3C9E; color:#fff; border-radius:3px; padding:2px 6px; font-weight:bold}
.done{
  display:flex; align-items:center; gap:14px; background:#F6F8FE; border:1px solid #DDE3F6;
  border-radius:8px; padding:14px 18px; margin-top:6px;
}
.done img{width:56px;height:56px}
.done b{color:#2F3C9E; font-size:11pt}
.warn{border:1px solid #E9D9A8; background:#FFFBEE; border-radius:6px; padding:11px 15px; font-size:9.5pt; margin-top:6px}
.warn b{color:#8A6200}
.warn ul{margin:5px 0 0; padding-left:19px}
.foot{margin-top:20px; padding-top:9px; border-top:1px solid #E5DCC7; font-size:8.5pt; color:#5C6288}
.pagebreak{break-before:page}
.note{font-size:9pt; color:#5C6288}
</style></head><body>

<div class="head">
  <img src="${ICON96}" alt="">
  <div>
    <h1>デスクトップのアイコンを Anna にする方法</h1>
    <p>Anna AI支援記録Pro ／ 合同会社anna</p>
  </div>
</div>

<p>Windowsでは、HTMLファイルのアイコンはブラウザのマークに自動で決まります。下の手順で<b>ショートカット</b>を作ると、デスクトップに Anna のアイコンを置くことができます。所要時間は1分ほどです。</p>

<h2>はじめに、2つのファイルをデスクトップに置いてください</h2>
<div class="prep">
  <ul class="files">
    <li><b>Anna_AI支援記録Pro_v7.98.html</b> … ソフト本体</li>
    <li><b>anna-folder.ico</b> … アイコン（メールに添付されています）</li>
  </ul>
  <p class="note" style="margin:8px 0 0">※ タイル型がお好みの方は <b>anna.ico</b> を使ってください。手順は同じです。</p>
</div>

<h2>設定の手順</h2>

<div class="step">
  <div class="num">1</div>
  <div class="body">
    <p><b>Anna_AI支援記録Pro_v7.98.html</b> を右クリックし、「<b>ショートカットの作成</b>」をクリックします。</p>
    <div class="fig"><div class="menu">
      <div>開く</div><div>プログラムから開く</div><div class="on">ショートカットの作成</div><div>削除</div><div>名前の変更</div><div>プロパティ</div>
    </div></div>
  </div>
</div>

<div class="step">
  <div class="num">2</div>
  <div class="body">
    <p>できた「<b>〜 - ショートカット</b>」を右クリックし、「<b>プロパティ</b>」をクリックします。</p>
  </div>
</div>

<div class="step">
  <div class="num">3</div>
  <div class="body">
    <p>上の「<b>ショートカット</b>」タブをクリックし、下のほうの「<b>アイコンの変更(C)...</b>」を押します。</p>
    <div class="fig"><div class="win">
      <div class="bar">〜 - ショートカットのプロパティ</div>
      <div class="in">
        <div class="tabs"><span>全般</span><span class="on">ショートカット</span><span>セキュリティ</span><span>詳細</span></div>
        <div class="row" style="margin-bottom:5px"><span style="width:64px">リンク先:</span><span class="field" style="flex:1">…\\Anna_AI支援記録Pro_v7.98.html</span></div>
        <div class="row" style="margin-bottom:9px"><span style="width:64px">作業フォルダー:</span><span class="field" style="flex:1">…\\Desktop</span></div>
        <div class="row"><span class="btn">ファイルの場所を開く</span><span class="btn on">アイコンの変更(C)...</span></div>
      </div>
    </div></div>
  </div>
</div>

<div class="step">
  <div class="num">4</div>
  <div class="body">
    <p>右上の「<b>参照(B)...</b>」を押します。</p>
    <div class="fig"><div class="win" style="width:300px">
      <div class="bar">アイコンの変更</div>
      <div class="in">
        <p style="margin:0 0 5px; font-size:8pt">このファイル内のアイコンを検索(L):</p>
        <div class="row"><span class="field" style="flex:1">%SystemRoot%\\System32\\SHELL32.dll</span><span class="btn on">参照(B)...</span></div>
      </div>
    </div></div>
  </div>
</div>

<div class="step">
  <div class="num">5</div>
  <div class="body">
    <p>左側の「<b>デスクトップ</b>」をクリックし、<b>anna-folder</b> を選んで「<b>開く</b>」を押します。</p>
    <div class="fig"><div class="win" style="width:250px">
      <div class="bar">開く　＞　デスクトップ</div>
      <div class="in">
        <div class="row hl"><img src="${ICON48}" style="width:16px;height:16px"><span>anna-folder</span></div>
      </div>
    </div></div>
  </div>
</div>

<div class="step">
  <div class="num">6</div>
  <div class="body">
    <p>Anna のアイコンが表示されたら、それをクリックして選び「<b>OK</b>」。続いて「<b>適用(A)</b>」→「<b>OK</b>」を押します。</p>
  </div>
</div>

<div class="done">
  <img src="${ICON96}" alt="">
  <div>
    <b>完成です</b><br>
    <span class="note">これからは、このアイコンをダブルクリックしてソフトを起動してください。</span>
  </div>
</div>

<div class="warn">
  <b>ご注意</b>
  <ul>
    <li><b>anna-folder.ico を削除・移動しないでください。</b>消すとアイコンが元に戻ります。</li>
    <li>元の <b>Anna_AI支援記録Pro_v7.98.html</b> も削除しないでください。ショートカットが開けなくなります。</li>
    <li>ショートカットの名前は、右クリック →「名前の変更」で自由に変えられます。</li>
  </ul>
</div>

<h2>Mac をお使いの場合</h2>
<p>Macでは .ico ファイルは使えません。代わりに、同じ絵の <b>anna-folder.png</b> をお使いください。</p>
<p style="margin:0">
① png をダブルクリックで開き、<b>command + A</b> → <b>command + C</b> でコピー<br>
② ファイルを右クリック →「<b>情報を見る</b>」<br>
③ 左上の小さいアイコンを1回クリックして選び、<b>command + V</b> で貼り付け
</p>

<div class="foot">
  ご不明な点は、下記までお気軽にお問い合わせください。<br>
  <b>合同会社anna</b>　azu18ei20@gmail.com
</div>

</body></html>`;

fs.writeFileSync("guide.html", html);
const { chromium } = await import(process.env.PW_MODULE || "playwright");
const b = await chromium.launch();
const p = await b.newPage();
await p.goto("file://" + process.cwd() + "/guide.html");
await p.waitForTimeout(800);
await p.pdf({
  path: "Annaアイコンの設定方法.pdf",
  format: "A4", printBackground: true,
  margin: { top: "13mm", bottom: "13mm", left: "14mm", right: "14mm" },
});
await b.close();
console.log("PDF:", fs.statSync("Annaアイコンの設定方法.pdf").size, "bytes");
