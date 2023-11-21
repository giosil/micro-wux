import * as fs from 'fs';
import * as path from 'path';

console.log("Build start...");

let dist = path.resolve(process.cwd(), "dist");

let index = dist + '/index.js';

if(fs.existsSync(index)) {
    fs.unlinkSync(index);
    console.log(index + " deleted.");
}

let files = ["wux.js", "app.js"];

files.forEach((filename) => {
    let filepath = dist + '/' + filename;
    if(!fs.existsSync(filepath)) {
        console.error(filepath + " does not exist.");
        return;
    }
    console.log("Read " + filepath + "...");
    let content = fs.readFileSync(dist + '/' + filename);
    if(content) {
        console.log("    append do " + index + "...");
        fs.appendFileSync(index, content);
        fs.appendFileSync(index, '\n');
    }
});

console.log("Close " + index + "...");
fs.appendFileSync(index, '\nexport {WuxDOM, WUX};\nexport default APP;');

console.log("Build end.");