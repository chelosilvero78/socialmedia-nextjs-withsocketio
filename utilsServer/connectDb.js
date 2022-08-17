const mongoose = require("mongoose");

function connectDb() {
  try {
    console.log("entorno-->",process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("error-->", error);
    process.exit(1);
  }
}

module.exports = connectDb;
