const router = require('express').Router();
const teacherController = require('../controllers/teachers');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', teacherController.getAll);

router.get('/:teacherId', teacherController.getById);

router.post('/', authCheck, teacherController.createTeacher);

router.put('/:teacherId', authCheck, teacherController.updateTeacher);

router.delete('/:teacherId', authCheck, teacherController.deleteTeacher);

module.exports = router;