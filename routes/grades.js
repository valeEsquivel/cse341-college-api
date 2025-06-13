const router = require('express').Router();
const gradeController = require('../controllers/grades');
const { authCheck } = require('../authentication/authenticate.js');
const gradeValidator = require('../utilities/grades-validator')

router.get('/', gradeController.getAll);

router.get('/:studentId', gradeController.getGradesByStudentId);

router.post('/', authCheck, gradeValidator.gradesRules(), gradeValidator.validate, gradeController.addGrade);

router.put('/:gradeId', authCheck, gradeValidator.gradesRules(), gradeValidator.validate, gradeController.updateGrade);

router.delete('/:gradeId', authCheck, gradeController.deleteGrade);

module.exports = router;