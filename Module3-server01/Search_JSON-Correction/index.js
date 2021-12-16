// server.js
const http = require("http");
const fs = require('fs');

const hostname = 'localhost';
const port = '8080';

const names = ["alan", "alice", "antoine", "clarisse", "sonia", "bernard", "sophie"];

const server = http.createServer((req, res) => {
 
    const url = req.url.replace("/", "");

    if(url === "all"){
        const json = JSON.parse(fs.readFileSync('../Data/all.json', "utf-8") );
        console.log(json);
        res.writeHead(200, {
            "Content-Type" : "application/json"
        });

        console.log(json)

        res.end(JSON.stringify(json));

        return;
    }

    if(names.includes(url)){
        const json = JSON.parse(fs.readFileSync(`../Data/${url}.json`, "utf-8") );

        res.writeHead(200, {
            "Content-Type" : "application/json"
        });

        console.log(json)

        res.end(JSON.stringify(json));

        return;
    }

    res.writeHead(404,{
        "Content-Type" : "application/json"
    });

    res.end(JSON.stringify({ error : "404 Not Found"}));
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});