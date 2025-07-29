const mongoose = require('mongoose');
const { Schema } = mongoose;
// const User = require('./user.model')
const postSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
     type: String,
    required: true,
    trim: true,
  },
  board: {
     type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [], // Array to hold user IDs who liked the post
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
     
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
