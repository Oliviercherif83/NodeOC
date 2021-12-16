const http = require("http"); // module de Node.js
const { utils : {shuffle, showUsers} } = require('./src/utils');

// sur votre machine adresse locale
const hostname = "localhost";
// port
const port = "8080";
const users = ["Alan", "Sophie", "Bernard", "Elie"];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    // termine la réponse retournée au navigateur
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
    shuffle(users);

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
                ${showUsers(users)}
            </body>
        </html>
    `);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});