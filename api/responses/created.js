// Successfully created
module.exports = function created(optionalData = null) {
  const statusCodeToSet = 201;
  return this.res.status(statusCodeToSet).send(optionalData);
};
