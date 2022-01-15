const express = require('express');
const mongoose = require('mongoose');
const productsSchema = require('../database/database');
const router = express.Router();
const products = new productsSchema();
router.use('/products',(req,res)=>{
     var ls = [];
     productsSchema.find()
          .then((products)=>{
                
               products.forEach((item)=>{
                    ls.push({
                         'name' : item['name'],
                         'id' :mongoose.Types.ObjectId( item['_id']),
                         'photoURL': item['photoURL']
               });
                   
               });
               res.render('products',{productsList:ls});
          })
          .catch((err)=>{
               console.log(err);
          });
});
module.exports = router;