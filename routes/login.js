var express = require('express');
var router = express.Router();
var db = require('../models/index');
var User = db.sequelize.import('../models/user');
var sessionHelper = require('../helpers/session-helper');

/* POST login. */
router.post('/', sessionHelper ,function(req, res, next) {
  var username = req.body.username,
      password = req.body.password;

  User.findOne({ where: { Username: username } }).then(function (user) {
      if (!user) {
          res.sendStatus(404);
      } else if (!user.validPassword(password)) {
          res.send(402, 'invalid password')
      } else {
          res.send(200, user);
      }
  });
});

module.exports = router;
