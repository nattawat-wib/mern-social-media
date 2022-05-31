const router = require('express').Router();
const memberController = require('./../controller/auth-controller');

router.post('/register', memberController.memberRegister)

module.exports = router