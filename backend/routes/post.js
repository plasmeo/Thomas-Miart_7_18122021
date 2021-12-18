const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', postController.findPost);

router.get('/:id/comments/', postController.getComments);

router.get('/:id', auth, postController.findOnePost);

router.post('/', auth, multer, postController.createPost);

router.put('/:id', auth, multer, postController.updatePost);

router.delete('/:postId', auth, postController.deletePost);

router.post('/:id/like', auth, postController.likePost);

router.post('/:id/comments', auth, postController.addComment); 

router.delete('/:id/comments/:commentId', auth, postController.deleteComment);


module.exports = router;