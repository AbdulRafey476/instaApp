// grab the packages that we need for the user model
const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcryptjs");

//User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    index: { unique: true }
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = (username, callback) => {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
