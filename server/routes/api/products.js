var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
const multer = require('multer');
var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])    
  }
});
var upload = multer({ storage: storage });

const Product = require('../../models/product.model');
const authValid = require('../../security/auth-validator');

//--------------get all -----------------------------
router.get('/all',cors(corsOptions),authValid,  (req, res) => {
  Product.find((err, data) => {
    res.status(200).json({data : data, msg: "Get all products"});
  });
});

//---------------------get one ------------------
router.get('/single/:id',authValid, (req, res) => {
  id = req.params.id;
  Product.find({_id :id },(err, data) => {
    res.json({data : data, status: 200, msg: "get one product"})
  });
})


//------------- add new------------------------
router.post('/add' ,cors(corsOptions), upload.single('image'),authValid,function (req, res, next) {
  categ = JSON.parse(req.body.category);
  let product = new Product ({
    name:  req.body.name,
    category: categ,
    price: req.body.price,
    image: (`http://localhost:3000/images/${req.file.filename}`)
  });
  product.save()
          .then(result => {
            let pop = Product.findById(result._id);
            pop.populate('categories').exec(function (err, newProduct) {
              if (err) {
                  res.status(500).json({ msg: 'Couldn`t get Products, but the Product was saved', error: err })
              }

              res.status(201).json({
                  msg: 'Product added Successfully', product: newProduct
              });
            })
          })
          .catch(error => {
            res.status(500).json({
                msg: 'Failed to save the product',
                error: error
            });
          });
});

//------------- update --------------------------
router.post('/update',cors(corsOptions), upload.single('image'),authValid, (req, res) => {
  categ = JSON.parse(req.body.category);

  let product = new Product ({
    _id: req.body.id,
    name:  req.body.name,
    category: categ,
    price: req.body.price,
    image: (`http://localhost:3000/images/${req.file.filename}`)
  });
 
  Product.updateOne({ _id: req.body.id },product)
    .then(result =>{
      res.status(201).json({msg: 'Success, product updated!' });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Product update failed', err: error });
    })
})

//------------------------delete----------------------------
router.delete('/:id',cors(corsOptions),authValid, (req, res) => {
  id = req.params.id;
  Product.findOneAndRemove({_id: id })
    .then( data => {
      res.status(200).json({data : data, msg: "Product deleted!"});
    })
    .catch(err => {
      res.status(500).json({ msg: 'Product not Deleted!', err: err });
    });
});



// count all of the products
router.get('/count',cors(corsOptions),authValid,  (req, res) => {
  Product.count((err, data) => {
      res.status(200).json({data : data, msg: "count all Products"});
  });
});

module.exports = router;