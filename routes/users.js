const router = require('express').Router();
const userController = require('../controllers/users');

router.get('/', userController.getAll);

router.get('/:userId', userController.getSingle);

router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;