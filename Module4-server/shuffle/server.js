const http = require("http"); // module de Node.js
const {tabsShuffles} = require("./src/utils");
// sur votre machine adresse locale
const hostname = "localhost";
// port
const port = "8080";

const users = ["Alan", "Sophie", "Bernard", "Elie"];
const result = tabsShuffles(users);
console.log(result);
const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end();
    return;
  }

  if (url === "") {
    res.writeHead(200, {
      "Content-Type": "text/html;charset=utf8",
    });
    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Shuffle</title>
            </head>
            <body>
                <p><a href="/shuffle">Shuffle</a></p>
            </body>
        </html>
        
    `);

  }

  if (url === "shuffle") {
    tabsShuffles(users);
    console.log(users);

    res.end(`notre tableau : ${users}`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});