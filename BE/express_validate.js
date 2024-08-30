const express = require('express')
const port = 3001
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
   let family=[
        {
        name:"Rangaramanujam S",
        relation:"Father",
        id:1
       },
       {
        name:"Alamelu R",
        relation:"Mother",
        id:2
       },
       {
        name:"Anusri A R",
        relation:"Sister",
        id:3
       },{
        name:"Jayasri A R",
        relation:"Self",
        id:4
       },
       {
        name:"Whity",
        relation:"doggy",
        id:6
       }
]
  res.send({message:'Family details',data:family,status:200})
})

app.post('/post-method', (req, res) => {
    console.log(req.body);
    let res_message=[];
    let reg=req.body.ClgId;
    let name=req.body.username;
    let email=req.body.email;
    console.log('reg no',reg)
    if(!reg){
    res_message.push({message:'enter regno',reg_No:reg,status:400})}
    else{
    res_message.push({message:'Success',reg_No:reg,status:200})}

    if(!name){
    res_message.push({message:'Enter Your Name',name:name,status:400})}
    else{
    res_message.push({message:'Success',name:name,status:200})}
    
    var emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if(!email){
      res_message.push({message:'Enter Your Mail',email:email,status:400})
    }
    else if(emailPattern.test(email)){
      res_message.push({message:'Success',email:email,status:200})
    }
    else{
      res_message.push({message:'Enter Valid Email',email:email,status:400})
    }
    res.send(res_message);

  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})