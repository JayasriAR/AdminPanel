const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productid: Number,
  pname:String,
  description: String,
  stockcount:Number,
  pprice:Number,
  proimage:String
});
module.exports = mongoose.model('product', productSchema);