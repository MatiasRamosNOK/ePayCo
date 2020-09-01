var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();
var LocalStrategy = require("passport-local").Strategy;
var db = require("./models/db/index");
var User = require("./models/User");
var passport = require("passport");
var bodyParser = require("body-parser");
var path = require("path");
var users = require("./routes/users");
const volleyball = require("volleyball");
app.use(volleyball);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "BootcampP5" }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (inputEmail, inputPassword, done) {
      console.log("Estoy por buscar un usuario");

      User.findOne({
        where: {
          email: inputEmail,
        },
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(inputPassword)) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

app.use("/", routes);

app.use("/users", users);

db.sync({ force: true })
  .then(() => {
    console.log("Se ha iniciado el servidor");
    app.listen(3005);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
