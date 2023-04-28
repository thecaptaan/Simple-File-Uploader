"use strict";
require("dotenv").config();
const path = require("node:path");
const moment = require("moment");
const fs = require("node:fs");
const { nanoid } = require("nanoid");

const jwt = require("jsonwebtoken");

jwt.sign(
  { uploadToken: process.env.SECRET_TOKEN },
  process.env.SECRET_TOKEN,
  {
    algorithm: "HS384",
    expiresIn: "5m",
  },
  function (error, token) {
    if (error) {
      console.log("Unable to sign token");
    } else {
      fs.writeFile("./token.json", dataAssign(token), function (error) {
        if (error) {
          console.warn("Unable to generate token");
        } else {
          fs.readFile("./token.json", "utf8", function (err, data) {
            console.log("Upload Token: " + JSON.parse(data).id);
          });
        }
      });
    }
  }
);

function dataAssign(token) {
  let data = {
    id: nanoid(5),
    token: token,
  };
  return JSON.stringify(data);
}
