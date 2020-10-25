const bcrypt = require('bcrypt')
const express = require('express')
const community = express.Router()
const multer = require('multer')
const User = require('../models/users.js')
const CommunityPost = require ('../models/community.js')


const isAuthenticated = (req, res, next) =>{
	if (req.session.currentUser){
		return next()  // next() is like continue in programming.  Tells us to go to the next route we are trying to hit.
	} else {
		res.redirect('/members/new')
	}
}
//Index
community.get('/', (req, res)=>{
  CommunityPost.find({}, (err, allPosts) =>{
    if (err){
      console.log(err);
    } else{
      res.render('community/index.ejs', {
        posts: allPosts,
        currentUser: req.session.currentUser
      })
    }
  })
})

//New
community.get('/new', (req, res) =>{
  res.render('community/new.ejs', {currentUser: req.session.currentUser})
})
community.post('/', (req, res) =>{
  CommunityPost.create(req.body, (err, newPost) =>{
    if (err){
      console.log(err);
    } else {
      console.log(newPost);
    }
    res.redirect('/community')
  })
})



module.exports = community
