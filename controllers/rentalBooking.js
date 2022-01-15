const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userDatabase = require('../database/userDatabase'); 
const girlsDatabase = require('../database/database');
const authUser = require('../routes/userAuthentication');
router.post('/rentalBooking',(req,res)=>{
     // console.log(req.body['productID']);
     const productID = req.body['productID'];
     girlsDatabase.findById(mongoose.Types.ObjectId(productID))
     .then((girl)=>{
          const girlName = girl.name;
          const girlID = girl._id;
          const girlPhoto = girl.photoURL;
          const girlRent = 500*parseInt(req.body['timeRange']);
          const girlDate = req.body['girlDate'];
          console.log(girlRent);
          console.log(req.body['timeRange']);
          girlsDatabase.findOneAndUpdate({
               _id : mongoose.Types.ObjectId(girlID)
          },{
               $push :{
                    bookings : {
                         date : girlDate,
                         customerID : authUser.userID,
                         rent : girlRent
                    }
               }
          }).then((success)=>{
          })
          .catch(err =>{
               console.log(err);
               res.redirect('/homepage');
          });
          userDatabase.findOneAndUpdate({
               _id : mongoose.Types.ObjectId(authUser.userID)
          },
          {
               $push : {
                    bookings : {
                         name : girlName,
                         rent : girlRent,
                         date : girlDate,
                         id : girlID,
                         photoURL : girlPhoto
                    }              
               }
          }).then((success)=>{
               // console.log('added successfully in database');
          })
          .catch(err =>{
               console.log(err);
               res.redirect('/homepage');
          });
     })
     .catch(err =>{
          console.log(err);
          res.redirect('/homepage');
     });

     res.redirect('/homepage');
});
module.exports = router;
