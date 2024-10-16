const mongoose = require("mongoose");
require("dotenv").config();

const DB = async () => {
  try {
    await mongoose.connect(process.env.DATABASEURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = DB;
