var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  //MLH Data
  first_name: String,
  last_name: String,
  graduation: Date,
  major: String,
  shirt_size: String,
  dietary_restrictions: String,
  special_needs: String,
  date_of_birth: Date,
  gender: String,
  phone_number: Number,
  school: String,

  //Custom Data
  resume: {data: Buffer, contentType: String},
  teamates: String,
  first_hackathon: Boolean,
  sms_notifications: Boolean,

  //Internal
  status: {type: String, default: 'pending'},
  travel: String
});

var Users = mongoose.model('Users', UserSchema);

module.exports = Users;
