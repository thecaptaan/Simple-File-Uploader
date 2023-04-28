"use strict";
const fs = require("node:fs");
const multer = require("multer");
const path = require("node:path");
const jwt = require("jsonwebtoken");
const uploadController = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/thecaptaan/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname + "_" + Date.now();
    cb(null, "uploader_" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("fileuploadinput");

uploadController.post("/upload", (req, res, next) => {
  upload(req, res, (err) => {
    fs.readFile("./token.json", "utf8", function (err, data) {
      let parsedData = JSON.parse(data);
      jwt.verify(
        parsedData.token,
        process.env.SECRET_TOKEN,
        function (error, data) {
          if (error) {
            if (error.name == "TokenExpiredError") {
              deleteFile(req.file.path);
              res.json({
                success: false,
                error: "OOPS! Token Expired",
              });
            } else {
              deleteFile(req.file.path);
              res.json({
                success: false,
                error: "OOPS! Token Verification Error",
              });
            }
          } else {
            if (req.body.uploadToken === parsedData.id) {
              if (err) {
                deleteFile(req.file.path);
                res.json({
                  success: false,
                  error: "Unable to process the file.",
                });
              } else {
                fs.rename(
                  req.file.path,
                  req.file.destination +
                    "/" +
                    "uploader_" +
                    req.body.studentID +"_"+
                    Date.now() +
                    path.extname(req.file.originalname),
                  (error) => {
                    if (error) {
                      deleteFile(req.file.path);
                      res.json({
                        success: false,
                        error: "Unable to process the file.",
                      });
                    } else {
                      res.json({
                        success: true,
                      });
                    }
                  }
                );
              }
            } else {
              deleteFile(req.file.path);
              res.json({
                success: false,
                error: "Upload token mismatched",
              });
            }
          }
        }
      );
    });
  });
});

function deleteFile(filePath) {
  fs.unlink(filePath, () => {});
}
module.exports = uploadController;
