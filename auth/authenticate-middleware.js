/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const Jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.headers;

  return ((token === undefined || typeof token !== 'string')
    ? res.status(401).json({ message: 'token not valid' })
    :  Jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'token not valid' });
      }
      req.user = { username: decodedToken.username };
      return next();
    })
  );
};
