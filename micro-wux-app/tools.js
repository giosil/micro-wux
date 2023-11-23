// const fs   = require("fs");
// const path = require("path");
import * as fs   from 'fs';
import * as path from 'path';
import * as os   from 'os';

const action = process.argv[2];
if(!action) action = 'build';
console.log(action + ' on ' + os.platform() + '...');

switch (action) {
    case 'build':
        _concat({
            "from":   "dist",
            "files":  [ 'wux.js', 'app.js' ],
            "folder": "dist",
            "output": "index.js",
            "header": [
                '// Build at ' + new Date().toLocaleString()
            ],
            "footer": [
                'export {WuxDOM, WUX};',
                'export default APP;',
            ], 
            "backup": true
        });
        break;
    case 'deploy':
        _copy({
            "from":   "dist",
            "source": "index.js",
            "folder": "../single-spa-app/src",
            "output": "micro-wux-app.js",
            "backup": true
        });
        _copy({
            "from":   "spa",
            "source": "index_imp.js",
            "folder": "../single-spa-app/src",
            "output": "index.js",
            "backup": true
        });
        break;
    default:
        console.log('Unknow action ' + action);
        break;
}

function _copy(options) {
    if(!options) options = {};

    // From folder / file
    let fromfl = options["from"];
    let source = options["source"];
    // To folder / file
    let folder = options["folder"];
    let output = options["output"];
    // Backup flag
    let backup = options["backup"];

    if(!folder) folder = 'dist';
    if(!output) output = 'index.js';
    if(!fromfl) fromfl = 'src';
    if(!source) source = 'index.js';

    let dest = path.resolve(process.cwd(), folder);
    let fout = dest + '/' + output;

    let frmf = path.resolve(process.cwd(), fromfl);
    let fsrc = frmf + '/' + source;

    // Move output file to .bak
    if(backup) {
        let bout = fout + '.bak';
        if(fs.existsSync(bout)) {
            fs.unlinkSync(bout);
            console.log(bout + " deleted");
        }
        if(fs.existsSync(fout)) {
            fs.renameSync(fout, bout);
            console.log(fout + " moved to *.bak");
        }
    }

    // Delete previous output file
    if(fs.existsSync(fout)) {
        fs.unlinkSync(fout);
        console.log(fout + " deleted");
    }

    fs.copyFileSync(fsrc, fout);

    console.log(fout + " deployed");
}

function _concat(options) {
    if(!options) options = {};

    // From 
    let fromfl = options["from"];
    let files  = _getArray(options, "files");
    // To
    let folder = options["folder"];
    let output = options["output"];
    // Header and footer
    let header = _getArray(options, "header");
    let footer = _getArray(options, "footer");
    // Backup flag
    let backup = options["backup"];

    if(!fromfl) fromfl = 'dist'
    if(!folder) folder = 'dist';
    if(!output) output = 'index.js';

    let frmf = path.resolve(process.cwd(), fromfl);
    let dest = path.resolve(process.cwd(), folder);
    let fout = dest + '/' + output;

    // Move output file to .bak
    if(backup) {
        let bout = fout + '.bak';
        if(fs.existsSync(bout)) {
            fs.unlinkSync(bout);
            console.log(bout + " deleted");
        }
        if(fs.existsSync(fout)) {
            fs.renameSync(fout, bout);
            console.log(fout + " moved to *.bak");
        }
    }

    // Delete previous output file
    if(fs.existsSync(fout)) {
        fs.unlinkSync(fout);
        console.log(fout + " deleted");
    }

    // Append rows from header
    header.forEach((row) => {
        fs.appendFileSync(fout, row);
        fs.appendFileSync(fout, '\n');
    });

    // Append files
    files.forEach((filename) => {
        let filepath = frmf + '/' + filename;
        if(!fs.existsSync(filepath)) {
            console.error(filepath + " does not exist");
            return;
        }
        console.log("Read " + filepath + "...");
        let content = fs.readFileSync(filepath);
        if(content) {
            fs.appendFileSync(fout, content);
            fs.appendFileSync(fout, '\n');
        }
    });

    // Append rows from footer
    footer.forEach((row) => {
        fs.appendFileSync(fout, row);
        fs.appendFileSync(fout, '\n');
    });
    console.log(fout + " written");
}

function _getArray(options, key) {
    if(!options) return [];
    if(!key) return [];
    let result = options[key];
    if(!result) return [];
    if(Array.isArray(result)) return result;
    return [result];
}
