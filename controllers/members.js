const bcrypt = require('bcrypt')
const express = require('express')
const members = express.Router()
const User = require('../models/users.js')

members.get('/new', (req, res) =>{
  res.render('members/new.ejs',
  {currentUser: req.session.currentUser}
  )
})

members.post('/', (req, res) =>{
  User.findOne({username: req.body.username}, (err, correctUser) =>{
    if (err){
      console.log(err);
    } else if (!correctUser) {
      res.send('a href="/luthiers">No username found.  Please Register')
    } else {
      if (bcrypt.compareSync(req.body.password, correctUser.password)){
        req.session.currentUser = correctUser
        console.log(correctUser);
        res.redirect('/luthiers')
      } else {
        res.send('a href="/luthiers">Incorrect Password. Please try again')
      }
    }
  })
})

members.delete('/', (req, res) =>{
  req.session.destroy(()=>{
    res.redirect('/luthiers')
  })
})

module.exports = members
