var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }
});

//authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
    user.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
    var user = this;
    console.log('user password', user);
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
});

var user = mongoose.model('user', userSchema);
module.exports = user;