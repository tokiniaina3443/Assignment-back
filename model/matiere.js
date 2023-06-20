let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MatiereSchema = Schema({
  nom: String, //Base de données, Technologies Web, Grails,
  imageMatiere: String, //path img
  prof: String,
  imageProf: String,
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("matieres", MatiereSchema);

