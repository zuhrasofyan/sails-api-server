/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {

  login: function(req, res) {
    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }
      req.logIn(user, (err)=>{
        if (err) {
          return res.send(err);
        } else {
          const token = jwt.sign(user, sails.config.jwtsecret, {expiresIn: 60 * 60 * 24 * 30}); // token expires in 30 days
          return res.send({
            message: info.message,
            user,
            token
          });
        }
      });
    }) (req, res);
  },

  logout: function(req, res) {
    //req.logout is passportjs function to clear user information. see http://passportjs.org/docs
    req.logout();
    res.sendStatus(200);
  }
};
