const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Post = require("./models/post");
const postRoutes = require("./routes/posts");



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
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts",postRoutes);

module.exports = app;
