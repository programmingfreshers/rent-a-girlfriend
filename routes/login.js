const express = require('express');
const mongoose = require('mongoose');
const girlsDatabase = require('../database/database');
const router = express.Router();
router.get('/girlLogin',(req,res)=>{
     res.render('loginform');
     // girlsDatabase.findById({_id : mongoose.Types.ObjectId('61b1f4d6d31321a731ff550b')})
     //      .then((product)=>{
     //           res.render('update',{buttonTitle : "Update", product:product});               
     //      })
     //      .catch((err)=>{
     //           console.log(err);
     //      });
});
module.exports = router;