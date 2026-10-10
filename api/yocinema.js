const handler = require('./yocinema/index.js');

module.exports = function yocinemaRootHandler(req, res) {
  req.query = { ...(req.query || {}), path: req.query && req.query.path ? req.query.path : '' };
  return handler(req, res);
};
