const Pass = require('./services/passport.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var Recipe = require('./models/Recipe');
var User = require('./models/User');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/andante';

//Connect to Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true });
var db = mongoose.connection;

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api', (req, res) => {
  res.json({message: 'Andante backend'});
});

//******************* Recipe Controller *******************//
app.get('/api/recipes', (req, res) => {
  Recipe.getRecipes(function(err, recipes){
    if (err){
      res.status(500).json({ err });
    }else{
      res.status(200).json(recipes)
    }
  });
});

app.post('/api/recipes', (req, res) => {
  var recipe = req.body;
  Recipe.addRecipe(recipe, function(err, recipe){
    if (err){
      res.status(500).json({ err });
    }else{
      res.status(200).json(recipe)
    }
  });
});

app.put('/api/recipes/:_id', (req, res) => {
  var id = req.params._id;
  var recipe = req.body;

  Recipe.updateRecipe(id, recipe, {}, function(err, recipe){
    if (err){
      res.status(500).json({ err });
    }else{
      res.status(200).json(recipe)
    }
  });
});

app.delete('/api/recipes/:_id', (req, res) => {
  var id = req.params._id;
  Recipe.deleteRecipe(id, function(err, recipe){
    if (err){
      res.status(500).json({ err });
    }else{
      res.status(200).json(recipe)
    }
  });
});

//******************* User Controller *******************//

//Sign Up
app.post('/api/users', (req, res) => {
  var user = req.body;
  User.signUp(user, function(err, user){
    if (err){
      console.log(err);
      res.status(500).json(err.message);
    }else{
      res.status(200).json(user)
    }
  });
});

//Log in
app.post('/api/login', Pass.Authenticate, function(req, res, next) {
  console.log('got this far');
  res.status(200).json(req.user)
  next();
});


//Get all Users
app.get('/api/users', (req, res) => {
  // var user = req.body;
  User.getUsers(function(err, user){
    if (err){
      res.status(500).json(err)
    }else{
      res.status(200).json(user)
    }
  });
});

//Get specific user
app.get('/api/users/:username', (req, res) => {
  var user = req.params.username;
  User.getUser(user, function(err, user){
    if (err){
      res.status(500).json(err);
    }else{
      res.status(200).json(user)
    }
  });
});


app.listen(port, () => console.log(`Server started on port ${port}`));
