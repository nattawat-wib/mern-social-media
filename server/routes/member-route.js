const router = require('express').Router();
const authController = require('./../controller/auth-controller');
const memberController = require('./../controller/member-controller');
const middleware = require('./../middleware/multer');

router.get('/', memberController.getAllMember)
router.get('/:username',
    authController.isLogin,
    memberController.getMember
)
router.get('/:username/friend', memberController.getAllMember)

router.get('/:username/post', memberController.getPostByUsername)

router.patch('/toggle-follow/:username',
    authController.isLogin,
    memberController.toggleFollowMember
)
// router.patch('/accept-friend/:username',
//     authController.isLogin,
//     memberController.acceptFriend
// )

router.patch('/update-me',
    authController.isLogin,
    middleware.multerConfig.fields([{ name: 'avatar' }, { name: 'cover' }]),
    memberController.updateMe
)

module.exports = router;