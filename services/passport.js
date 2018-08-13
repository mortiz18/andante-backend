const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const localOpts = {
  usernameField: 'username'
};

const localLogin = new LocalStrategy(localOpts, async(username, password, done)=>{
  User.findOne({username}, (err, user) =>{
    if(!user){
      return done(null, false);
    }

    user.authenticateUser(password, function(err, res){
      var isAuthorized = res;
      if(err){
        return done(err, false);
      }
      else if (!isAuthorized){
        return done(null, false)
      }
      else{
        return done(null, user);
      }
    });
  });
});

passport.use(localLogin);

module.exports.Authenticate = passport.authenticate('local', {session: false});
