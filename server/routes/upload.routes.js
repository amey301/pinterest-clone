const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const router = require('./user.routes')
const path = require('path')
const userModel = require('../models/user.model')
const postModel = require('../models/post.model')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4()
    cb(null,uniqueName+path.extname(file.originalname)) //gives extesnin to file, from frontend waht user uplaided
  }
})

function isLoggedIn(req, res, next) {
    console.log('Session:', req.session);
    console.log('User:', req.user);
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ success: false, message: 'Not logged in' });
}

const upload = multer({ storage: storage })

router.post('/upload',isLoggedIn, upload.single('file'),async (req, res, next) => {
    console.log(`Uplaod route hit`)
    if(!req.file){
       return res.status(400).json({
            success: true,
            message: "No files selected"
        })
    }
    const user = await userModel.findOne({
      username: req.session?.passport?.user
    })
    const post = await postModel.create({
      image: req.file.filename,
      title: req.body.title,
      board: req.body.board,
      tags: req.body.tags,
      user: user._id

    })
    user.posts.push(post._id)
    await user.save()

    console.log(`Post done`)
    return res.status(201).json({
        success: true,
        message: 'File uploaded successfully'
    })
})

module.exports = router