var express = require('express');
var router = express.Router();
var db = require('../models/index');
var User = db.sequelize.import('../models/user');
var sessionHelper = require('../helpers/session-helper');

/* POST register. */
router.post('/', sessionHelper, function(req, res, next) {
  if(!req.body.username)
    res.status(400).send('username is required');
    else if(!req.body.password)
    res.status(400).send('password is required');
    else if(!req.body.location)
    res.status(400).send('location is required');

  User.findOrCreate({where: {Username: req.body.username}, 
    defaults: {
      Name : req.body.name, 
      Username: req.body.username, 
      Password: req.body.password,
      Location: req.body.location
    }})
  .spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
    if(created)
    res.status(200).send(user)
    else
    res.status(409).send('user already exists')
  })
  .catch(error =>{
    console.log(error);
    res.status(500).send(error.errors[0].details)
  });
});

module.exports = router;