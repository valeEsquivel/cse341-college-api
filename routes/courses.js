const router = require('express').Router();
const courseController = require('../controllers/courses');

router.get('/', courseController.getAll);

router.get('/:courseId', courseController.getSingle);

router.post('/', courseController.createCourse);

router.put('/:courseId', courseController.updateCourse);

router.delete('/:courseId', courseController.deleteCourse);

module.exports = router;