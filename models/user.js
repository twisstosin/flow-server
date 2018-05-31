'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    Name: DataTypes.STRING,
    Location: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};