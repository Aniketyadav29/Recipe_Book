@echo off
setlocal

echo ==========================================
echo    Setting up RecipeBook Startup Run      
echo ==========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([System.IO.Path]::Combine([System.Environment]::GetFolderPath('Startup'), 'RecipeBookServer.lnk')); $Shortcut.TargetPath = '%~dp0START-RECIPE-APP.bat'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.WindowStyle = 7; $Shortcut.Save()"

echo [SUCCESS] Startup shortcut 'RecipeBookServer' has been created!
echo           The server will now start automatically (minimized in the background)
echo           every time you boot your computer.
echo.
pause
