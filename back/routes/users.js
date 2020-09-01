var express = require("express");
var router = express.Router();
var path = require("path");
const User = require("../models/User.js");
var passport = require("passport");

router.get("/login", function (req, res, next) {
  console.log("ESTA AUTENTICADO:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("Registro y login OK");
    res.sendFile(path.join(__dirname, "../public", "logout.html"));
  } else {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
  }
});

router.get("/isAutenticated", (req, res, next) => {
  if (req.isAuthenticated()) {
    var data = req.session.passport;
    var obj = new Object();
    console.log("La data del back es:", data);
    User.findByPk(data.user).then((user) => {
      console.log("El usuario es:", user);
      obj.id = user.dataValues.id;
      obj.sessionID = user.dataValues.sessionID;
      obj.moviesID = user.dataValues.moviesID;
      obj.email = user.dataValues.email;
      console.log("El objeto en el back es:", obj);
      res.status(200).send(obj);
    });
  } else {
    res.status(204).send("No esta autenticado");
  }
});

router.get("/getOne/:id", (req, res, next) => {
  User.findByPk(req.params.id).then((user) => {
    var obj = new Object();
    obj.email = user.email;
    obj.moviesID = user.moviesID;
    res.send(obj);
  });
});

router.get("/getAll/:id", (req, res, next) => {
  var idUser = req.params.id;

  User.findAll().then((users) => {
    var array = [];
    for (var i = 0; i < users.length; i++) {
      var user = new Object();
      user.id = users[i].dataValues.id;
      user.moviesID = users[i].dataValues.moviesID;
      user.email = users[i].dataValues.email;
      array[i] = user;
    }
    array = array.filter((x) => x.id != idUser);
    res.send(array);
  });
});

router.post("/login", passport.authenticate("local"), function (
  req,
  res,
  next
) {
  console.log("Log OK!");
  User.findByPk(req.session.passport.user).then((user) => {
    user.update({ sessionID: req.sessionID });
  });
  console.log("SESION", req.session.passport.user);
  console.log("ID SESSION LOGIN:", req.sessionID);
  res.redirect("/");
});

router.get("/register", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../public", "autenticado.html"));
  } else {
    res.sendFile(path.join(__dirname, "../public", "register.html"));
  }
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

router.post("/:idUser/addMovie/:idMovie", (req, res, next) => {
  var idUser = req.params.idUser;
  var idMovie = req.params.idMovie;

  User.findOne({
    where: {
      id: idUser,
    },
  }).then((user) => {
    user.update({ moviesID: idMovie }).then(() => {
      User.findOne({
        where: {
          id: idUser,
        },
      }).then((user) => {
        res.status(201).send(user);
      });
    });
  });
});

router.get("/:id", (req, res, next) => {
  User.findByPk(req.params.id).then((user) => {
    var obj = new Object();
    obj.movies = user.moviesID;
    obj.email = user.email;
    res.send(obj);
  });
});

router.delete("/:idUser/:idMovie", (req, res, next) => {
  User.findByPk(req.params.idUser).then((user) => {
    user.update({ moviesID: req.params.idMovie }).then((user) => {
      console.log("User despues del delete:", user);
      var obj = new Object();
      obj.email = user.dataValues.email;
      obj.moviesID = user.dataValues.moviesID;
      res.send(obj);
    });
  });
});

module.exports = router;
