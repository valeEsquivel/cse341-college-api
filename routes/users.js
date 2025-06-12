const router = require('express').Router();
const userController = require('../controllers/users');
const { userRules, validate } = require('../utilities/validation');

router.get('/', userController.getAll);

router.get('/:userId', userController.getSingle);

router.post(
    '/',
    userRules(),
    validate,
    userController.createUser
);

router.put(
    '/:userId',
    userRules(),
    validate,
    userController.updateUser
);

router.delete('/:userId', userController.deleteUser);

module.exports = router;