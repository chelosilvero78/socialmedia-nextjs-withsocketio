const mongoose = require("mongoose");

function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb conectado");
  } catch (error) {
    console.log("error-->", error);
    process.exit(1);
  }
}

module.exports = connectDb;
