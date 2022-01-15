const express = require('express');
const userDatabase = require('../database/userDatabase');
const girlsDatabase = require('../database/database');
const router = express.Router();
const mongoose = require('mongoose');
const authUser = require('../routes/userAuthentication');
 
router.post('/cartFunctions',(req,res)=>{
     const girlID = req.body['girlID']
     userDatabase.findOneAndUpdate({
          _id : mongoose.Types.ObjectId(authUser.userID)
     },{
         $pull : {
              bookings :{
                   id : girlID
              }
         } 
     }).then(user=>{
          console.log('updated !');
          res.redirect('/homepage')
     })

     // userDatabase.findOne({
     //      _id : mongoose.Types.ObjectId(authUser.userID)
     // }
     // )
     // .then(user=>{
     //      console.log(user.bookings.id);
        
     // })
     // .catch(err=>{
     //      console.log(err);
     //      res.redirect('/homepage')
     // });
     // userDatabase.findOneAndRemove({
     //      _id : mongoose.Types.ObjectId(authUser.userID)
     // },{
     //      $pull:{
     //           bookings : {
     //                id : girlID
     //           }
     //      }
     // })
     // .then(user=>{
     //      res.redirect('/homepage');
     // })
     // .catch(err=>{
     //      console.log(err);
     // });

});
module.exports = router;