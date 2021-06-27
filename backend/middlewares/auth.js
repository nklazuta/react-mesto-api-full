/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError = require('../errors/auth-err');

const handleAuthError = () => {
  throw new AuthError('Необходима авторизация');
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return handleAuthError();
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
