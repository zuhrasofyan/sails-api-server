
module.exports = {

  friendlyName: 'Show all user',

  description: 'show all user data from database',

  inputs: {},

  exits: {
    success: {
      description: 'All User data Successfully fetched!',
      statusCode: 200,
    },
    badRequest: {
      description: 'Cannot fetch user data',
      responseType: 'badRequest',
    }
  },


  fn: async function (inputs, exits) {

    try {
      const users = await User.find();
      return exits.success(users);
    } catch(error) {
      return exits.badRequest(error);
    }

  }


};
