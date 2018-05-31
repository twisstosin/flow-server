'use strict';

import {bcrypt} from 'bcrypt'

export default function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    Name: DataTypes.STRING,
    Location: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.Password = bcrypt.hashSync(user.Password, salt)
      }
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
    };

  User.associate = function (models) {
    // associations can be defined here
  };

  sequelize.sync()
  .then(() => console.log("users table has been created, if one didn\'t exist"))
  .catch(error => console.log("Error occured", error));
  return User;
}