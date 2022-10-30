const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
    
   },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
   },
});

module.exports = router;


router.post("", multer({storage:storage}).single("image"), (req, res, next) => {
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
  
  router.delete("/:id", async (req, res, next) => {
    console.log(req.params.id);
    var deletato = await Post.deleteOne({
      _id: req.params.id
    }).lean().exec();
    res.status(200).json({
      message: "Post deleted!"
    });
  
  
  });
  
    router.put("/:id", async (req, res, next) => {
      console.log(req.params.id);
      var post = req.body;
      var updatedPost = await Post.updateOne({
        _id: req.params.id
      }, {
        title: post.title,
        content: post.content
      }).lean().exec();
      res.status(200).json({
        message: "Post updated!"
      });
    });
    
  
  
  router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found!"
        });
      }
    });
  });
  
  
  router.use("", async (req, res, next) => {
     var posts = await Post.find().lean().exec();
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts
    });
  });
  