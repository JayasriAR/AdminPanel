const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid: Number,
  uname:String,
  uaddress: String,
  uphno: Number,
  uemail:String,
  image:String
});

module.exports = mongoose.model('User', userSchema);