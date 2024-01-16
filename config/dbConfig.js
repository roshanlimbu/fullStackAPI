const { DataTypes } = require("sequelize");

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "node_sqlz_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
};

const db = {
  seqeulize,
  Sequelize,

  products: require("./productModel.js")(seqeulize, DataTypes),
};
