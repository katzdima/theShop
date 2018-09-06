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
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])    
  }
});
var upload = multer({ storage: storage });

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
    //res.sendFile(__dirname + '/smile.jpg');
    res.json({data : data, status: 200, msg: "get one product"})
  });
})


//------------- add new------------------------
router.post('/add' , upload.single('product'),function (req, res, next) {
  console.log("in add product");
  console.log(req.file);

  let product = new Product ({
    _id: new mongoose.Types.ObjectId(),
    name:  req.body.name,
    category: req.body.category,
    price: req.body.price,
    image: (`http://localhost:3000/images/${req.file.filename}`)
  });
  product.save(function(err){
    if (err) return handleError(err);
  });
  res.json({data:product ,status: 200 ,msg: "product added!"});
});

//------------- update --------------------------
router.put('/', (req, res) => {
  id = req.body.id;

  Product.findById(id, upload.single('product'), function (err, product) {
      if (err) return handleError(err);

      product.name=req.body.name;
      product.category=req.body.category;
      product.price=req.body.price;
      product.image=(`http://localhost:3000/images/${req.file.filename}`);

      product.save(function (err, data) {
        if (err) return handleError(err);
        res.json({data : product, status: 200, msg: "product updated!"})
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