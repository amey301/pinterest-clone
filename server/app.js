const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./config/db.config')
const userRoute = require('./routes/user.routes')
const postRoute =  require('./routes/post.routes')
const listEndpoints = require('express-list-endpoints')
const flash = require('connect-flash')
const userModel = require('./models/user.model')

const expressSession = require('express-session')
const passport = require('./config/passport.config');

const uploadRoute  = require('./routes/upload.routes')
connectDb()

app.use(express.json())

app.use(cors({
     origin: 'http://localhost:4200',  // ✅ DO NOT use '*'
  credentials: true  
}
))


app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret:'tanu'
}))

app.use(flash())     

app.use(passport.initialize())

app.use(passport.session())
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


// This lists all the endpoints available in the application in particular route file 
console.log('User routes:', listEndpoints(userRoute));
console.log('Post routes:', listEndpoints(postRoute));

app.use('/api/', userRoute)

app.use('/api', postRoute)

app.use('/api', uploadRoute)

app.get('/', (req, res) => {
     res.json({
        success: true,
        Message: 'Welcome to the Pinterest API'
    })
})

module.exports = app