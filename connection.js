const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongoDb(url) {
  // connetion mongoose
  return mongoose
    .connect(url)
}

module.exports = {connectMongoDb};
