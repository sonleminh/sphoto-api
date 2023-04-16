const express = require('express');
const router = express.Router();
const { cloudinary } = require('../utils/cloudinary');

router.post('/upload', async (req, res) => {
  try {
    const file = req.body.file;
    const promise = file.map(async (item) => {
      return await cloudinary.uploader.upload(
        item,
        { folder: 'img', resource_type: 'auto' },

        (err) => {
          if (err) throw err;
        }
      );
    });
    let images = await Promise.all(promise);
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
