import * as fs from 'fs';

fs.appendFile('dist/index.js', '\nimport {WuxDOM, WUX} from "micro-wux";\nexport default APP;', function (err) {
  if (err) throw err;
  console.log('post build executed successfully.');
});