/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const EmailValidator = require('email-validator');

module.exports = {

  friendlyName: 'Add User',

  description: 'Add user into database',

  inputs: {
    password: {
      description: 'Password',
      type: 'string',
      required: true
    },
    passwordConfirmation: {
      description: 'Password confirmation',
      type: 'string',
      required: true
    },
    email: {
      description: 'The email of the user to create',
      type: 'string',
      required: true
    },
  },

  exits: {
    success: {
      description: 'User Successfully created!',
      responseType: 'created',
      statusCode: 201,
    },
    badRequest: {
      description: 'Cannot create user',
      responseType: 'badRequest',
    }
  },

  fn: async function (inputs, exits) {

    if (inputs.password !== inputs.passwordConfirmation) {
      return exits.badRequest({errors: ['Password mismatch']});
    }

    try {
      const email = await EmailValidator.validate(inputs.email);
      if (email === false) {
        return exits.badRequest({errors: ['Email invalid']});
      }
      const user = await User.create({email: inputs.email, password: inputs.password});
      return exits.success(user);
    } catch(error) {
      return exits.badRequest(error);
    }
  }
};
