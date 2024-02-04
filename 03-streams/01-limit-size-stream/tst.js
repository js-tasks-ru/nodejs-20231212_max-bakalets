const stream = require('stream');
const fs = require('fs');
const { chunk } = require('lodash');


let str = fs.createWriteStream('dt1.txt');
let len = 0;


str.write('12345', ()=> {len += }
    // len += chunk.byteLength
    // console.log(len);
)


str.on('end', ()=> {console.log('end')})

str.on('close', ()=> {console.log('close')})