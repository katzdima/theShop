var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

const Product = require('../../models/product.model');

//--------------get all -----------------------------
router.get('/',cors(corsOptions),  (req, res) => {
  Product.find((err, data) => {
    res.json({data : data, status: 200, msg: "Get all products"});
  });
});

//---------------------get one ------------------
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  id = req.params.id;
  Product.find({_id :id },(err, data) => {
    if (err) return handleError(err);
    console.log(data);
    res.json({data : data, status: 200, msg: "get one product"})
  });
})


//------------- add new------------------------
router.post('/add', function (req, res, next) {
  console.log("in add product");
  let product = new Product ({
    _id: new mongoose.Types.ObjectId(),
    name:  req.body.name,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image
  });
  product.save(function(err){
    if (err) return handleError(err);
  });
  res.json({data:data ,status: 200 ,msg: "product added!"});
});

//------------- update --------------------------
router.put('/', (req, res) => {
  id = req.body.id;

  Product.findById(id, function (err, product) {
      if (err) return handleError(err);

      product.name=req.body.name;
      product.category=req.body.category;
      product.price=req.body.price;
      product.image=req.body.image;

      product.save(function (err, data) {
        if (err) return handleError(err);
        res.json({data : data, status: 200, msg: "product updated!"})
      });
    });
})

//------------------------delete----------------------------
router.delete('/:id', (req, res) => {
  id = req.params.id;
  Product.findOneAndRemove({_id: id }, (err, data) => {
      res.json({data : data, status: 200, msg: "Product deleted!"});
  })
})

module.exports = router;