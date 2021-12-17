const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
require("dotenv").config();
const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;
const {
  utils: { addition, soustraction, multiplication },
} = require("./src/utils/calculate");
const { results } = require("./Data/results");

exports.server = (req, res) => {
  const url = req.url.replace("/", "");

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }

  if (url === "styles") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const cssFile = fs.readFileSync("./assets/css/styles.css", "utf-8");
    res.write(cssFile);
    res.end();

    return;
  }

  if (url === "" && req.method === "GET") {
    const home = fs.readFileSync("./views/home.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(ejs.render(home, { results }));
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
    // tous les data ont été reçu
    req.on("end", () => {
      const sanitize = body
        .toString()
        .trim()
        .split("&")
        .map((data) => {
          const [key, value] = data.split("=");
          return { [key]: value.trim() };
        });
      const { operator } = sanitize[2];
      if (operator === "plus") {
        const result = addition(
          parseInt(sanitize[0].number1),
          parseInt(sanitize[1].number2)
        );
        results.push({
          ...sanitize[0],
          ...sanitize[1],
          ...sanitize[2],
          ...(sanitize[3] = { result: result }),
        });
      }

      if (operator === "less") {
        const result = soustraction(
          parseInt(sanitize[0].number1),
          parseInt(sanitize[1].number2)
        );
        results.push({
          ...sanitize[0],
          ...sanitize[1],
          ...sanitize[2],
          ...(sanitize[3] = { result: result }),
        });
      }

      if (operator === "multiply") {
        const result = multiplication(
          parseInt(sanitize[0].number1),
          parseInt(sanitize[1].number2)
        );
        results.push({
          ...sanitize[0],
          ...sanitize[1],
          ...sanitize[2],
          ...(sanitize[3] = { result: result }),
        });
      }

      console.log(results);
      // 302 redirection non permanente pour retourner la page d'accueil
      res.writeHead(302, {
        Location: `http://${hostname}:${port}`,
      });

      res.end();
      return;
    });
  }

  if (url === "memory") {
    const memory = fs.readFileSync("./views/memory.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(ejs.render(memory, { results }));
    res.end();
    return;
  }
};

