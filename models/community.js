const mongoose = require('mongoose')

const communityPostSchema = new mongoose.Schema({
  posterName: {type: String, required: true},
  posterUserId: {type: String, required: true},
  post: {type: String, required: true},
}, {timestamps: true})

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema)

module.exports = CommunityPost
