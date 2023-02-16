const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please, try again later',
  };
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;

    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }
  if (err.name == 'CastError') {
    customError.statusCode = StatusCodes.NOT_FOUND;

    customError.msg = `No item found with id:${err.value}`;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
  // return res.status(customError.statusCode).json({ err });
};

module.exports = errorHandlerMiddleware;
