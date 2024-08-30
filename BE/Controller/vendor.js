const express = require('express')
const Router = express.Router()
const VendorModel = require('../schemas/vendor');
var jwt = require('jsonwebtoken');
Router.get('/get_all_vendors', async (req, res) => {
  
    let token = req.headers.authorization;
    let decoded; 
    jwt.verify(token, 'arjadminpanel', (err, result) => {
        if (err) {
            console.error(err);
        } else {
            decoded = result;
            console.log(decoded);
        }
    });
  
    if (decoded) {
    // Use the find method to fetch all products
    const allVendors = await VendorModel.find();
    if (!allVendors) {
      return res.send({ status: 0, message: 'No Vendor Found' });
    }
    // Send the products as a response
    res.send({ status: 1, message: 'Venddors fetched successfully', data: allVendors });
  }
});

Router.post('/vendor_post_method', async (req, res) => {
  const { vname, vaddress, vphno, vemail } = req.body;
  const newVendor = new VendorModel();
  newVendor.vname = vname;
  newVendor.vaddress = vaddress;
  newVendor.vphno = vphno;
  newVendor.vemail=vemail;
  vendor1= await newVendor.save();
  console.log("---------",vendor1)
 if(!vendor1){
  res.send({status:0,message:'something went wrong'})
 }
 else{
  res.send({status:1,message:'Vendor added successfully'})
 }
 })
 
 Router.put('/edit_vendor/:vendorId', async (req, res) => {
  const { vname, vaddress, vphno, vemail } = req.body;
  const { vendorId } = req.params;
  try {
    const vendor = await VendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ status: 0, message: 'Vendor not found' });
    }
    // Update vendor details if provided
    if (vname !== undefined) {
      vendor.vname = vname;
    }
    if (vaddress !== undefined) {
      vendor.vaddress = vaddress;
    }
    if (vphno !== undefined) {
      vendor.vphno = vphno;
    }
    if (vemail !== undefined) {
      vendor.vemail = vemail;
    }   
    await vendor.save();
    return res.status(200).json({ status: 1, message: 'Vendor updated successfully' });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return res.status(500).json({ status: 0, message: 'Internal Server Error' });
  }
});
 Router.delete('/delete_vendor/:vendorId', async (req, res) => {
  const { vendorId } = req.params;

  try {
    // Find the product by ID
    const vendor = await VendorModel.findById(vendorId);

    if (!vendor) {
      return res.send({ status: 0, message: 'Vendor not found' });
    }
    await VendorModel.findByIdAndDelete(vendorId);

    res.send({ status: 1, message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ status: 0, message: 'Something went wrong' });
  }
});
  

  
module.exports =  Router;