const errorHandler = (callback) => {
  return async function(req, res, next) {
    try {
      await callback(req, res, next);
    } catch (e) {
      console.error(e);
      res.status(500).json({message: "Server error."});
    }
  }
}

module.exports = errorHandler;

