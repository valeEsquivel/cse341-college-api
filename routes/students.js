const router = require('express').Router();
const studentController = require('../controllers/students');
const { studentRules, validate } = require('../utilities/validation');

router.get('/', studentController.getAll);

router.get('/:studentId', studentController.getSingle);

router.post(
    '/',
    studentRules(),
    validate,
    studentController.createStudent
);

router.put(
    '/:studentId',
    studentRules(),
    validate,
    studentController.updateStudent
);

router.delete('/:studentId', studentController.deleteStudent);

module.exports = router;