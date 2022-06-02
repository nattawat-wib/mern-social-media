const router = require('express').Router();
const authController = require('./../controller/auth-controller');
const memberController = require('./../controller/member-controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/verify-token', authController.verifyToken);

router.get('/', memberController.getAllMember)
router.get('/:username', memberController.getMember)
router.get('/:username/friend', memberController.getAllMember)

router.patch('/update-me',
    authController.isLogin,
    memberController.updateMe
)

module.exports = router;