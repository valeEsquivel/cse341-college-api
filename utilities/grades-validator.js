const { body, validationResult } = require('express-validator');

const gradesRules = () => {
  return [
    body('term').isString().notEmpty(),
    body('grade').isString().notEmpty(),
    body('studentId').isString().notEmpty(),
    body('courseId').isString().notEmpty(),
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
  gradesRules,
  validate
};