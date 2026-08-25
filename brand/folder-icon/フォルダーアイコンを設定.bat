@echo off
chcp 932 >nul
setlocal
rem === Anna フォルダーアイコン設定 ===
rem このファイルを、アイコンを変えたいフォルダーに anna-folder.ico と一緒に置いて実行してください。
set "F=%~dp0"

if not exist "%F%anna-folder.ico" (
  echo anna-folder.ico が同じフォルダーに見つかりません。
  echo 2つのファイルを同じフォルダーに置いてから、もう一度実行してください。
  pause
  exit /b 1
)

attrib -h -s "%F%desktop.ini" >nul 2>&1
> "%F%desktop.ini" echo [.ShellClassInfo]
>>"%F%desktop.ini" echo IconResource=anna-folder.ico,0
>>"%F%desktop.ini" echo IconFile=anna-folder.ico
>>"%F%desktop.ini" echo IconIndex=0
attrib +h +s "%F%desktop.ini"
attrib +r "%F%."

echo.
echo フォルダーのアイコンを Anna に設定しました。
echo エクスプローラーを開き直す（または F5 キー）と反映されます。
echo.
pause
