const { body, validationResult } = require('express-validator');

const teacherRules = () => {
  return [
    body('firstname').isString().notEmpty(),
    body('lastname').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
}

module.exports = {
  teacherRules,
  validate
};