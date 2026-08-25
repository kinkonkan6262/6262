/*
 * Anna ブランディング適用ツール
 *   使い方: node apply_branding.mjs <入力HTML> <出力HTML>
 *
 * 販売版HTML（ライセンスキーを含むためリポジトリには置かない）に対して
 *   1. アイコン（favicon / ホーム画面アイコン）とメタ情報を埋め込む
 *   2. ライセンス認証画面をブランドカラー（ロイヤルブルー×ゴールド）に統一する
 * を行う。元のID・スクリプト・機能には一切手を加えない。
 */
import fs from "fs";

const BLUE = "#2F3C9E";
const BLUE_D = "#26317F";
const GOLD = "#F7C51A";
const GOLD_D = "#C9990B";

const b64 = (f) => fs.readFileSync(f).toString("base64");
const png = (s) => `data:image/png;base64,${b64(`png/anna-${s}.png`)}`;
const svgIcon = () =>
  "data:image/svg+xml," +
  encodeURIComponent(fs.readFileSync("anna-icon.svg", "utf8").replace(/\n\s*/g, " "));

// ===== 1. head に入れるブランド情報 =====
function headBlock() {
  return `
<!-- ===== Anna ブランドアイコン／製品メタ情報 ===== -->
<meta name="description" content="Anna AI支援記録Pro － 訪問看護・治療院向けのAI支援記録ソフト（合同会社anna）">
<meta name="author" content="合同会社anna">
<meta name="theme-color" content="${BLUE}">
<meta name="color-scheme" content="light">
<meta name="application-name" content="Anna AI支援記録Pro">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Anna">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="mobile-web-app-capable" content="yes">
<meta name="msapplication-TileColor" content="${BLUE}">
<meta property="og:title" content="Anna AI支援記録Pro">
<meta property="og:description" content="AIが支援記録づくりを手伝う、現場のためのソフト。">
<meta property="og:type" content="website">
<link rel="icon" type="image/png" sizes="16x16" href="${png(16)}">
<link rel="icon" type="image/png" sizes="32x32" href="${png(32)}">
<link rel="icon" type="image/png" sizes="48x48" href="${png(48)}">
<link rel="icon" type="image/png" sizes="64x64" href="${png(64)}">
<link rel="icon" type="image/png" sizes="128x128" href="${png(128)}">
<link rel="icon" type="image/png" sizes="192x192" href="${png(192)}">
<link rel="apple-touch-icon" sizes="180x180" href="${png(180)}">
<link rel="mask-icon" href="${svgIcon()}" color="${BLUE}">
<!-- ===== ここまで ===== -->
`;
}

