const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/deleteAccount', userController.deleteAccount)

module.exports = router;