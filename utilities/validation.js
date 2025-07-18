const { body, validationResult } = require('express-validator');

const userRules = () => {
  return [
    body('username').isEmail().notEmpty(),
    body('role').isString().notEmpty(),
  ];
}

const studentRules = () => {
  return [
    body('firstname').isString().notEmpty(),
    body('lastname').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('birthday').isString().notEmpty(),
  ];
}

const courseRules = () => {
  return [
    body('name').isString().notEmpty(),
    body('startdate').isString().notEmpty(),
    body('enddate').isString().notEmpty(),
    body('registered').isInt().notEmpty(),
    body('teacherid').isString().notEmpty(),
    body('inperson').isBoolean().notEmpty(),
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
  userRules,
  studentRules,
  courseRules,
  validate
};