const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  MONGO_CONFIG = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  SALT_ROUNDS = 10,
  URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%._~#?&//=]*)/,
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  MONGO_CONFIG,
  SALT_ROUNDS,
  URL_PATTERN,
};
