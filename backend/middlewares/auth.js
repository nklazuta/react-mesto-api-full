/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-err');

const handleAuthError = () => {
  throw new AuthError('Необходима авторизация');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
