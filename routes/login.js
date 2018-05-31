var express = require('express');
var router = express.Router();
var db = require('../models/index');
var User = db.sequelize.import('../models/user');
var sessionHelper = require('../helpers/session-helper');

/* POST login. */
router.post('/', sessionHelper ,function(req, res, next) {
  var username = req.body.username,
      password = req.body.password;
  
  if(!username)
    res.status(400).send('username is required');
    else if(!password)
    res.status(400).send('password is required');

  User.findOne({ where: { Username: username } }).then(function (user) {
      if (!user) {
          res.sendStatus(404);
      } else if (!user.validPassword(password)) {
          res.send(401).send('invalid password');
      } else {
          res.status(200).send(user);
      }
  });
});

module.exports = router;
