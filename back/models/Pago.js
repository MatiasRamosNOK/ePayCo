const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var pagoSchema = new Schema({
  IDpago: {
    type: String,
    unique: true,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
    unique: false,
  },
});

const Pago = mongoose.model("Pagos", pagoSchema);
module.exports = Pago;
