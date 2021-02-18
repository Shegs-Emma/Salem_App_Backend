const express   = require('express'),
    router      = express.Router();

const userCtrl  = require('../controllers/user');

router.post('/signup', userCtrl.signUp);

router.post('/login', userCtrl.logIn);



module.exports = router;