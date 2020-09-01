var express = require("express");
var router = express.Router();
const User = require("../models/User.js");

router.post("/reload", function (req, res, next) {
  let obj = {};
  obj.documento = req.body.documento;
  obj.celular = req.body.celular;

  User.findOne(obj)
    .then((user) => {
      if (user == null) {
        res.status(205).send("Fail data");
      } else {
        let newSaldo = Number(user.saldo) + Number(req.body.monto);
        User.findOneAndUpdate(obj, { $set: { saldo: newSaldo } }).then(() => {
          User.findOne(obj).then((updatedUser) => {
            res.status(200).send(updatedUser);
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(206);
    });
});

router.post("/obtenerSaldo", function (req, res, next) {
  let obj = {};
  obj.documento = req.body.documento;
  obj.celular = req.body.celular;

  User.findOne(obj)
    .then((user) => {
      if (user == null) {
        res.status(205).send("Fail data");
      } else {
        console.log("User:", user);
        res.status(200).send(user.saldo.toString());
      }
    })
    .catch((err) => {
      console.log("Error", err);
      res.sendStatus(206);
    });
});

router.post("/register", function (req, res, next) {
  console.log("ID SESSION REGISTER:", req.sessionID);
  let obj = req.body;
  console.log("El obj es:", obj);
  User.create(obj)
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(205).send("Email is already in use");
    });
});

router.get("/deleteAll", (req, res, next) => {
  User.collection.drop().then((resp) => {
    console.log(resp);
    res.send("ok");
  });
});

module.exports = router;
