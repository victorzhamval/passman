const JWT = require('jsonwebtoken');
const JWTconfig = require('../configs/config.jwt');

const generate = payload => JWT.sign(payload, process.env.JWT_SECRET_KEY, JWTconfig);
const verify = token => JWT.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => err ? false : decoded);

module.exports = {
  generate,
  verify
};
