const router = require('express').Router();
const gradeController = require('../controllers/grades');

router.get('/', gradeController.getAll);

router.get('/:studentId', gradeController.getGradesByStudentId);

router.post('/', gradeController.addGrade);

router.put('/:gradeId', gradeController.updateGrade);

router.delete('/:gradeId', gradeController.deleteGrade);

module.exports = router;