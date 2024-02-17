const stream = require('stream');
const fs = require('fs');
const { chunk } = require('lodash');


let str = fs.createReadStream('dt1.txt');
let len = 0;


str.on('data', (chunk)=> {
    console.log(chunk)
}
    // len += chunk.byteLength
    // console.log(len);
)


// str.on('end', ()=> {console.log('end')})

// str.on('close', ()=> {console.log('close')})