const Mongoose = require("mongoose");
require("dotenv").config();

let mongooseInstance;
let mongooseConnection;

function connect() {
  if (mongooseInstance) return mongooseInstance;

  mongooseConnection = Mongoose.connection;

  mongooseConnection.once("open", () => {
    console.log("DB is connected");
  });

  mongooseInstance = Mongoose.connect(process.env.DB_URI || "");

  return mongooseInstance;
}

module.exports = connect();
