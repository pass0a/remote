var execSync = require('child_process').execSync;
var result = execSync('adb exec-out screencap > e:/test.raw');
console.log(result.toString());
