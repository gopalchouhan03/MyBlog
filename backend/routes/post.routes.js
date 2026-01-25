const Router = require('express');
const { postList, readMorePost, createPost, updatePost, deletePost, likes, bookmarkPost, addComment, deleteComment, getComments, incrementShare, searchPosts} = require('../controller/post.controller');
const { register, login, logout, protectedRoute, editProfile ,profileData, getUserProfile, getUserPosts, followUser, unfollowUser} = require('../controller/user.controller');
const authMiddleware = require('../middleware/AuthMiddleware');


const router = Router();

// Post routes
router.route('/postlist').get(postList);
router.route('/createpost').post(authMiddleware, createPost);
router.route('/readmorepost/:id').get(readMorePost);
router.route('/posts/:id').put(authMiddleware, updatePost);
router.route('/posts/:id').delete(authMiddleware, deletePost);
router.route('/posts/:id/like').post(likes);
router.route('/posts/:id/bookmark').post(bookmarkPost);
router.route('/posts/:postId/comment').post(addComment);
router.route('/posts/:postId/comments').get(getComments);
router.route('/comments/:commentId').delete(deleteComment);
router.route('/posts/:postId/share').post(incrementShare);

// User routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/protected').get(protectedRoute);
router.route('/users/:id/edit').put(editProfile)
router.route('/user/:id').get(authMiddleware, profileData);
router.route("/users/:userId").get(getUserProfile);
router.route("/posts/:userId").get(getUserPosts);
router.route("/users/:userId/follow").put(authMiddleware, followUser);
router.route("/users/:userId/unfollow").put(authMiddleware, unfollowUser);

// Search
router.route("/").get(searchPosts);

module.exports = router;