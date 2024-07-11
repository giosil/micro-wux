@echo off

IF NOT EXIST spa\single-spa-app.js (
	echo File spa\single-spa-app.js does not exist
	exit /b 2
)

IF NOT EXIST dist\wux.min.js (
	echo File dist\wux.min.js does not exist
	exit /b 2
)

IF NOT EXIST dist\app.min.js (
	echo File dist\app.min.js does not exist
	exit /b 2
)

type spa\single-spa-app.js dist\wux.min.js dist\app.min.js > index.js

IF EXIST ..\single-spa-app\src\index.js.bak (
	del ..\single-spa-app\src\index.js.bak
)

echo Mantenere copia versione precedente? (S/N)
choice /M "Conferma"
if errorlevel 2 (
    echo Operazione annullata.
    goto deploy
) else (
    echo Copia backup...
    copy ..\single-spa-app\src\index.js ..\single-spa-app\src\index.js.bak
)

:deploy
move /Y index.js ..\single-spa-app\src\index.js