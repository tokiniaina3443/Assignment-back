let mongoose = require("mongoose");
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
  id: Number,
  dateDeRendu: Date, // normal
  dateReelDeRendu: Date, // normal
  nom: String,
  auteur: String, //Nom eleve
  matiere: String, //_id Matiere
  note: Number,
  remarque: String, //Remarque lors du rendement
  rendu: Boolean,
});

// plugin de pagination
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("assignments", AssignmentSchema);
