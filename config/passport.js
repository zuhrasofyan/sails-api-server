const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({id}, (err, users) => {
    cb(err, users);
  });
});

passport.use(new LocalStrategy({
  // by default, passport use username and password field as input. I prefer to use authenticate by email address field,
  // thus change the default usernameField to 'email'.
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {
  User.findOne({email: email}, (err, user) => {
    if (err) {
      return cb(err);
    } else if (!user) {
      return cb(null, false, {message: 'Cannot find email'});
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) {
        return cb(err);
      } else if (!res) {
        return cb(null, false, {message: 'Wrong password'});
      } else {
        let userDetails = user;
        return cb(null, userDetails, {message: 'Login success'});
      }
    });
  });
}));
