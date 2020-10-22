const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()
const app = express()

//env variables
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

// Middleware to help with form submission
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use(express.static('public'))

// Mongoose connection code
mongoose.connect(mongodbURI, { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo daddy')
})

// Controllers
const guitarsController = require('./controllers/guitars.js')
app.use('/luthiers', guitarsController)

app.get('/', (req, res) =>{
  res.send('tone daddy')
})

app.listen(PORT, () =>{
  console.log("Hello Daddy")
})
