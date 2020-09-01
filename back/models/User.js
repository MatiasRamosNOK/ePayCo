const S = require("sequelize");
const db = require("./db/index");
class User extends S.Model {}

User.init(
  {
    sessionID: {
      type: S.STRING,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    nombres: {
      type: S.STRING,
      allowNull: false,
    },
    documento: {
      type: S.INTEGER,
      allowNull: false,
    },
    celular: {
      type: S.INTEGER,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

module.exports = User;
