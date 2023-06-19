let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");
let auth = require("./routes/auth");
let test = require("./routes/test_login");

const cors = require("cors");
const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key"; // besoin de mettre en .env A regler plus tard et a changer

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("debug", true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
// const uri = "mongodb+srv://mb:toto@cluster0.rxyzwao.mongodb.net/assignments?retryWrites=true&w=majority"
const uri =
  "mongodb+srv://groupe13:gr0up313@assignment.rgwvktm.mongodb.net/assignements?retryWrites=true";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(cors());
// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = "/api";

//authentication
app.route(prefix + "/signIn").post(auth.signIn);
app.route(prefix + "/login").post(auth.login);

//get user information
app.route(prefix + "/test").get(verifyToken, test.getOK);

app
  .route(prefix + "/assignments")
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app
  .route(prefix + "/assignments/:id")
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;
