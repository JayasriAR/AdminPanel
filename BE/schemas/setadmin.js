const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  // adminid:Number,
  adminemail:String,
  adminpassword:String
});

module.exports = mongoose.model('Admin', adminSchema);