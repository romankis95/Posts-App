const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Post = require("./models/post");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
mongoose.Promise = global.Promise;
const mongoextURI = 'mongodb://localhost/PostApp';
mongoose.connect(mongoextURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(JSON.stringify("Connessione stabilita sul database " + mongoextURI));
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //allowing all origins, change the star to your domain
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;

  var newPost = new Post({
    title: post.title,
    content: post.content
  });
  newPost.save(function (err, post) {
    if (err) return console.error(err);
    res.status(201).json({
      message: "Post added successfully",
      createdId: post._id
    });
  });

 
});

app.delete("/api/posts/:id", async (req, res, next) => {
  console.log(req.params.id);
  var deletato = await Post.deleteOne({
    _id: req.params.id
  }).lean().exec();
  res.status(200).json({
    message: "Post deleted!"
  });


});

app.use("/api/posts", async (req, res, next) => {
   var posts = await Post.find().lean().exec();

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});



module.exports = app;
