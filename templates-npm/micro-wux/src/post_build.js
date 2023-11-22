import * as fs from 'fs';

fs.appendFile('dist/index.js', '\nexport {WuxDOM, WUX};', function (err) {
  if (err) throw err;
  console.log('post build executed successfully.');
});