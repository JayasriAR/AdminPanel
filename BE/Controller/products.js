const express = require('express')
const Router = express.Router()
const ProductModel = require('../schemas/products');
var jwt = require('jsonwebtoken');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'product_uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
    }
  })
 
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set your desired file size limit in bytes (5 MB in this example)
  });

  const fs = require('fs');
const path = require('path');
Router.get('/get_all_products', async (req, res) => {
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
      const allproducts = await ProductModel.find();
      if (!allproducts) {
          return res.send({ status: 0, message: 'No Products Found'});
      }

      // Process each user to include image URL or base64 representation
      const ProWithImages = allproducts.map(pro => {
        const imagePath = path.join(__dirname, '../product_uploads', pro.proimage); // Assuming your images are stored in 'uploads' folder
        const imageBase64 = fs.readFileSync(imagePath, 'base64');
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`; // Adjust the format based on your image type

        return {
          _id: pro._id,
          pname: pro.pname,
          description: pro.description,
          stockcount: pro.stockcount,
          pprice: pro.pprice,
          proimage: imageUrl, // or use 'imageBase64' for base64 representation
        };
      });

      res.send({ status: 1, message: 'Products fetched successfully', data: ProWithImages, token: token });
  } else {
      res.send({ status: 0, message: 'Invalid Token'});
  }
});

Router.post('/Product_post_method',upload.single('proimage'), async (req, res) => {
  console.log('req.body',req.body);
    console.log('req.file',req.file);
    const { pname, description, pprice, stockcount } = req.body;
    const newProduct = new ProductModel();
    newProduct.pname = pname;
    newProduct.description = description;
    newProduct.pprice = pprice;
    newProduct.stockcount = stockcount;
     newProduct.proimage=req.file.filename;

    console.log('Products added successfully',req.body)
    product1= await newProduct.save();
  console.log("---------",product1)
 if(!product1){
  res.send({status:0,message:'something went wrong'})
 }
 else{
  res.send({status:1,message:'Product added successfully'})
 }
  })


  Router.put('/edit_product/:productId', upload.single('proimage'), async (req, res) => {
    const { pname, description, pprice, stockcount } = req.body;
    const { productId } = req.params;
  
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.send({ status: 0, message: 'Product not found' });
      }
  
      // Update product details if provided
      if (pname !== undefined) {
        product.pname = pname;
      }
      if (description !== undefined) {
        product.description = description;
      }
      if (pprice !== undefined) {
        product.pprice = pprice;
      }
      if (stockcount !== undefined) {
        product.stockcount = stockcount;
      }
  
      // Remove old image if a new one is provided
      if (req.file) {
        const imagePath = path.join(__dirname, '../product_uploads', product.proimage);
        fs.unlinkSync(imagePath);
        product.proimage = req.file.filename;
      }
  
      await product.save();
  
      res.send({ status: 1, message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      res.send({ status: 0, message: 'Something went wrong' });
    }
  });
  Router.delete('/delete_product/:productId', async (req, res) => {
    const { productId } = req.params;
  
    try {
      // Find the product by ID
      const product = await ProductModel.findById(productId);
  
      if (!product) {
        return res.send({ status: 0, message: 'Product not found' });
      }
  
      // Remove the product image
      const imagePath = path.join(__dirname, '../product_uploads', product.proimage);
      fs.unlinkSync(imagePath);
  
      // Remove the product from the database
      await ProductModel.findByIdAndDelete(productId);
  
      res.send({ status: 1, message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.send({ status: 0, message: 'Something went wrong' });
    }
  });
  
  module.exports = Router;