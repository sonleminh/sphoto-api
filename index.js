const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const postRouter = require('./routes/post.route');
const { cloudinary } = require('./utils/cloudinary');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6969;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  })
);

const uri = process.env.MONGO_DB;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connection successfully');
});
// app.use('/api/images', async (req, res) => {
//   const { resources } = await cloudinary.search
//     .expression('folder:cum')
//     // .sort_by('public_id', 'desc')
//     .execute();
//   const publicIds = resources.map((file) => file.public_id);
//   res.send(publicIds);
// });

app.use('/api/upload', async (req, res) => {
  try {
    const file = req.body.file;
    const promise = file.map(async (item) => {
      return await cloudinary.uploader.upload(
        item,
        { folder: 'img' },
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

app.use('/api', postRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Cum Real API.',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});
