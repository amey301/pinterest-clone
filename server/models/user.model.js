const mongoose = require('mongoose');
const { Schema } = mongoose;
const plm = require('passport-local-mongoose'); 

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  dp: {
    type: String, // Can be a URL or a path to the image
    default: '',  // Optional default value
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' // Reference to the Post model
  }] 
}, { timestamps: true });

userSchema.plugin(plm)
// console.log(`This is userscham plugin`,userSchema.plugin(plm))
module.exports = mongoose.model('User', userSchema);
