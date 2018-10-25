var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
const authValid = require('../../security/auth-validator');
const Order = require('../../models/order.model');


//count all of the orderss
router.get('/count',cors(corsOptions),authValid,  (req, res) => {
  Order.count((err, data) => {
      res.status(200).json({data : data, msg: "count all Orders"});
  });
});

//create new order
router.post('/create',cors(corsOptions),authValid,  (req, res) => {
  const temp = req.body;
    let order = new Order ({
      customer: temp.customer,
      cart: temp.cart,
      totalPrice: temp.totalPrice,
      city: temp.city,
      street: temp.street,
      deliveryDate: temp.deliveryDate,
      orderDate: temp.orderDate,
      paiment: temp.paiment
    });
    order.save()
      .then(result=>{
        let pop = Order.findById(result._id);
        pop.populate('customer').populate('cart').exec((err,newOrder)=>{
          if (err) {
            res.status(500).json({ msg: 'Couldn`t get the order, but the new order was saved', error: err })
        }
        res.status(201).json({msg: 'order added Successfully', data: newOrder});
        })
      })
      .catch(error => {
        res.status(500).json({
            msg: 'Failed to save the order',
            error: error
            });
        });
});

module.exports = router;