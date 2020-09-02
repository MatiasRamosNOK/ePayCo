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

router.post("/chequearToken", (req, res, next) => {
  let documento = req.body.documento;
  let idPago = req.body.idPago;
  let idToken = req.body.idToken;
});

module.exports = router;
