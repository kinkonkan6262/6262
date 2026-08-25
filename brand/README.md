# Anna ブランドアイコン一式

商品ラベル（ロイヤルブルー × ゴールドの花柄）をモチーフにした、
「Anna AI支援記録Pro」用のアイコンとブランド適用ツールです。

## ブランドカラー

| 用途 | 色 |
| --- | --- |
| ロイヤルブルー（基調） | `#2F3C9E`（濃い側 `#26317F`） |
| ゴールド（差し色） | `#F7C51A`（濃い側 `#C9990B`） |
| 文字（白） | `#FFFFFF` |

## 収録ファイル

| ファイル | 内容 |
| --- | --- |
| `anna-icon.svg` | アイコン本体（花のリース＋筆記体 Anna〈商品ラベルと同じ書体〉＋金の飾り罫）。拡大しても劣化しません |
| `anna-icon-small.svg` | 16〜48px 用の簡略版（A のモノグラム）。小さくても潰れません |
| `png/anna-*.png` | 16／32／48／64／128／180／192／256／512／1024 px の PNG |
| `anna.ico` | Windows のショートカット・デスクトップアイコン用（6サイズ入り） |
| `anna-folder.svg` | フォルダー型アイコン（フォルダーの形＋筆記体 Anna） |
| `anna-folder-small.svg` | 16〜48px 用のフォルダー型簡略版 |
| `png-folder/anna-folder-*.png` | フォルダー型の PNG 一式 |
| `anna-folder.ico` | Windows のフォルダーアイコン差し替え用 |
| `folder-icon/` | フォルダーアイコン設定キット（.ico ＋ 設定用 .bat ＋ 説明書） |
| `preview.png` / `folder_preview.png` / `folder_small.png` | 各サイズの見え方の確認用画像 |
| `make_sheet.mjs` / `shot_gate.png` | ブラウザで見られる紹介ページ（ブランドシート）の生成スクリプトと素材 |

### 使いかた（アイコン）

- **Windows のショートカットに設定**：ショートカットを右クリック →「プロパティ」→「アイコンの変更」→ `anna.ico` を選択。
- **iPhone / iPad のホーム画面**：Safari で HTML を開き「ホーム画面に追加」。アイコンは自動で適用されます。
- **チラシ・名刺・メール署名など**：`png/anna-512.png` または `anna-icon.svg` を使ってください。

### 使いかた（パソコンのフォルダーのアイコン）

`folder-icon/` の中身をそのまま配布・利用できます。

- **手作業**：フォルダーを右クリック →「プロパティ」→「カスタマイズ」タブ →「アイコンの変更」→ `anna-folder.ico` を選択。
- **自動**：`anna-folder.ico` と `フォルダーアイコンを設定.bat` を対象フォルダーに入れて、bat をダブルクリック
  （`desktop.ini` を作成し、フォルダーに読み取り専用属性を付けてアイコンを反映させます）。
- 元に戻すときは、そのフォルダーの `desktop.ini`（隠しファイル）を削除します。

## 販売版HTMLへのブランド適用

販売版HTML（ライセンスキーを含むため、このリポジトリには置きません）に対して、
アイコンと製品メタ情報の埋め込み・ライセンス認証画面のブランド統一を行います。

```bash
cd brand
npm install                      # 初回のみ（opentype.js とフォント）
node apply_branding.mjs 入力.html 出力.html
```

適用される内容は次の 4 点だけで、アプリ本体のスクリプトや機能には一切手を加えません。

1. `<title>` を `Anna AI支援記録Pro v○.○○` に統一
2. `<head>` にアイコン（favicon／ホーム画面アイコン）と製品メタ情報を追加
   （すべて data URI で埋め込むため、HTML 1 ファイルだけで動きます）
3. ライセンス認証画面をブランドカラーに変更し、アイコンを掲出（ID・文言はそのまま）
4. 起動待ち画面の配色をブランドカラーに変更

## アイコンを作り直す

```bash
export PW_MODULE=$(npm root -g)/playwright/index.mjs   # Playwright が global の場合
node build_icons.mjs     # SVG を生成
node gen_png.mjs         # PNG 一式を書き出し
node make_ico.mjs        # .ico を作成
node preview.mjs         # preview.png で見え方を確認
```

`icon_core.mjs` に花・葉・蔓の描画、`build_icons.mjs` に全体の構成、
`mkword.mjs` に文字のベクター化（Alex Brush／Cinzel、SIL OFL）が入っています。
書き出し後のアイコンはすべてパス化されているため、フォントは不要です。

## 紹介ページ（ブランドシート）

アイコンを実寸で確認できる 1 枚ページを書き出します。画像はすべて data URI で
埋め込まれるため、HTML 1 ファイルだけで表示できます。

```bash
node make_sheet.mjs      # anna-brand-sheet.html を書き出す
```

認証画面のスクリーンショット `shot_gate.png` を差し替えると、ページの
「ソフトを開いたときの画面」も新しくなります。
