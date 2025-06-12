const router = require('express').Router();
const studentController = require('../controllers/students');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', studentController.getAll);

router.get('/:studentId', studentController.getSingle);

router.post('/', authCheck, studentController.createStudent);

router.put('/:studentId', authCheck, studentController.updateStudent);

router.delete('/:studentId', authCheck, studentController.deleteStudent);

module.exports = router;