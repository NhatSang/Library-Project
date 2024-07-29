const express = require("express");
const http = require("http");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
