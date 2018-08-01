var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

const Category = require('../../models/category.model');

router.get('/',  (req, res) => {
    Category.find((err, data) => {
      res.json({data : data, status: 200, msg: "Get all categories"});
    });
});


module.exports = router;