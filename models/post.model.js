const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    publicId: {
      type: String,
      // require: true,
    },
    url: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
