const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags = ['Welcome']
    res.send('Welcome to CSE341 College API!');
});

//Add the files to the routes we are going to use
router.use('/user', require('./users'));

//Routes for teachers
router.use('/teacher', require('./teachers'));

module.exports = router;