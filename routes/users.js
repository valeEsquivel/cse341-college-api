const router = require('express').Router();
const userController = require('../controllers/users');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', userController.getAll);

router.get('/:userId', userController.getSingle);

router.post('/', authCheck, userController.createUser);

router.put('/:userId', authCheck, userController.updateUser);

router.delete('/:userId', authCheck, userController.deleteUser);

module.exports = router;