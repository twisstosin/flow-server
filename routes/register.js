var express = require('express');
var router = express.Router();
var db = require('../models/index');
var User = db.sequelize.import('../models/user');
var sessionHelper = require('../helpers/session-helper');
var bcrypt = require ('bcryptjs');

/* POST register. */
router.post('/', sessionHelper, function(req, res, next) {
  const salt = bcrypt.genSaltSync();

  User.create({ Name : req.body.name, Username: req.body.username, Password: req.body.password })
  .then(user => {
    res.send(200, user)
  })
  .catch(error =>{
    console.log(error);
    res.send(500, error)
  });
});

module.exports = router;