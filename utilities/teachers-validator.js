const { body, validationResult } = require("express-validator");
const validate = {};

/* ***********************
 * Data Validation Rules
 *************************/
validate.teachersRules = () => {
  return [
    // firstName: required, string, not empty, trimmed, escaped
    body("firstName")
      .exists()
      .bail()
      .isString()
      .bail()
      .notEmpty()
      .trim()
      .escape(),

    // lastName: required, string, not empty, trimmed, escaped
    body("lastName")
      .exists()
      .bail()
      .isString()
      .bail()
      .notEmpty()
      .trim()
      .escape(),

    // email: required, string type, not empty, valid email format
    body("email")
      .trim()
      .bail()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
  ];
};

validate.validateTeacher = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = validate;
