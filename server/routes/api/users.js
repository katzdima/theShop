var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var passport = require('passport');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
const secret = 'TheShop';
const User = require('../../models/user.model');
const authValid = require('../../security/auth-validator');

router.get('/',  (req, res) => {
    User.find((err, data) => {
      res.json({data : data, status: 200, msg: "Get all users"});
    });
});

// New User reistration
    router.post("/register",cors(corsOptions), (req, res, next) => {
        
    bcrypt.hash(req.body.pwd, 10).then(hash => {
        const user = new User({
            username: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            pwd: hash,
            city: req.body.city,
            street: req.body.street,
            role: req.body.role
        });
        user.isNew = true;
        user.save()
            .then(result => {
                    res.status(201).json({msg: "User created!", result: result});
            })
            .catch(error => {
                res.status(500).json({msg: 'Invalid authentication credentials.', error: error});
            });
    });
    });


// User Login
router.post('/login',cors(corsOptions), (req, res, next) => {
  let resUser;
  User.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ msg: 'Authentication failed' });
          }
          resUser = user;
          return bcrypt.compare(req.body.pwd, user.pwd);
      })
      .then(result => {
          if (!result) {
              return res.status(401).json({ msg: 'Authentication failed' });
          }
          const token = jwt.sign({ email: resUser.email, userId: resUser._id }, secret);
          resUser.pwd='';
          res.status(200).json({ msg: 'Login Successful', token: token ,userdata: resUser});
      })
      .catch(err => {
          return res.status(401).json({ msg: 'Authentication failed', err: err });
      })
});




router.get('/emailcheck/:email', (req, res, next) => {
    User.findOne({ email: req.params.email })
        .then(data =>{
            if(data){
                res.status(200).json({data : 'true', msg: "This email exists in database"});
            }
            else{
                res.status(200).json({data : 'false', msg: "This email don't exists in database"})
            }
        })
        .catch(err => {
            return res.status(401).json({ msg: 'Email query failed', err: err });
        })
});

//count all of the users
router.get('/count',cors(corsOptions),  (req, res) => {
    User.count((err, data) => {
        res.status(200).json({data : data, msg: "count all users"});
    });
});

module.exports = router;