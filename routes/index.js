const router = require('express').Router();
const passport = require('passport');

// router.get('/', (req, res) => {
//     //#swagger.tags = ['Welcome']
//     res.send('Welcome to CSE341 College API!');
// });

//Add the files to the routes we are going to use

router.use('/', require('./swagger'));

//Route for users
router.use('/user', require('./users'));

//Route for teachers
router.use('/teacher', require('./teachers'));

//Route for students
router.use('/student', require('./students'));

//Route for courses
router.use('/course', require('./courses'));

//Route for grades
router.use('/grade', require('./grades'));

//Route for login
router.get('/login', passport.authenticate('github'), (req, res) => {});

//Route for logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;