const router = require('express').Router();
const teacherController = require('../controllers/teachers');
const { authCheck } = require('../authentication/authenticate.js');
const teacherValidator = require('../utilities/teachers-validator')


router.get('/', teacherController.getAll);

router.get('/:teacherId', teacherController.getById);

router.post('/', authCheck, teacherValidator.teachersRules(), teacherValidator.validate, teacherController.createTeacher);

router.put('/:teacherId', authCheck, teacherValidator.teachersRules(), teacherValidator.validate, teacherController.updateTeacher);

router.delete('/:teacherId', authCheck, teacherController.deleteTeacher);

module.exports = router;