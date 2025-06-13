const router = require('express').Router();
const teacherController = require('../controllers/teachers');
const { authCheck } = require('../authentication/authenticate.js');
const { teacherRules, validate } = require('../utilities/teachers-validator.js');

router.get('/', teacherController.getAll);

router.get('/:teacherId', teacherController.getById);

router.post('/', authCheck, teacherRules(), validate, teacherController.createTeacher);

router.put('/:teacherId', authCheck, teacherRules(), validate, teacherController.updateTeacher);

router.delete('/:teacherId', authCheck, teacherController.deleteTeacher);

module.exports = router;