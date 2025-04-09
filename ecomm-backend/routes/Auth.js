const express = require('express');
const { createUser,loginUser, checkUser } = require('../controller/Auth');
const passport =require('passport');

const router = express.Router();
// Add passport.authenticate('local')  *****PassportJs*****
//  /Auth is already added to base path     
router.post('/signup',createUser)
      .post('/login',passport.authenticate('local'), loginUser)
      .get('/check',checkUser)
      
      

exports.router = router;