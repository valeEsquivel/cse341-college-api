const router = require('express').Router();
const courseController = require('../controllers/courses');
const { courseRules, validate } = require('../utilities/validation');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', courseController.getAll);

router.get('/:courseId', courseController.getSingle);

router.post(
    '/',
    authCheck,
    courseRules(),
    validate,
    courseController.createCourse
);

router.put(
    '/:courseId',
    authCheck,
    courseRules(),
    validate,
    courseController.updateCourse
);

router.delete('/:courseId', authCheck, courseController.deleteCourse);

module.exports = router;