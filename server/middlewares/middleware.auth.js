const JWTutils = require("../utils/util.jwt.js");

const authenticate = (req, res, next) => {
  try {
    const tokenData = JWTutils.verify(getClientToken(req));
    if (!tokenData) return res.status(402).json({ message: "Invalid token." });
    req.tokenData = tokenData;
    next();
  } catch (e) {
    res.status(500).json({ message: "Server error." });
  }
}

const getClientToken = (req) => {
  const authHeader = req.headers["authorization"];
  const clientToken = authHeader && authHeader.split(" ")[1];
  return clientToken;
}

module.exports = authenticate;

