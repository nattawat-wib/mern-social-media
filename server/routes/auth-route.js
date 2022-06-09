const router = require('express').Router();
const authController = require('./../controller/auth-controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/verify-token', authController.verifyToken);

router.patch('/edit-password',
    authController.isLogin,
    authController.editPassword
);
router.patch('/forget-password', authController.forgetPassword);
router.patch('/reset-password', authController.resetPassword);

module.exports = router;