// ===== 2. ブランド版ライセンス認証画面（IDと文言はそのまま） =====
function gateBlock() {
  const logo = png(192);
  return `<div id="licenseGate" style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(140deg,#F3F5FD 0%,#E3E8F8 45%,#D7DEF4 100%);font-family:Meiryo,sans-serif;padding:20px;">
  <div style="background:#fff;border:1px solid #D8DEF2;border-top:5px solid ${GOLD};border-radius:16px;box-shadow:0 14px 40px rgba(38,49,127,.22);max-width:460px;width:100%;padding:26px 24px 22px;">
    <div style="text-align:center;margin-bottom:20px;">
      <img src="${logo}" alt="Anna" width="92" height="92" style="width:92px;height:92px;display:block;margin:0 auto 12px;border-radius:20px;box-shadow:0 6px 18px rgba(38,49,127,.28);">
      <h1 style="font-size:21px;color:${BLUE};margin:6px 0 2px;letter-spacing:.03em;">Anna AI支援記録Pro</h1>
      <div style="font-size:10.5px;color:${GOLD_D};font-weight:bold;letter-spacing:.34em;margin-bottom:8px;">PREMIUM</div>
      <div style="display:inline-block;font-size:12.5px;color:${BLUE};font-weight:bold;background:#EEF1FB;border:1px solid #D5DCF3;border-radius:999px;padding:4px 14px;">ライセンス認証</div>
      <div style="font-size:11.5px;color:#6A73A6;margin-top:8px;">お試し版：15日間 ／ 製品版：利用期限なし</div>
    </div>

    <label style="font-size:13px;font-weight:bold;color:${BLUE};">ライセンスキー</label>
    <input id="licenseInput" type="text" placeholder="ライセンスキーを入力してください"
      style="width:100%;padding:12px;margin:7px 0 12px;border:1px solid #C6CEEA;border-radius:9px;font-size:16px;box-sizing:border-box;background:#FBFCFF;">

    <button id="licenseBtn"
      style="width:100%;padding:13px;background:linear-gradient(180deg,${BLUE},${BLUE_D});color:#fff;border:none;border-radius:9px;font-size:15px;font-weight:bold;cursor:pointer;letter-spacing:.06em;box-shadow:0 4px 12px rgba(38,49,127,.3);">
      認証して開始
    </button>

    <div id="licenseMessage" style="margin-top:12px;font-size:13px;line-height:1.7;color:#C62828;min-height:24px;"></div>

    <div style="margin-top:14px;padding:11px 12px;background:#F6F8FE;border:1px solid #E1E6F6;border-left:3px solid ${GOLD};border-radius:8px;font-size:12px;color:#3B4478;line-height:1.75;">
      <b style="color:${BLUE};">販売元・サポート窓口</b><br>
      合同会社anna<br>
      azu18ei20@gmail.com
    </div>
    <div style="margin-top:12px;text-align:center;">
      <button id="resetBtn" style="background:none;border:none;color:#9AA1C4;font-size:11px;cursor:pointer;text-decoration:underline;">
        🔄 認証情報をリセットして入力しなおす
      </button>
    </div>
  </div>
</div>`;
}

// ===== 実行 =====
const [src, dest] = process.argv.slice(2);
if (!src || !dest) { console.error("使い方: node apply_branding.mjs <入力HTML> <出力HTML>"); process.exit(1); }
let html = fs.readFileSync(src, "utf8");

// 二重適用の防止
if (html.includes("Anna ブランドアイコン／製品メタ情報")) {
  console.error("この HTML には既にブランディングが適用されています。"); process.exit(1);
}

// (a) タイトルを製品名に統一し、head へブランド情報を挿入
const titleRe = /<title>([\s\S]*?)<\/title>/;
const tm = html.match(titleRe);
if (!tm) throw new Error("<title> が見つかりません");
const ver = (tm[1].match(/v[\d.]+/) || [""])[0];
const newTitle = `<title>Anna AI支援記録Pro${ver ? " " + ver : ""}</title>`;
html = html.replace(titleRe, newTitle + headBlock());

// (b) 認証画面の差し替え
const gs = html.indexOf('<div id="licenseGate"');
const ge = html.indexOf("<script>\n// ===== ローカルライセンス認証", gs);
if (gs < 0 || ge < 0) throw new Error("ライセンス認証画面のブロックが見つかりません");
const before = html.slice(0, gs);
const after = html.slice(ge);
html = before + gateBlock() + "\n\n" + after;

// (c) 起動待ち画面もブランド色へ
html = html.replace(
  'id="bootMsg" style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Meiryo,sans-serif;background:#E8F5E9;padding:20px;text-align:center;"',
  'id="bootMsg" style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Meiryo,sans-serif;background:linear-gradient(140deg,#F3F5FD,#DCE2F6);padding:20px;text-align:center;"'
);
html = html.replace('id="bootTitle" style="color:#1B5E20;', `id="bootTitle" style="color:${BLUE};`);

fs.writeFileSync(dest, html);
console.log(`ブランディング適用: ${dest}（${(fs.statSync(dest).size / 1048576).toFixed(2)} MB）`);
