'use strict';

var bcrypt = require ('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    Name: DataTypes.STRING,
    Location: DataTypes.STRING,
    Username: {
      type : DataTypes.STRING,
      unique : true 
    },
    Password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.Password = bcrypt.hashSync(user.Password, salt)
      }
    },
  });

  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.Password;
    return values;
  }

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.Password);
    };
  
  sequelize.sync()
    .then(() => console.log("users table has been created, if one didn\'t exist"))
    .catch(error => console.log("Error occured", error));

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
}