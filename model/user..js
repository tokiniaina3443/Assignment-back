let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = Schema({
  name: String,
  username: String,
  password: String,
  role: String,
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("users", UserSchema);
