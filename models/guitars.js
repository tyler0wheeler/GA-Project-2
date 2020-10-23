const mongoose = require('mongoose')

const guitarSchema = new mongoose.Schema({
  builder: String,
  bodyShape: {type: String, required: true},
  topWood: {type: String, required: true},
  backAndSidesWood: {type: String, required: true},
  neckWood: {type: String, required: true},
  fretboard: {type: String, required: true},
  bodyBinding: {type: String, required: true},
  neckBinding: {type: String, required: true},
  bridge: {type: String, required: true},
  trussrod: {type: String, required: true},
  nut: {type: String, required: true},
  saddle: {type: String, required: true},
  scaleLength: Number,
  numOfFrets: {type: Number, required: true},
  fretMaterial: {type: String, required: true},
  inlayMaterial: {type: String, required: true},
  tuningMachines: {type: String, required: true},
  electronics: {type: String},
  bodyFinish: {type: String, required: true},
  neckFinish: {type: String, required: true},
  frontImage: String,
  backImage: String,
  additionalComments: String,
})

const Guitar = mongoose.model('Instrument', guitarSchema)

module.exports = Guitar
