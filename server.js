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

// Sessions
app.use(session(
  {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

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
const usersController = require('./controllers/users.js')
app.use('/users', usersController)
const membersController = require('./controllers/members.js')
app.use('/members', membersController)

app.get('/', (req, res) =>{
  res.send('tone daddy')
})

app.listen(PORT, () =>{
  console.log("Hello Daddy")
})
