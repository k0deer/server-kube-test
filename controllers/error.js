const logger = require('../util/logger');

exports.get404 = (req, res, next) => {
  res.status(404).send('404');
  logger.info("404 Error acceso a recurso path : " + req.path)
};