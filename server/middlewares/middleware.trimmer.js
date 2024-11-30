const trimmer = (req, _res, next) => {
  Object.keys(req.body).forEach(key => typeof req.body[key] === "string" && (req.body[key] = req.body[key].trim()))
  Object.keys(req.params).forEach(key => typeof req.params[key] === "string" && (req.params[key] = req.params[key].trim()));
  next();
}

module.exports = trimmer;
