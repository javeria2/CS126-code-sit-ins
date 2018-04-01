var Users    = require('../models/staff');
    express  = require('express'),
	  router   = express.Router();

router.get('/discussion', function(req, res) {

});

router.get('/:netid', function(req, res) {
  Users.find({ netid: req.params.netid }, function(err, user) {
    if (err) {
      res.status(500).json({ message: err, data: [] });
      return console.error(err);
    } else {
      if(user.length == 0) {
        res.json({ message: "user not found in db", data: [] });
      } else {
        res.json({ message: "OK", data: user });
      }
    }
  });
});

router.post('/:netid', function(req, res) {
  var newUser = new Users(req.body);
  newUser.save(function(err, user) {
    if (err) {
      res.status(500).json({ message: err, data: [] });
      return console.error(err);
    } else {
      res.status(201).json({ message: "User successfully added!", data: user });
    }
  });
});

router.get('/', function(req, res) {
  Users.find({}, function(err, users){
    if (err) {
      res.status(500).json({ message: err, data: [] });
      return console.error(err);
    } else {
      if(users.length == 0) {
        res.status(404).json({ message: "No user found in the db", data: [] });
      } else {
        res.json({ message: "OK", data: users });
      }
    }
  });
});


module.exports = router;
