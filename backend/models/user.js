const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [{ validator: isURL }],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [{ validator: isEmail }],
  },
  password: {
    type: String,
    required: true,

  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return user;
    });
};

module.exports = mongoose.model('user', userSchema);
