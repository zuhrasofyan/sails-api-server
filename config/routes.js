/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /' : 'HalloController.hallo',

  'POST /auth/login' : 'AuthController.login',
  'GET /auth/logout' : 'AuthController.logout',

  'POST /user' : 'user/add',
  'GET /user/all' : 'user/show-all',

};
