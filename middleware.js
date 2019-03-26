/**
 * This module exposes a configurable Express middleware
 * that can be used to validate the request body against
 * the supplied object schema.
 *
 * If the validation fails, it will return the error
 * and end the request.
 */
const Joi = require('joi');

const validationMiddleware = schema => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema);

  if (error) {
    return next(error);
  }

  return next();
};

module.exports = validationMiddleware;
