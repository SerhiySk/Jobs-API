const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith('Bearer'))
    throw new UnauthenticatedError('Authentification invalid');
  const token = authHeaders.split(' ')[1];
  try {
    console.log(process.env.JWT_SECRET);
    console.log(jwt);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError('Authentification invalid');
  }
};

module.exports = auth;
