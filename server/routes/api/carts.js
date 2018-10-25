var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
const authValid = require('../../security/auth-validator');
const Cart = require('../../models/cart.model');

//----check for active cart by costumer id--------
router.get('/active/:costumerId',cors(corsOptions),authValid,(req,res)=>{
  Cart.find({customer: req.params.costumerId, active:true})
  .then(cart =>{
    if(cart.length > 0){
      res.status(200).json({data : cart, msg: "active cart"});
    }
    else{
      res.status(201).json({data:null, msg:'no active cart'});
    }

  })
});

//---------creat new cart------------
router.get('/newcart/:costumerId',cors(corsOptions),authValid,(req,res)=>{
  const start = Date.now();
  let cart = new Cart ({
    createDate:start,
    active:true,
    customer:req.params.costumerId
  });
  cart.save()
    .then(cart => {
      res.status(200).json({data : cart, msg: "Cart created!"});
    })
    .catch(error => {
      res.status(500).json({
          msg: 'Failed to creat new cart',
          error: error
      });
    });
})

//---------deactivate cart---------
router.get('/deactivatecart/:cartId',cors(corsOptions),authValid,(req,res)=>{
  const cartId = req.params.cartId;
  Cart.findByIdAndUpdate(cartId, {$set: {'active': false}})
    .then(cart => {
      res.status(200).json({data : cart, msg: "Cart deactivated!"});
    })
    .catch(error => {
      res.status(500).json({msg: 'Failed to creat new cart', error: error });
    });
});

module.exports = router;