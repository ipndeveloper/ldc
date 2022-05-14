const args = process.argv.slice(2);

let origin = "uat-bb";
let destiny = "ldc-prd-bb";

if (args && args.length === 2) {
    origin = args[0];
    destiny = args[1];
}

const toReplace = ['frontUrl', 'apiUrl', 'name']

const path = require('path');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

let mainBundleFile = '';
let mainBundleRegexp = /^main.?([a-z0-9]*)?(\.bundle)?.js$/;

const pathMainFolder = path.join(__dirname, '/../../ldc-yard/')
readDir(pathMainFolder)
  .then(files => {
    mainBundleFile = files.find(f => mainBundleRegexp.test(f));

    const mainFilepath = path.join(pathMainFolder, mainBundleFile);
    return readFile(mainFilepath, 'utf8')
        .then(mainFileData => {
            const originEnv = require('./environment.' + origin + '.ts').environment;
            const destinyEnv = require('./environment.' + destiny + '.ts').environment;

            let replacedFile = mainFileData;
            for (let prop of toReplace) {
                replacedFile = replacedFile.replace(originEnv[prop], destinyEnv[prop]);
            }

            return writeFile(mainFilepath, replacedFile).then(() => {
                console.log('main.js replaced');
            });
        });

  });