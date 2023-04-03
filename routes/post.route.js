const express = require('express');
const {
  getAllPost,
  getRandomPost,
  getImages,
  getVideos,
  createPost,
  deletePost,
  deleteManyPost,
} = require('../controllers/post.controller');
const router = express.Router();

router.get('/post', getAllPost);
router.get('/random-post', getRandomPost);
router.get('/image', getImages);
router.get('/video', getVideos);
router.post('/post', createPost);
router.patch('/post', deleteManyPost);
router.delete('/post/:id', deletePost);

module.exports = router;
