let Matiere = require("../model/matiere");

function getAllMatieres(req, res) {
    Matiere.find((err, matieres) => {
      if (err) {
        res.send(err);
      }
  
      res.send(matieres);
    });
}
// Récupérer un matieres par son id (GET)
function getMatiere(req, res) {
    let matieresId = req.params._id;
  
    Matiere.findOne({ _id: matieresId }, (err, matiere) => {
      if (err) {
        res.send(err);
      }
      res.json(matiere);
    });
}

// Ajout d'un matiere (POST)
function postMatiere(req, res) {
    let matiere = new Matiere();
    matiere.nom = req.body.nom;
    matiere.imageMatiere = req.body.imageMatiere;
    matiere.prof = req.body.prof;
    matiere.imageProf = req.body.imageProf;
  
    console.log("POST matiere reçu :");
    console.log(matiere);
  
    matiere.save((err) => {
      if (err) {
        res.send("cant post matiere ", err);
      }
      res.json({ message: `${matiere.nom} saved!` });
    });
  }

  module.exports = {
    getAllMatieres,
    postMatiere,
    getMatiere
  };
  