const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var userSchema = new Schema({
  sessionID: {
    type: String,
  },
  saldo: {
    type: Number,
    required: false,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nombres: {
    type: String,
    required: true,
  },
  documento: {
    type: Number,
    required: true,
    unique: true,
  },
  celular: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
