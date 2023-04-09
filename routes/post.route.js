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

router.get('/post', getAllPost);
router.get('/random-post', getRandomPost);
router.get('/image', getImages);
router.get('/video', getVideos);
router.get('/post/:id', getPostByUser);
router.post('/post', createPost);
router.patch('/post', deleteManyPost);
router.delete('/post/:id', deletePost);
router.delete('/post/delete-all/:id', deleteAllPost);

module.exports = router;
