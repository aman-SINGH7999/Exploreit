const express = require('express')
const router = express.Router();

const { signup, signin} = require('../controllers/auth')

// CREATE USER
router.post('/signup', signup)
// SIGN IN
router.post('/signin',signin)
// GOOGLE AUTH
router.post('/google',)



module.exports = router