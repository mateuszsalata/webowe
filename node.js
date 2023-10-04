const http = require('http');
const fs = require('fs').promises;

const hostname = "127.0.0.1";
const port = 8000;

const server = http.createServer(async (req, res) => {
  const url = req.url;

  if (url === "/") {
    res.statusCode = 200;
    const html = await fs.readFile("./templates/index.html");

    res.setHeader("content-type", "text/html");

    res.end(html);
  } else if(url === '/dziekujemy'){
    res.statusCode = 200
    const html = await fs.readFile("./templates/thanks.html")

    res.setHeader("content-type", "text/html")
    res.end(html)
  } else if(url === '/api'){
    res.statusCode = 200

    res.setHeader("content-type", "application/json")

    class dowolna {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }
    const object1 = new dowolna("obojetnie jak", 13);
    const object2 = new dowolna("obojetnie jak2", 12);
    const object3 = new dowolna("obojetnie jak3", 14);

    const json1 = {
      ArrayObject: [
        object1,
        object2,
        object3
      ]
    }

    res.end(JSON.stringify(json1));
  }

  else if (url === '/kontakt' && req.method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      console.log(chunk.toString())
      body.push(chunk)
    })

    req.on('end', async () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      await fs.writeFile(`contact/message-${Date.now().toString()}.txt`, message)

      res.statusCode = 302
      res.setHeader("Location", "/dziekujemy")
      return res.end()
      })
  }
  else {
    res.setHeader("content-type", "application/json")
    res.statusCode = 404

    const json2 = {
      message: "ERROR 404"
    }

    res.end(JSON.stringify(json2));

  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});