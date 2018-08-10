const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


var Recipe = require('./models/Recipe');


//Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/andante', { useNewUrlParser: true });
var db = mongoose.connection;

const port = 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api', (req, res) => {
  res.json({message: 'Andante backend'});
});

app.get('/api/recipes', (req, res) => {
  Recipe.getRecipes(function(err, recipes){
    if (err){
      throw err;
    }else{
      res.json(recipes)
    }
  });
});

app.post('/api/recipes', (req, res) => {
  var recipe = req.body;
  Recipe.addRecipe(recipe, function(err, recipe){
    if (err){
      throw err;
    }else{
      res.json(recipe)
    }
  });
});

app.put('/api/recipes/:_id', (req, res) => {
  var id = req.params._id;
  var recipe = req.body;

  Recipe.updateRecipe(id, recipe, {}, function(err, recipe){
    if (err){
      throw err;
    }else{
      res.json(recipe)
    }
  });
});

app.delete('/api/recipes/:_id', (req, res) => {
  var id = req.params._id;
  Recipe.deleteRecipe(id, function(err, recipe){
    if (err){
      throw err;
    }else{
      res.json(recipe)
    }
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
