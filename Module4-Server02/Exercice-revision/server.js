const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080;
const { students } = require("./Data/students");
// tableau d'étudiant
/*
const students = [
  { name: "Sonia", birth: "2019-14-05" },
  { name: "Antoine", birth: "2000-12-05" },
  { name: "Alice", birth: "1990-14-09" },
  { name: "Sophie", birth: "2001-10-02" },
  { name: "Bernard", birth: "1980-21-08" },
];*/

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
  if (url === "" && req.method === "GET") {
    const home = fs.readFileSync("./views/home.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(home);
    res.end();
    return;
  }

  if (url === "" && req.method === "POST") {
    let body = "";
    req.on("data", (data) => {
      // On peut caster les data qui arrivent en binaire en toString pour les traiter dans l'application sous forme d'une chaine de caractères
      //console.log(data.toString())
      body += data;
    });

    req.on("end", () => {
      const replacer = new RegExp(/\+/, "g");
      const sanitize = body
        .toString()
        .trim()
        .replace(replacer, " ")
        .split("&")
        .map((data) => {
          // on assigne par décomposition en splittant avec =
          const [key, value] = data.split("=");

          // on retourne un littéral constitué d'une clé, attention pensez à mettre des crochets pour que JS interprété la clé comme une valeur
          return { [key]: value.trim() };
        });

      students.push({ ...sanitize[0], ...sanitize[1] });
      res.writeHead(302, {
        Location: `http://${hostname}:${port}`,
      });
      res.end();
      return;
    });
  }
  if (url === "students") {
    //const students = fs.readFileSync("../Data/students.js", "utf-8");
    let html = "<ul>";
    for (const { name, birth } of students) {
      html += `<li>étudiant ${name}, née le ${birth}</li>`;
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
