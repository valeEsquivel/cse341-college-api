const router = require('express').Router();
const studentController = require('../controllers/students');
const { studentRules, validate } = require('../utilities/validation');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', studentController.getAll);

router.get('/:studentId', studentController.getSingle);

router.post(
    '/',
    authCheck,
    studentRules(),
    validate,
    studentController.createStudent
);

router.put(
    '/:studentId',
    authCheck,
    studentRules(),
    validate,
    studentController.updateStudent
);

router.delete('/:studentId', authCheck, studentController.deleteStudent);

module.exports = router;