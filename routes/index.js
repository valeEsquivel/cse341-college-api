const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Welcome to the home page of College API!');
})

//Add the files to the routes we are going to use

module.exports = router;