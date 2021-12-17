const http = require("http");

const { server } = require("./server");

require("dotenv").config();

const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;

const app = http.createServer(server);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
