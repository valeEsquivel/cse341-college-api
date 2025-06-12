const router = require('express').Router();
const gradeController = require('../controllers/grades');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', gradeController.getAll);

router.get('/:studentId', gradeController.getGradesByStudentId);

router.post('/', authCheck, gradeController.addGrade);

router.put('/:gradeId', authCheck, gradeController.updateGrade);

router.delete('/:gradeId', authCheck, gradeController.deleteGrade);

module.exports = router;