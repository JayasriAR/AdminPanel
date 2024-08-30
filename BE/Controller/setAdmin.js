const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt');
const AdminModel = require('../schemas/setadmin');
var jwt = require('jsonwebtoken');

Router.post('/set_admin', async (req, res) => {
  let email = req.body.email
  let password = req.body.password;
  const newAdmin = new AdminModel();
  newAdmin.adminemail = email;
  const hash = bcrypt.hashSync(password, 10);
  console.log(hash);
  newAdmin.adminpassword = hash;

  Admin1= await newAdmin.save();
  console.log("---------",Admin1)
 if(!Admin1){
  res.send({status:0,message:'something went wrong'})
 }
 else{
  res.send({status:1,message:'Admin added successfully'})
 }
 })

Router.post('/login',async (req,res)=>{ 
  let adminpassword = req.body.adminpassword;
  let adminemail = req.body.adminemail;
  const user= await AdminModel.findOne({adminemail:adminemail});
  if(user && user!=null){
    let hashedpasswrd=user.adminpassword;
    let verify = bcrypt.compareSync(adminpassword,hashedpasswrd);
    if(verify){
      let token = jwt.sign({adminemail:adminemail,adminpassword:adminpassword}, 'arjadminpanel');
      res.send({status:1,token:token,message:'Login Successfully'})

      console.log('login success',token)
      }
      else{
      res.send({status:0,message:'Password wrong'})
      console.log('Password Wrong')
      }
  }
  else{
    res.send({status:0,message:'email doesnt exist'})
    console.log('Mail doesnt exist')
  }
  // const newAdmin = new AdminModel();
  // let verify = bcrypt.compareSync('123',"$2b$10$rwCy1Sl8z7uB14fxWuojYOpCKnDG6KOP/3anHd9oqknsDcUNZ0bIG");
  // if(!verify){
  // res.send({status:0,message:'Password wrong'})
  // }
  // else{
  // res.send({status:1,message:'Login Successfully'})
  // }
})

module.exports =  Router;