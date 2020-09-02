"use strict";
const path = require("path");
var express = require("express");
var router = express.Router();
router.get("/:unaRuta", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = router;
