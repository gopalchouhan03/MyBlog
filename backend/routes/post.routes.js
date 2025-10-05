const Router = require('express');
const { postList, readMorePost, createPost, likes, addComment, getComments, incrementShare, searchPosts} = require('../controller/post.controller');
const { register, login, protectedRoute, editProfile ,profileData, getUserProfile, getUserPosts, followUser, unfollowUser} = require('../controller/user.controller');
const authMiddleware = require('../middleware/AuthMiddleware');


const router = Router();

router.route('/postlist').get(postList);
router.route('/createpost').post(authMiddleware,createPost);
router.route('/readmorepost/:id').get(readMorePost);
router.route('/posts/:id/like').post(likes);
router.route('/posts/:postId/comment').post(addComment);
router.route('/posts/:postId/comments').get(getComments);
router.route('/posts/:postId/share').post(incrementShare);


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/protected').get(protectedRoute);
router.route('/users/:id/edit').put(editProfile)
router.route('/user/:id').get(authMiddleware ,profileData);
router.route("/users/:userId").get(getUserProfile);
router.route("/posts/:userId").get(getUserPosts);
router.route("/:userId/follow").put(followUser);
router.route("/:userId/unfollow").put(unfollowUser);

router.route("/").get(searchPosts);

module.exports = router;