"use strict";
require('dotenv').config();
const express = require("express");
const path = require("node:path");
const bodyParser = require('body-parser')
const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "src", "views"));

//
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, "src", "assets", "styles")));
server.use(express.static(path.join(__dirname, "src", "assets", "images")));
server.use(express.static(path.join(__dirname, "src", "assets", "javascript")));

// Method "GET" => Route "/"
const router = require("./src/router");
server.use(router);

// Method "POST" => Route "/upload"
const uploadController = require('./src/upload')
server.use(uploadController)

server.listen(8080, () => {
  console.log(`server is listing on http://localhost:8080`);
});
