@echo off
setlocal EnableExtensions
chcp 932 >nul 2>&1
title Anna AI支援記録Pro ショートカット作成

echo.
echo ============================================================
echo   Anna AI支援記録Pro  デスクトップ ショートカット作成
echo ============================================================
echo.

set "SELFPATH=%~f0"
set "SRCDIR=%~dp0"
if "%SRCDIR:~-1%"=="\" set "SRCDIR=%SRCDIR:~0,-1%"

rem ---- 同じフォルダにある本体HTMLを探す ----------------------
set "HTMLNAME="
for %%F in ("%SRCDIR%\Anna_AI*.html") do if not defined HTMLNAME set "HTMLNAME=%%~nxF"
if not defined HTMLNAME for %%F in ("%SRCDIR%\*.html") do if not defined HTMLNAME set "HTMLNAME=%%~nxF"

if not defined HTMLNAME (
  echo   [エラー] このファイルと同じフォルダに本体の HTML が見つかりません。
  echo.
  echo   本体の HTML ファイルと、このファイルを同じフォルダに入れてから
  echo   もう一度実行してください。
  echo.
  pause
  exit /b 1
)

set "APPDIR=%LOCALAPPDATA%\Anna_AI"
set "ICONNAME=annafolder.ico"
set "ICOPATH=%APPDIR%\%ICONNAME%"
set "HTMLPATH=%SRCDIR%\%HTMLNAME%"
set "LNKNAME=Anna AI支援記録Pro.lnk"
set "LNKDESC=Anna AI支援記録Pro"

echo   本体ファイル : %HTMLNAME%
echo   保存場所     : %SRCDIR%
echo.

if not exist "%APPDIR%" mkdir "%APPDIR%" >nul 2>&1

rem ---- アイコンを用意する ------------------------------------
rem  (1) 同じフォルダに .ico があればそれを使う
rem  (2) 無ければ、このバッチ末尾に埋め込まれた画像を取り出す
set "ICONOK="
if exist "%SRCDIR%\%ICONNAME%" (
  copy /y "%SRCDIR%\%ICONNAME%" "%ICOPATH%" >nul 2>&1
  if exist "%ICOPATH%" set "ICONOK=1"
) else (
  call :EXTRACT_ICON
  if exist "%ICOPATH%" set "ICONOK=1"
)

rem ---- ショートカットを作成する ------------------------------
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$w = New-Object -ComObject WScript.Shell;" ^
 "$p = Join-Path ([Environment]::GetFolderPath('Desktop')) $env:LNKNAME;" ^
 "$s = $w.CreateShortcut($p);" ^
 "$s.TargetPath = $env:HTMLPATH;" ^
 "$s.WorkingDirectory = $env:SRCDIR;" ^
 "$s.Description = $env:LNKDESC;" ^
 "if (Test-Path -LiteralPath $env:ICOPATH) { $s.IconLocation = $env:ICOPATH + ',0' };" ^
 "$s.Save()"

if errorlevel 1 (
  echo.
  echo   [エラー] ショートカットを作成できませんでした。
  echo.
  pause
  exit /b 1
)

rem ---- アイコンキャッシュを更新 ------------------------------
ie4uinit.exe -show >nul 2>&1

echo.
if defined ICONOK (
  echo   デスクトップに専用アイコンのショートカットを作成しました。
) else (
  echo   デスクトップにショートカットを作成しました。
  echo   ※ 専用アイコンの画像が見つからなかったため、標準のアイコンです。
  echo      annafolder.ico を同じフォルダに入れて、もう一度実行してください。
)
echo.
echo   デスクトップの「Anna AI支援記録Pro」をダブルクリックすると起動します。
echo.
echo   ※ 本体の HTML ファイルを別のフォルダへ移動した場合は、
echo      移動先で、このファイルをもう一度実行してください。
echo.
pause
endlocal
exit /b 0

rem ============================================================
rem  末尾に埋め込んだ Base64 のアイコンを取り出す
rem ============================================================
:EXTRACT_ICON
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$src = Get-Content -LiteralPath $env:SELFPATH -Encoding Ascii;" ^
 "$m = $src | Select-String -SimpleMatch -Pattern ('ICON_BASE64' + '_BEGIN') | Select-Object -First 1;" ^
 "if (-not $m) { exit 1 };" ^
 "$b64 = ($src[$m.LineNumber..($src.Count-1)] | ForEach-Object { if ($_.StartsWith('::')) { $_.Substring(2) } else { $_ } }) -join '';" ^
 "$b64 = $b64.Trim();" ^
 "if ($b64.Length -lt 200) { exit 1 };" ^
 "[IO.File]::WriteAllBytes($env:ICOPATH, [Convert]::FromBase64String($b64))" >nul 2>&1
exit /b 0

goto :EOF
::ICON_BASE64_BEGIN
:: ここから下の行に annafolder.ico の Base64 データが入ります。
:: (icon_tool.py embed-bat で自動的に書き込まれます)
