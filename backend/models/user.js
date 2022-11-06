const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, //unique: true is not a validator, it's a mongoose feature
  password: { type: String, required: true },
 });

userSchema.plugin(uniqueValidator); //this is the validator
module.exports = mongoose.model("User", userSchema);
