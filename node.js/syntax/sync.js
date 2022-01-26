var fs = require('fs');


/* 
//readFileSync
console.log('start');
var result = fs.readFileSync('syntax/sample.txt' , 'utf8');
console.log(result);
console.log('end');
*/
//result : start -> test -> end

//readFile
console.log('start');
fs.readFile('syntax/sample.txt' , 'utf8', function(err, result){
    console.log(result);
});
console.log('end');
//result : start -> end -> test