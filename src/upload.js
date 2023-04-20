"use strict";
const multer = require("multer");
const path = require("path");
const uploadController = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/thecaptaan/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
        "uploader" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("fileuploadinput");
uploadController.post("/upload", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      res.send("error");
    } else {
      res.redirect('/')
    }
  });
});

module.exports = uploadController;
