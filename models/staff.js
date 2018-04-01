var mongoose = require('mongoose');

//setup user schema
var StaffSchema = new mongoose.Schema({
	netid: String,
  discussions: [{
    day: String,
    start: String,
    end: String
  }],
  ins: [{ //people who signed up for this user's discussion
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  outs: [{ //people who this user signed up for
    id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
  }]
});

module.exports = mongoose.model('User', StaffSchema);
