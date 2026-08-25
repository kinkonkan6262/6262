import fs from "fs";
// Windows ショートカット用 .ico（PNG 埋め込み形式：Vista 以降で利用可）
function build(dir, prefix, out) {
const sizes = [16, 32, 48, 64, 128, 256];
const imgs = sizes.map((s) => ({ s, buf: fs.readFileSync(`${dir}/${prefix}-${s}.png`) }));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(imgs.length, 4);
const dirBuf = Buffer.alloc(16 * imgs.length);
let offset = 6 + 16 * imgs.length;
imgs.forEach((im, i) => {
  const o = i * 16;
  dirBuf[o] = im.s >= 256 ? 0 : im.s;
  dirBuf[o + 1] = im.s >= 256 ? 0 : im.s;
  dirBuf[o + 2] = 0; dirBuf[o + 3] = 0;
  dirBuf.writeUInt16LE(1, o + 4); dirBuf.writeUInt16LE(32, o + 6);
  dirBuf.writeUInt32LE(im.buf.length, o + 8); dirBuf.writeUInt32LE(offset, o + 12);
  offset += im.buf.length;
});
fs.writeFileSync(out, Buffer.concat([header, dirBuf, ...imgs.map((i) => i.buf)]));
console.log(out, fs.statSync(out).size, "bytes");
}

build("png", "anna", "anna.ico");                       // アプリ・ショートカット用
build("png-folder", "anna-folder", "anna-folder.ico");  // フォルダー用
