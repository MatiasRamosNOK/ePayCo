const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var tokensSchema = new Schema({
  idPago: {
    type: String,
    required: true,
  },
  documento: {
    type: Number,
    required: true,
  },
  idToken: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Token = mongoose.model("Token", tokensSchema);
module.exports = Token;
