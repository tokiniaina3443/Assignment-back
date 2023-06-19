const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
const tokenExpiration = '1h'; 

function login(req,res) {
    const {username,password} = req.body;
    // fontion find de maazo object
    //le objet aveo alefa ato
    const user = { //soloina aveo tsy aiko le base
        id: 1,
        username: 'test',
        email: 'test@test.com'
      };
    const token = jwt.sign(user, secretKey, { expiresIn: tokenExpiration });

    res.json({ token });
}
module.exports = { login };