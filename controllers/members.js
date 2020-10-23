const bcrypt = require('bcrypt')
const express = require('express')
const members = express.Router()
const User = require('../models/users.js')
const Guitar = require('../models/guitars.js')

members.get('/new', (req, res) =>{
  res.render('members/new.ejs',
  {currentUser: req.session.currentUser}
  )
})
// members.get('/index', (req, res) =>{
//   res.render('members/index.ejs',
//   {currentUser: req.session.currentUser})
// })
members.get('/', (req, res) =>{
  Guitar.find({builderId: req.session.currentUser._id}, (err, allGuitars) =>{
    if(err){
      console.log(err);
    } else {
    res.render('members/index.ejs', {
      guitars: allGuitars,
      currentUser: req.session.currentUser
    })
    console.log(req.session.currentUser._id);
  }
  })
})
// Show
members.get('/:id', (req, res) =>{
  Guitar.findById(req.params.id, (err, showGuitar) =>{
    if (err){
      console.log(err);
    } else {
    res.render('members/show.ejs', {
      guitars: showGuitar,
      currentUser: req.session.currentUser
    })
    console.log(req.session.currentUser._id);
      }
    })
  })
  //Edit
  members.get('/:id/edit', (req, res) =>{
    Guitar.findById(req.params.id, (err, editGuitar) =>{
      res.render('members/edit.ejs', {
        guitars: editGuitar,
        currentUser: req.session.currentUser
      })
    })
  })

  members.put('/:id', (req, res) =>{
    Guitar.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedGuitar) =>{
      if(err){
        console.log(err);
      } else{
        console.log(updatedGuitar);
        res.redirect('/members/' + req.params.id)
      }
    })
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
//Delete
members.delete('/:id', (req, res) =>{
  Guitar.findByIdAndRemove(req.params.id, (err, deletedGuitar) =>{
    if (err){
      console.log(err);
    } else{
      console.log(deletedGuitar);
    res.redirect('/members')
  }
  })
})
//Logout user
members.delete('/', (req, res) =>{
  req.session.destroy(()=>{
    res.redirect('/luthiers')
  })
})

module.exports = members
