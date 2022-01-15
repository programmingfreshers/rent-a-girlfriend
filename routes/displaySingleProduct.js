const express = require('express');
const mongoose = require('mongoose');
const girlsDatabase = require('../database/database');
const router  = express.Router();
const authjs = require('../routes/userAuthentication');
router.post('/displaySingleProduct',(req,res)=>{
     const id = req.body['id'];
     girlsDatabase.findById({_id : mongoose.Types.ObjectId(id)})
          .then((product)=>{ 
               authToken = req.session.isLoggedIn
               res.render('displaySingleProduct',{
                    product:product,
                    authToken:authToken,
                    userID : mongoose.Types.ObjectId(authjs.userID)
               });
          });
});
module.exports = router;