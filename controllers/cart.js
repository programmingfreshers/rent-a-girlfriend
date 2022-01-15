const mongoose = require('mongoose');
const express = require('express');
const router  = express.Router();
const userDatabase = require('../database/userDatabase');
const girlsDatabase = require('../database/database');
const authUser = require('../routes/userAuthentication');
router.post('/cart',(req,res)=>{
     console.log(mongoose.Types.ObjectId(authUser.userID));
     userDatabase.findOne({
          _id : authUser.userID
     })
     .then((user)=>{
          // const bookingsArray = [];
          const girlsList = user.bookings;
          const girlsData = [];
          var totalRent = 0;
          girlsList.forEach((girlfriend)=>{
               if(girlfriend['name'] != null){
                    girlsData.push({
                         'name' : girlfriend['name'],
                         'rent' : girlfriend['rent'],
                         'id' : girlfriend['id'],
                    })
                    totalRent += parseInt(girlfriend['rent']);    
               }
               });              
          res.render('cart',{productsList : girlsData ,totalRent : totalRent});
     })
     .catch((err) =>{
          console.log(err);
          res.redirect('/homepage');
     });
});
module.exports = router;