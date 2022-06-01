const router = require('express').Router();
const memberController = require('./../controller/auth-controller');

router.post('/register', memberController.register);
router.post('/login', memberController.login);
router.get('/logout', memberController.logout);
router.get('/verify-token', memberController.verifyToken);

module.exports = router;