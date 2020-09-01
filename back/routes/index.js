"use strict";
const path = require("path");
var express = require("express");
var router = express.Router();
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.get("/logout", function (req, res, next) {
  req.logout();
  console.log("PAso por logout");
  res.redirect("/");
});

module.exports = router;
