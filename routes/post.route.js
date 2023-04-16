const express = require('express');
const {
  getAllPost,
  getRandomPost,
  getImages,
  getVideos,
  createPost,
  deletePost,
  deleteManyPost,
  getPostByUser,
  deleteAllPost,
} = require('../controllers/post.controller');
const router = express.Router();

router.get('/posts', getAllPost);
router.get('/random-post', getRandomPost);
router.get('/image/:id', getImages);
router.get('/video/:id', getVideos);
router.get('/posts/:id', getPostByUser);
router.post('/post', createPost);
router.patch('/post', deleteManyPost);
router.delete('/post/:id', deletePost);
router.delete('/post/delete-all/:id', deleteAllPost);

module.exports = router;
