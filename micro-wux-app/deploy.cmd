@echo off

IF NOT EXIST spa\index.js (
	echo File spa\index.js does not exist
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

type spa\index.js dist\wux.min.js dist\app.min.js > index.js

IF EXIST ..\single-spa-app\src\index.js.bak (
	delete ..\single-spa-app\src\index.js.bak
)

copy ..\single-spa-app\src\index.js ..\single-spa-app\src\index.js.bak

copy /Y index.js ..\single-spa-app\src\index.js