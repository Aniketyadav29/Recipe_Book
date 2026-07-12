@echo off
setlocal

echo ==========================================
echo    Creating RecipeBook Desktop Shortcut   
echo ==========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([System.IO.Path]::Combine([System.Environment]::GetFolderPath('Desktop'), 'RecipeBook.lnk')); $Shortcut.TargetPath = '%~dp0START-RECIPE-APP.bat'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.IconLocation = 'shell32.dll,14'; $Shortcut.Save()"

if exist "%USERPROFILE%\Desktop\RecipeBook.lnk" (
    echo [SUCCESS] Shortcut 'RecipeBook' has been created on your Desktop!
    echo           You can now double-click it to start the server and open the app.
) else (
    echo [ERROR] Failed to create desktop shortcut.
)

echo.
pause
