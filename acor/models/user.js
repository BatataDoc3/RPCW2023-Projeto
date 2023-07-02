const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    registeredOn: {
      type: Date,
      required: true,
      default: new Date(),
    },
    role: {
      type: String,
      required: true,
      default: "USER",
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("user", userSchema);
