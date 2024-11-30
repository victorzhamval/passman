const { TOKEN_EXPIRATION } = require("../globals/constants")

const JWTconfig = {
  expiresIn: TOKEN_EXPIRATION
}

module.exports = JWTconfig;
