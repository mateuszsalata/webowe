const stream = require('stream');
const fs = require('fs');

async function * generator() {
    for(var i=0; i<20; i++) {
        yield Math.floor((Math.random() * (2137+420)) -420).toString() + '\n';        
    }
}

const readable = stream.Readable.from(generator())
const writable = fs.createWriteStream('random-' + Date.now() + '.txt')

readable.on('data', (chunk) => {
    writable.write(chunk)
})

// stream.pipeline(readable, writable, (e)=> { //przekazuje z jednego steram do drugiego
//     if (e) {
//         console.log("Błąd")
//     }
//     else {
//         console.log("Udane")
//     }
// })