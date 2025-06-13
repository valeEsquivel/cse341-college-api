const router = require('express').Router();
const userController = require('../controllers/users');
const { userRules, validate } = require('../utilities/validation');
const { authCheck } = require('../authentication/authenticate.js');

router.get('/', userController.getAll);

router.get('/:userId', userController.getSingle);

router.post(
    '/',
    authCheck,
    userRules(),
    validate,
    userController.createUser
);

router.put(
    '/:userId',
    authCheck,
    userRules(),
    validate,
    userController.updateUser
);

router.delete('/:userId', authCheck, userController.deleteUser);

module.exports = router;