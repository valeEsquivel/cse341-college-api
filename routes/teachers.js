const router = require('express').Router();
const teacherController = require('../controllers/teachers');

router.get('/', teacherController.getAll);

router.get('/:teacherId', teacherController.getById);

router.post('/', teacherController.createTeacher);

router.put('/:teacherId', teacherController.updateTeacher);

router.delete('/:teacherId', teacherController.deleteTeacher);

module.exports = router;