const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const postRouter = require('./routes/post.route');
const authRouter = require('./routes/auth.route');
const uploadImg = require('./routes/uploadImg.route');
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

app.use('/api', postRouter);
app.use('/api', authRouter);
app.use('/api', uploadImg);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Cum Real API.',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});
