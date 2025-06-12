const router = require('express').Router();
const studentController = require('../controllers/students');
const { studentRules, validate } = require('../utilities/validation');

router.get('/', studentController.getAll);

router.get('/:studentId', studentController.getSingle);

router.post('/', studentController.createStudent);

router.put('/:studentId', studentController.updateStudent);

router.delete('/:studentId', studentController.deleteStudent);

module.exports = router;