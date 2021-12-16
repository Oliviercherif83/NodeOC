// server.js
const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = "8080";

const students = [{ name: "Sonia" }, { name: "Antoine" }];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "bootstrap") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
    res.write(css);
    res.end();

    return;
  }

  if (url === "home") {
        res.writeHead(200, { 'Content-Type' : 'text/html;charset=utf8' });
        res.end(fs.readFileSync("./view/home.html", "utf-8"));
        return;
  }

  if (url==="" && req.method === "POST") {
    // Handle post info...
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: body }));
    });
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
