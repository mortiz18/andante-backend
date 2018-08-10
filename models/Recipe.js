const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
});



var Recipe = module.exports = mongoose.model('Recipe', recipeSchema);

//function

module.exports.getRecipes = function(callback, limit){
  Recipe.find(callback).limit(limit);
};

module.exports.addRecipe = function(recipe, callback){
  Recipe.create(recipe, callback);
};

module.exports.updateRecipe = function(id, recipe, options, callback){
  var query = {_id: id};
  var update = {
    name: recipe.name,
    cuisine: recipe.cuisine
  }
  Recipe.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteRecipe = function(id, callback){
  var query = {_id: id};
  Recipe.remove(query, callback);
};
