const handler = require('./[...path].js');

module.exports = function jamendoRootHandler(req, res) {
  req.query = { ...(req.query || {}), path: req.query && req.query.path ? req.query.path : 'tracks' };
  return handler(req, res);
};
