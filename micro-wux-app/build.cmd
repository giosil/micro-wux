@echo off

echo Clean dist folder..
del /Q .\dist\*.*

echo Compile WUX...
call tsc --declaration --project ./ts/wux/tsconfig.json

echo Compile APP...
call tsc --noEmitHelpers --declaration --project ./ts/app/tsconfig.json

echo Minify...

rem Install first https://www.npmjs.com/package/minifier
call minify ./dist/wux.js
call minify ./dist/app.js

rem Install first https://www.npmjs.com/package/uglify-js
rem Usage: uglifyjs input_file -c (compress) -o (output_file) output_file
rem call uglifyjs ./dist/wux.js -c -o ./dist/wux.min.js
rem call uglifyjs ./dist/app.js -c -o ./dist/app.min.js

