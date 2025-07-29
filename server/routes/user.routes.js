const express = require('express')

const router = express.Router()

const userModel = require('../models/user.model');
const passport = require('passport');
const localStrategy = require('passport-local')


// Passport Configuration
passport.use(new localStrategy(userModel.authenticate()))

passport.serializeUser(userModel.serializeUser())

passport.deserializeUser(userModel.deserializeUser())

// passport.authenticate(new localStrategy(userModel.authenticate()))

router.post('/register', async (req, res) => {

    try {
        const { username, password, email, dp } = req.body;

        const newUser = new userModel({
            username,
            password,
            email,
            dp
        })
        userModel.register(newUser, password, (err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error registering user',
                    error: err.message
                });
            }

            passport.authenticate('local')(req, res, () => {
                res.status(201).json({
                    success: true,
                    message: 'User registered and logged in successfully',
                    user: req.user
                });
            });

            console.log(`User registered successfully:`, user);
        });

    }
    catch (error) {
        res.send({
            success: false,
            message: 'Error registering user',
            error: error.message
        })
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        // this populate() will expand the array , whoch was previosly shoiwng jsut the post id , npow it will show the whloe data of ech item in an array
        const user = await userModel.findById(req.params.id).populate('posts')
        // console.log(`This is populated posts:`, user.posts)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            user: user
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        })
    }

})

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: 'Logged in successfully',
//         user: req.user
//     });
// });


router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error logging out',
                error: err.message
            });
        }
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ success: false, message: 'Not logged in' });
}


router.get('/check-auth', (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user || null
    });
});


router.get('/profile', isLoggedIn, async (req, res) => {
    console.log('🔥 /profile route hit');

    try {
        const username = req.session?.passport?.user;
        console.log('👤 Session username:', username);
        // username.populate('posts')
        if (!username) {
            return res.status(401).json({ success: false, message: 'Not logged in' });
        }

        const user = await userModel.findOne({ username }).populate('posts').lean();
        console.log('📦 User found:', user);
        // user.populate('posts')

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User profile',
            user,
            username: user.username,
        });
    } catch (err) {
        console.error('❌ Error:', err.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/created-posts',isLoggedIn,  async (req, res) => {
    console.log('🔥 /created-posts route hit');
    try {
        const username = req.session?.passport?.user;
        console.log('👤 Session username:', username);
        // username.populate('posts')
        if (!username) {
            return res.status(401).json({ success: false, message: 'Not logged in' });
        }

        const user = await userModel.findOne({ username }).populate('posts').lean();
        console.log('📦 User found:', user);


        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Posts Fetched successfully',
            posts: user.posts,
        });
    }
    catch (err) {
        console.error('❌ Error:', err.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Authentication error',
                error: err.message
            });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Login failed',
                    error: err.message
                });
            }
            console.log('✅ Logged in user:', req.user.username);
            return res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                user: req.user
            });
        });
    })(req, res, next);
});

module.exports = router