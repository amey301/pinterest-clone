const express = require('express')

const router = express.Router()

const postModel = require('../models/post.model')

const userModel = require('../models/user.model')
router.post('/create', async (req, res) => {
    try{
        const { image, caption, user } = req.body

        const newPost = new postModel({
            image,
            caption,
            user
        })
        
        const createdPost = await newPost.save()
        
        const  userFound = await userModel.findById(user);
        if(!userFound){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        userFound.posts.push(createdPost._id) 
        await userFound.save()

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: createdPost
        })
        }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error creating post',
            error: error.message
        })

    }
})
 module.exports = router