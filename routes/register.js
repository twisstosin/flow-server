var express = require('express');
var router = express.Router();
var db = require('../models/index');
var User = db.sequelize.import('../models/user');
var sessionHelper = require('../helpers/session-helper');

/* GET login page. */
router.post('/', sessionHelper, function(req, res, next) {

  User.create({ Name : req.body.name, Username: req.body.username, Password: req.body.password })
  .then(() => User.findOrCreate({where: {Username: req.body.username}, defaults: {Name: 'John Doe'}}))
  .spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
    res.send(200, user)
  })
  .catch(error =>{
    console.log(error);
    res.send(404)
  });
});

module.exports = router;