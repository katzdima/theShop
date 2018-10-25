var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

const Category = require('../../models/category.model');
const authValid = require('../../security/auth-validator');

//----------------------get all ---------------------------
router.get('/', authValid, (req, res) => {
    Category.find((err, data) => {
      res.json({data : data, status: 200, msg: "Get all categories"});
    });
});

//---------------------get one ------------------
router.get('/:id',authValid, (req, res) => {
  console.log(req.params.id);
  id = req.params.id;
  Category.find({_id :id },(err, data) => {
    if (err) return handleError(err);
    res.json({data : data, status: 200, msg: "get one product"})
  });
})

module.exports = router;