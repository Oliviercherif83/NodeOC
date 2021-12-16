const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 8080;

// tableau d'étudiant
const students = [
  { name: "Sonia", birth: "2019-14-05" },
  { name: "Antoine", birth: "2000-12-05" },
  { name: "Alice", birth: "1990-14-09" },
  { name: "Sophie", birth: "2001-10-02" },
  { name: "Bernard", birth: "1980-21-08" },
];
const server = (req, res) => {
  const url = req.url.replace("/", "");
  // pas de favicon pour l'instant
  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }
  if (url === "bootstrap") {
    // header de la réponse pour le client
    res.writeHead(200, { "Content-Type": "text/css" });
    const cssFile = fs.readFileSync("./assets/css/bootstrap.min.css", "utf-8");
    res.write(cssFile);
    res.end();
    return;
  }

  if (url === "") {
    let html = "<ul>";
    for (const { name } of students) {
      html += `<li>${name}</li>`;
    }
    html += "</ul>";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <title>Ajoutez un utilisateur</title>
        <link href="/bootstrap" rel="stylesheet" type="text/css" />
    </head>
    
    <body>
        <div class="container">
            <div class="row">
                ${html}
            </div>
        </div>
    
    </body>`);
    res.end();
    return;
  }
};
const app = http.createServer(server);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
