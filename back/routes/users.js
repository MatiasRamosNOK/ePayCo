var express = require("express");
var router = express.Router();
const User = require("../models/User.js");
const Pagos = require("../models/Pago.js");
const Token = require("../models/Tokens");

var nodemailer = require("nodemailer");
const Pago = require("../models/Pago.js");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mrnepayco@gmail.com",
    pass: "1234ABcd",
  },
});

function getRandomArbitrary() {
  return Math.round(Math.random() * (999999 - 100000) + 100000);
}

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

router.post("/realizarPago", function (req, res, next) {
  let objPago = {};
  let objUser = {};
  objPago.IDpago = req.body.idPago;
  objUser.documento = req.body.documento;
  objUser.celular = req.body.celular;
  //Primero verifico que exista el ID de pago.
  Pagos.findOne({ IDpago: objPago.IDpago }).then((pago) => {
    if (pago == null) {
      //El pago no existe
      res.sendStatus(207);
    } else {
      //Si el pago existe busco al usuario
      User.findOne(objUser).then((usuario) => {
        if (usuario == null) {
          //Los datos del usuario son incorrectos
          res.sendStatus(205);
        } else {
          //Si los datos del usuario son correctos entonces
          //Verifico que posea el saldo suficiente
          if (usuario.saldo - pago.monto >= 0) {
            console.log("Usuario saldo:", usuario.saldo);
            console.log("Pago monto:", pago.monto);
            //En este caso esta todo bien,
            //Aca genero un ID de 6 digitos unicos para el usuario y se lo envio al email
            let token = getRandomArbitrary();
            Token.create({
              idPago: objPago.IDpago,
              documento: objUser.documento,
              idToken: token,
            })
              .then((token) => {
                let idToken = token.idToken;
                var mailOptions = {
                  from: "mrnepayco@gmail.com",
                  to: usuario.email,
                  subject: "Token de pago",
                  text: `Su token para confirmar el pago es: ${idToken}`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    res.send(500, err.message);
                  } else {
                    console.log("Email sent");
                    res.status(200).jsonp(req.body);
                  }
                });
              })
              .catch((err) => {
                console.log("Err token:", err);
                res.sendStatus(210);
              });
          } else {
            res.sendStatus(206);
          }
        }
      });
    }
  });
});

router.post("/comprobarToken", (req, res, next) => {
  let documento = req.body.documento;
  let uniqueIDtoken = req.body.uniqueToken;
  Token.findOne({ idToken: uniqueIDtoken })
    .then((token) => {
      //El token es correcto
      Pago.findOne({ IDpago: token.idPago }).then((pago) => {
        User.findOne({ documento: documento }).then((user) => {
          let newSaldo = user.saldo - pago.monto;
          User.findOneAndUpdate(
            { documento: documento },
            { $set: { saldo: newSaldo } }
          ).then(() => {
            res.sendStatus(200);
          });
        });
      });
    })
    .catch((err) => {
      //El token es incorrecto
      res.sendStatus(201);
    });
});

router.get("/allTokens", (req, res, next) => {
  Token.find({}, function (err, users) {
    var userMap = {};
    users.forEach(function (user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
});

router.get("/deleteAll", (req, res, next) => {
  User.collection.drop().then((resp) => {
    console.log(resp);
    res.send("ok");
  });
});

router.get("/deleteTokens", (req, res, next) => {
  Token.collection.drop().then((resp) => {
    console.log(resp);
    res.send("ok");
  });
});

module.exports = router;
