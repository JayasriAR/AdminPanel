const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  vendorid: Number,
  vname:String,
  vaddress: String,
  vphno:Number,
  vemail:String
});

module.exports = mongoose.model('Vendor', vendorSchema);