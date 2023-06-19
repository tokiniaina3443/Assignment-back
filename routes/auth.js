let User = require("../model/user.");

const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
const tokenExpiration = "8h";

function signIn(req, res) {
  let user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.role = req.body.role;

  user.save((err) => {
    if (err) {
      res.send("cant post user ", err);
    }
    res.json({ message: `${user.name} saved!` });
  });
}

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username, password: password }, (err, result) => {
    if (err) {
      res.status(401).send("Unauthorized");
    } else {
      const user = {
        id: result.id,
        name: result.name,
        username: result.username,
        role: result.role,
      };
      const token = jwt.sign(user, secretKey, {
        expiresIn: tokenExpiration,
      });
      res.json({ token });
    }
  });
}
module.exports = { signIn, login };
