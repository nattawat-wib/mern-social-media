const router = require('express').Router();
const authController = require('./../controller/auth-controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/verify-token', authController.verifyToken);
// forget-password
// reset-password

module.exports = router;