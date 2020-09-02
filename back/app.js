var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();
var db = require("./models/db/index");
var bodyParser = require("body-parser");
var path = require("path");
var users = require("./routes/users");
var pagos = require("./routes/pagos");
const volleyball = require("volleyball");
app.use(volleyball);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

app.use("/users", users);

app.use("/pagos", pagos);

db.on(
  "Error conectando",
  console.error.bind(console, "MongoDB connection error:")
)
  .then(() => {
    console.log("Se ha iniciado el servidor");
    app.listen(3005);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
