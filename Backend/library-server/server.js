const express = require("express");
const http = require("http");
const ConnectDB = require("./database/ConnectDB");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  ConnectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
