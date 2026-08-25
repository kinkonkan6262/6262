#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""配布用アイコン組み込みツール

1) embed-bat  : annafolder.ico を「ショートカット作成.bat」の末尾に埋め込む
                → お客様に渡すのは HTML と bat の 2 ファイルだけで済む
2) embed-html : HTML 本体の <head> にファビコン（data URI）を埋め込む
                → ブラウザのタブ・お気に入り・スマホのホーム画面に絵が出る

使い方:
  python3 icon_tool.py embed-bat  annafolder.ico ショートカット作成.bat
  python3 icon_tool.py embed-html annafolder.ico Anna_AI支援記録Pro_v7.98.html
"""
import base64
import re
import struct
import sys
from pathlib import Path

MARKER = "::ICON_BASE64" + "_BEGIN"
BAT_ENCODING = "cp932"


def _b64_lines(data: bytes, width: int = 76) -> list:
    b64 = base64.b64encode(data).decode("ascii")
    return [b64[i:i + width] for i in range(0, len(b64), width)]


def embed_bat(ico: Path, bat: Path) -> None:
    text = bat.read_text(encoding=BAT_ENCODING)
    if MARKER not in text:
        sys.exit(f"エラー: {bat} に埋め込み位置の目印 ({MARKER}) がありません。")
    head = text.split(MARKER)[0]
    body = "\r\n".join("::" + line for line in _b64_lines(ico.read_bytes()))
    out = head + MARKER + "\r\n" + body + "\r\n"
    bat.write_text(out.replace("\r\n", "\n").replace("\n", "\r\n"), encoding=BAT_ENCODING, newline="")
    print(f"OK: {ico.name} ({ico.stat().st_size:,} バイト) を {bat.name} に埋め込みました "
          f"→ {bat.stat().st_size:,} バイト")


def _ico_to_png_or_ico(ico: Path) -> tuple:
    """.ico の中に PNG 形式の画像が入っていればそれを取り出す（無ければ .ico のまま使う）。"""
    data = ico.read_bytes()
    # 拡張子ではなく中身で判定する（.ico を .png にリネームして渡された場合も正しく扱う）
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png", data
    if len(data) >= 6 and data[:4] == b"\x00\x00\x01\x00":
        count = struct.unpack("<H", data[4:6])[0]
        best = None
        for i in range(count):
            off = 6 + i * 16
            entry = data[off:off + 16]
            if len(entry) < 16:
                break
            w = entry[0] or 256
            size, offset = struct.unpack("<II", entry[8:16])
            blob = data[offset:offset + size]
            if blob[:8] == b"\x89PNG\r\n\x1a\n" and (best is None or w > best[0]):
                best = (w, blob)
        if best:
            return "image/png", best[1]
    return "image/x-icon", data


def embed_html(ico: Path, html: Path) -> None:
    mime, blob = _ico_to_png_or_ico(ico)
    uri = f"data:{mime};base64,{base64.b64encode(blob).decode('ascii')}"
    tags = (
        f'<link rel="icon" type="{mime}" href="{uri}">\n'
        f'<link rel="apple-touch-icon" href="{uri}">\n'
        f'<meta name="apple-mobile-web-app-capable" content="yes">\n'
        f'<meta name="mobile-web-app-capable" content="yes">\n'
    )
    text = html.read_text(encoding="utf-8")
    text = re.sub(r'\s*<link rel="(?:icon|apple-touch-icon)"[^>]*>', "", text)
    text = re.sub(r'\s*<meta name="(?:apple-mobile-web-app-capable|mobile-web-app-capable)"[^>]*>', "", text)
    m = re.search(r"<head[^>]*>", text, re.IGNORECASE)
    if not m:
        sys.exit(f"エラー: {html} に <head> が見つかりません。")
    out = text[:m.end()] + "\n" + tags + text[m.end():]
    backup = html.with_suffix(html.suffix + ".bak")
    backup.write_text(text, encoding="utf-8")
    html.write_text(out, encoding="utf-8")
    print(f"OK: {html.name} にファビコン ({mime}, {len(blob):,} バイト) を埋め込みました "
          f"（元ファイルは {backup.name} に保存）")


def main() -> None:
    if len(sys.argv) != 4 or sys.argv[1] not in ("embed-bat", "embed-html"):
        sys.exit(__doc__)
    cmd, ico, target = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
    for p in (ico, target):
        if not p.is_file():
            sys.exit(f"エラー: {p} が見つかりません。")
    (embed_bat if cmd == "embed-bat" else embed_html)(ico, target)


if __name__ == "__main__":
    main()
