// serverjs
const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = "8080";

const server = http.createServer((req, res) => {

  // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result: body }));
  });
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*const readline = require("readline");

const {
  chiffoumi: { state, run },
} = require("./chiffoumi");

// interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`
Pour arrêter Chiffoumi tapez stop et pour commencer tapez start.
`);

rl.setPrompt("OHAI> ");
rl.prompt();

let count = 0;

rl.on("line", (line) => {
  line = line.trim().toString();
  const options = ["start", "stop"];

  if (options.includes(line) === false) {
    console.log(`Attention ${line} n'est pas une bonne option`);
    rl.prompt();
  }

  if (line == "start") {
    if (run() == state.max) {
      rl.close();

      return;
    }

    rl.prompt();

    return;
  }

  if (line == "stop") {
    rl.close();
  }
}).on("close", () => {
  console.log(state);

  process.exit(0);
});*/
