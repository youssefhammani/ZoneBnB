const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);
// router.get('/refresh', authController.refresh);
// router.get('/me', authController.me);

module.exports = router;
