// bad request
module.exports = function badRequest(optionalData = null) {
  const statusCodeToSet = 400;
  return this.res.status(statusCodeToSet).send(optionalData);
};
