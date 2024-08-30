const express = require('express')
const port = 3001
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
//Routers connect
require('./router')(app)

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jayasriar2002:mEwEKCL0BEJqX7aZ@cluster0.2y17s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
