const token = '--version=';
const param = process.argv.find(a => a.startsWith(token))
let version = '';
if (param) {
    version = param.replace(token, '');
}
const tools = require('./post-build');
tools.postBuild('../dist/dev/', version)
