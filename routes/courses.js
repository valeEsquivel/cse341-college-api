const router = require('express').Router();
const courseController = require('../controllers/courses');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', courseController.getAll);

router.get('/:courseId', courseController.getSingle);

router.post('/', authCheck, courseController.createCourse);

router.put('/:courseId', authCheck, courseController.updateCourse);

router.delete('/:courseId', authCheck, courseController.deleteCourse);

module.exports = router;