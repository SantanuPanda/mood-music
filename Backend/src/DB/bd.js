
const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.Mongo_URL)
    .then(() => {
      console.log(`database is connected`);
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports=connectDB;