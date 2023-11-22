import * as fs from 'fs';
import * as path from 'path';

const action = process.argv[2];
if(!action) action = 'build';
console.log(action + '...');

switch (action) {
    case 'build':
        _concat({
            "folder": "dist",
            "output": "index.js",
            "files":  [
                'wux.js', 'app.js'
            ],
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
            "folder": "../single-spa-app/src",
            "output": "index.js",
            "from": "spa",
            "source": "index_with_import.js",
            "backup": true
        });
        break;
    default:
        console.log('Unknow action ' + action);
        break;
}

function _copy(options) {
    if(!options) options = {};

    let folder = options["folder"];
    let output = options["output"];
    let fromfl = options["from"];
    let source = options["source"];
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

    let folder = options["folder"];
    let output = options["output"];
    let files  = _getArray(options, "files");
    let header = _getArray(options, "header");
    let footer = _getArray(options, "footer");
    let backup = options["backup"];

    if(!folder) folder = 'dist';
    if(!output) output = 'index.js';

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
        let filepath = dest + '/' + filename;
        if(!fs.existsSync(filepath)) {
            console.error(filepath + " does not exist");
            return;
        }
        console.log("Read " + filepath + "...");
        let content = fs.readFileSync(dest + '/' + filename);
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
