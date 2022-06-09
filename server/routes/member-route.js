const router = require('express').Router();
const authController = require('./../controller/auth-controller');
const memberController = require('./../controller/member-controller');
const middleware = require('./../middleware/multer');

router.use(authController.isLogin)

router.get('/', memberController.getAllMember)
router.get('/follow', memberController.getFollow)
router.get('/unfollow', memberController.getUnfollow)

router.get('/:username/', memberController.getMember)
router.get('/:username/post', memberController.getPostByUsername)

router.patch('/follow/:username', memberController.followMember)

router.patch('/update-me',
    middleware.multerConfig.fields([{ name: 'avatar' }, { name: 'cover' }]),
    memberController.updateMe
)

module.exports = router;