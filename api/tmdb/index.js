const handler = require('./[...path].js');

module.exports = function tmdbRootHandler(req, res) {
  req.query = { ...(req.query || {}), path: req.query && req.query.path ? req.query.path : '' };
  return handler(req, res);
};
