const express = require('express')
const Router = express.Router()
const UserModel = require('../schemas/user');
var jwt = require('jsonwebtoken');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
    }
  })
  const upload = multer({storage:storage})

const fs = require('fs');
const path = require('path');

Router.get('/get_all_users', async (req, res) => {
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
      const allUsers = await UserModel.find();
      if (!allUsers) {
          return res.send({ status: 0, message: 'No Users Found'});
      }

      // Process each user to include image URL or base64 representation
      const usersWithImages = allUsers.map(user => {
        const imagePath = path.join(__dirname, '../uploads', user.image); // Assuming your images are stored in 'uploads' folder
        const imageBase64 = fs.readFileSync(imagePath, 'base64');
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`; // Adjust the format based on your image type

        return {
          _id: user._id,
          uname: user.uname,
          uaddress: user.uaddress,
          uphno: user.uphno,
          uemail: user.uemail,
          image: imageUrl, // or use 'imageBase64' for base64 representation
        };
      });

      res.send({ status: 1, message: 'Users fetched successfully', data: usersWithImages, token: token });
  } else {
      res.send({ status: 0, message: 'Invalid Token'});
  }
});
Router.post('/user_post_method',upload.single('image'), async (req, res) => {
    console.log('req.body',req.body);
    console.log('req.file',req.file);

  const { uname, uaddress, uphno, uemail } = req.body;
  const newUser = new UserModel();
  newUser.uname = uname;
  newUser.uaddress = uaddress;
  newUser.uphno = uphno;
  newUser.uemail= uemail;
  newUser.image=req.file.filename;
  user1= await newUser.save();
  console.log("---------",user1)
 if(!user1){
  res.send({status:0,message:'something went wrong'})
 }
 else{
  res.send({status:1,message:'User added successfully'})
 }
 })

 Router.put('/edit_user/:userId', upload.single('image'), async (req, res) => {
  const { uname, uphno, uaddress, uemail } = req.body;
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.send({ status: 0, message: 'User not found' });
    }

    // Update product details if provided
    if (uname !== undefined) {
      user.uname = uname;
    }
    if (uphno !== undefined) {
      user.uphno = uphno;
    }
    if (uemail !== undefined) {
      user.uemail = uemail;
    }
    if (uaddress !== undefined) {
      user.uaddress = uaddress;
    }

    // Remove old image if a new one is provided
    if (req.file) {
      const imagePath = path.join(__dirname, '../uploads', user.image);
      fs.unlinkSync(imagePath);
      user.image = req.file.filename;
    }

    await user.save();

    res.send({ status: 1, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.send({ status: 0, message: 'Something went wrong' });
  }
});
  Router.delete('/delete_user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the product by ID
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.send({ status: 0, message: 'User not found' });
      }
  
      // Remove the product image
      const imagePath = path.join(__dirname, '../uploads',user.image);
      fs.unlinkSync(imagePath);
  
      // Remove the product from the database
      await UserModel.findByIdAndDelete(userId);
  
      res.send({ status: 1, message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.send({ status: 0, message: 'Something went wrong' });
    }
  });
  
module.exports =  Router;