var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
const authValid = require('../../security/auth-validator');
const Item = require('../../models/item.model');


//-------------add Item to cart---------------
router.post('/add' ,cors(corsOptions),authValid,function (req, res, next) {
    const itm = req.body;
    let item = new Item ({
        quantity: itm.quantity,
        product: itm.product,
        totalPrice: itm.totalPrice,
        cart: itm.cart
    });
    item.save()
        .then(result =>{
            let pop = Item.findById(result._id);
            pop.populate('product').exec((err,newItem)=>{
                if (err) {
                    res.status(500).json({ msg: 'Couldn`t get the item, but the new item was saved', error: err })
                }
                res.status(201).json({msg: 'Item added Successfully', item: newItem});
            })
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Failed to save the item',
                error: error
                });
            });
});

//----------get all items in cart---------------
router.get('/allcartitems/:cartId',cors(corsOptions),authValid,function(req,res){
    let pop = Item.find({cart:req.params.cartId});
    pop.populate('product').exec((err,newItems)=>{
        if (err) {
            res.status(500).json({ msg: 'Couldn`t get the items', error: err })
        }
        res.status(200).json({msg: 'All items found', item: newItems});
    })
});

//-------delete one item-------
router.delete('/deleteitem/:itemId',cors(corsOptions),authValid,(req,res)=>{
    let id = req.params.itemId;
    Item.findOneAndRemove({_id:id})
        .then(data => {
            res.status(200).json({data : data, msg: "Item deleted!"});
        })
        .catch(err => {
            res.status(500).json({ msg: 'item not Deleted!', err: err });
        });
});

//----------delete all items in the cart------
router.delete('/deleteall/:cartId',cors(corsOptions),authValid,(req,res)=>{
    let id = req.params.cartId;
    Item.deleteMany({cart :id})
        .then(data =>{
            res.status(200).json({data:data, msg: "All items deleted!"});
        })
        .catch(err => {
            res.status(500).json({ msg: 'items not Deleted!', err: err });
        })
});


module.exports = router;