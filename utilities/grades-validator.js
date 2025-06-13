const { body, validationResult } = require("express-validator");
const gradeController = require("../controllers/grades");
const validate = {};

/* ***********************
 * Data Validation Rules
 *************************/
validate.gradesRules = () => {
  return [
    // term: required, string type, not empty
    body("term")
      .exists()
      .bail()
      .isString()
      .bail()
      .notEmpty()
      .trim()
      .escape(),
    
      // grade: required, string type, not empty
    body("grade")
      .exists()
      .bail()
      .isString()
      .bail()
      .notEmpty()
      .trim()
      .escape(),

    //studentId: required, string type, not empty, custom validator
    body("studentId")
      .exists()
      .bail()
      .isString()
      .bail()
      .notEmpty()
      .bail()
      .custom(async (value) => {
        const studentExists = await gradeController.verifyStudent(value);
        if (!studentExists) {
          throw new Error("Student ID does not exist.");
        }
        return true;
      })
      .trim()
      .escape(),

    //courseId: required, string type, not empty, custom validator
    body("courseId")
      .exists()
      .bail()
      .isString()
      .bail()
      .notEmpty()
      .bail()
      .custom(async (value) => {
        const courseExists = await gradeController.verifyCourse(value);
        if (!courseExists) {
          throw new Error("Course ID does not exist.");
        }
        return true;
      })
      .trim()
      .escape(),
  ];
};

validate.validateGrade = (req, res, next) => {
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
