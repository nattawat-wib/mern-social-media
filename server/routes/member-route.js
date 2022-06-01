const router = require('express').Router();
const memberController = require('./../controller/auth-controller');

router.post('/register', memberController.register);
router.post('/login', memberController.login);

module.exports = router;