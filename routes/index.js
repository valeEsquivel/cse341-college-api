const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags = ['Welcome']
    res.send('Welcome to CSE341 College API!');
});

//Add the files to the routes we are going to use

//Route for users
router.use('/user', require('./users'));

//Route for teachers
router.use('/teacher', require('./teachers'));

//Route for teachers
router.use('/student', require('./students'));

module.exports = router;