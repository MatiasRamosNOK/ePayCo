const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const Pagos = require("../models/Pago.js");

router.post("/generarPago", (req, res, next) => {
  let obj = {};
  obj.monto = req.body.monto;
  obj.IDpago = uuidv4();
  Pagos.create(obj).then((pago) => {
    res.status(200).send(pago);
  });
});

router.get("/allPagos", (req, res, next) => {
  Pagos.find({}, function (err, users) {
    var userMap = {};
    users.forEach(function (user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
});

module.exports = router;
