const router = require('express').Router();
const gradeController = require('../controllers/grades');
const { authCheck } = require('../authentication/authenticate.js');
const { gradesRules, validate } = require('../utilities/grades-validator.js');


router.get('/', gradeController.getAll);

router.get('/:studentId', gradeController.getGradesByStudentId);

router.post('/', authCheck, gradesRules(), validate, gradeController.addGrade);

router.put('/:gradeId', authCheck, gradesRules(), validate, gradeController.updateGrade);

router.delete('/:gradeId', authCheck, gradeController.deleteGrade);

module.exports = router;