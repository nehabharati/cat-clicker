const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CatsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = Cat = mongoose.model("cat", CatsSchema);
