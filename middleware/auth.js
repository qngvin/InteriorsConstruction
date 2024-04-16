const jwt = require('jsonwebtoken');
const ENV = require('../config.js');

/** auth middleware */
async function Auth(req, res, next){ // phan quyen
    try {
        
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.account = decodedToken;

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}
async function getIdAccountByJWT(req, res, next){ // phan quyen
    jwt.verify(req.cookies['token'], 'haha', function(err, decodedToken) {
        if(err) { /* handle token err */ }
        else {
         req.idAccount = decodedToken.id;   // Add to req object
         next();
        }
      });
}

module.exports = {
    Auth,
    getIdAccountByJWT,
}