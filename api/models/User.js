/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    username: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    }

  },

  // a sailsjs feature to omit specific attribute in object. in this case, return without password. and Fd of files
  // see https://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?customtojson
  customToJSON: function() {
    return _.omit(this, ['password']);
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return cb(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {return cb(err);}
        user.password = hash;
        return cb();
      });
    });
  }

};

