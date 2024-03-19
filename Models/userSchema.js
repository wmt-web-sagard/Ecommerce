const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
  },
  password: { type: String, required: [true, "Please provide a password"] },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  gender: { type: String, require: true },
  address: { type: String },
  role: { type: String, enum: ["user","admin"], default: "user" }, // admin or user
  avatar : { type : String , require  : true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem', default: [] }],
});

module.exports = mongoose.model("User", userSchema);
