"use strict";
const express = require("express");
const path = require("node:path");

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "src", "views"));

//
server.use(express.static(path.join(__dirname, "src", "assets", "styles")));
server.use(express.static(path.join(__dirname, "src", "assets", "javascript")));

// Method "GET" => Route "/"
const router = require("./src/router");
server.use(router);

server.listen(8080, () => {
  console.log(`server is listing on localhost::8080`);
});
