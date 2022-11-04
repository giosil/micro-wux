#!/bin/bash

echo "Clean dist folder.."
rm -fr ./dist

echo "Compile WUX..."
tsc --declaration --project ./ts/wux/tsconfig.json

echo "Compile APP..."
tsc --noEmitHelpers --declaration --project ./ts/app/tsconfig.json

echo "Minify..."

# Install first https://www.npmjs.com/package/minifier
minify ./dist/wux.js
minify ./dist/app.js

# Install first https://www.npmjs.com/package/uglify-js
# Usage: uglifyjs input_file -c (compress) -o (output_file) output_file
# uglifyjs ./dist/wux.js -c -o ./dist/wux.min.js
# uglifyjs ./dist/app.js -c -o ./dist/app.min.js

