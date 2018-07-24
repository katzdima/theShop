var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

const User = require('../../models/product.model');

router.get('/',  (req, res) => {
    User.find((err, data) => {
      res.json({data : data, status: 200, msg: "Get all products"});
    });
});


module.exports = router;