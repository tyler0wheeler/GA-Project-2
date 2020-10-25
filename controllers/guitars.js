const express = require('express')
const router = express.Router()
const multer = require('multer')
const Guitar = require('../models/guitars.js')

const isAuthenticated = (req, res, next) =>{
	if (req.session.currentUser){
		return next()  // next() is like continue in programming.  Tells us to go to the next route we are trying to hit.
	} else {
		res.redirect('/members/new')
	}
}

//Index
router.get('/', (req, res) =>{
  Guitar.find({}, (err, allGuitars) =>{
    if(err){
      console.log(err);
    } else {
    res.render('guitars/index.ejs', {
      guitars: allGuitars,
      currentUser: req.session.currentUser
    })
    console.log(allGuitars);
  }
  })
})
//New
router.get('/new', isAuthenticated,(req, res) =>{
  res.render('guitars/new.ejs', {currentUser: req.session.currentUser})
})

//Show
router.get('/:id', (req, res) =>{
  Guitar.findById(req.params.id, (err, showGuitar) =>{
    if (err){
      console.log(err);
    } else {
    res.render('guitars/show.ejs', {
      guitars: showGuitar,
      currentUser: req.session.currentUser
    })
    console.log(showGuitar);
      }
    })
  })

// New
router.post('/', isAuthenticated,(req, res) =>{
  Guitar.create(req.body, (err, newGuitar) =>{
    if (err){
      console.log(err);
    } else {
      console.log(newGuitar);
    }
    res.redirect('/members')
  })
})

//Edit
router.get('/:id/edit', isAuthenticated, (req, res) =>{
  Guitar.findById(req.params.id, (err, editGuitar) =>{
    res.render('guitars/edit.ejs', {
      guitars: editGuitar,
      currentUser: req.session.currentUser
    })
  })
})

router.put('/:id', (req, res) =>{
  Guitar.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedGuitar) =>{
    if(err){
      console.log(err);
    } else{
      console.log(updatedGuitar);
      res.redirect('/luthiers/' + req.params.id)
    }
  })
})
//Delete
router.delete('/:id', isAuthenticated, (req, res) =>{
  Guitar.findByIdAndRemove(req.params.id, (err, deletedGuitar) =>{
    if (err){
      console.log(err);
    } else{
      console.log(deletedGuitar);
    res.redirect('/luthiers')
  }
  })
})
// router.get('/seed', (req, res) =>{
//   Guitar.create([
//     {bodyShape: 'Orchestra Model',
//     topWood: 'Red Cedar',
//     backAndSidesWood: 'Mahogany',
//     neckWood: 'Mahogany',
//     fretboard: 'Ebony',
//     bodyBinding: 'Indian Rosewood and Maple',
//     neckBinding: 'Indian Rosewood and Maple',
//     bridge: 'Ebony',
//     trussrod: 'Two way steel',
//     nut: 'Bone',
//     saddle: 'Bone',
//     numOfFrets: 20,
//     fretMaterial: 'Nickel',
//     inlayMaterial: 'Mother of Pearl',
//     tuningMachines: 'Grover 102CV',
//     electronics: 'L.R Baggs Ibeam',
//     bodyFinish: 'Nitrocellulose',
//     neckFinish: 'Nitrocellulose',
//     frontImage: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/407940_10100295611219725_1223297417_n.jpg?_nc_cat=102&ccb=2&_nc_sid=cdbe9c&_nc_ohc=48BrMQWwMCcAX8j3Z_T&_nc_ht=scontent-iad3-1.xx&oh=43470ef4915c2aaf81fd1a35417daccf&oe=5FB8A01E',
//     backImage: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/386144_10100197697913775_953802186_n.jpg?_nc_cat=100&ccb=2&_nc_sid=cdbe9c&_nc_ohc=BD8QfQ1cLggAX-NxHPJ&_nc_ht=scontent-iad3-1.xx&oh=a95c1a98a6eb6439c434f04b0e7731f6&oe=5FB6195C',
//     additionalComments: 'The Cedar is 100 years old',
//   }
//   ])
// })

module.exports = router
