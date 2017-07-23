var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

const user = mongoose.model('user', userSchema);

module.exports = user;
