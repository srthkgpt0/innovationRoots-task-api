const logger = require("./logger");
function errorHandler(methodName, error, res) {
  logger.error(`Inside ${methodName}. error:` + error);
  res
    .send({
      status: false,
      response: null,
      message: error,
    })
    .end();
}

function responseHandler(res, data) {
  res
    .send({
      status: true,
      response: data,
      message: null,
    })
    .end();
}
module.exports = {
  errorHandler,
  responseHandler,
};
