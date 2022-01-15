const express = require('express');
const mongoose = require('mongoose');
const userDatabase = require('../database/userDatabase');
const router = express.Router();
router.post('/userAuthentication',(req,res)=>{
     const userPhoneNo = req.body['phoneNo'];
     const userPassword = req.body['password'];
     userDatabase.findOne({phoneNo : userPhoneNo})
     .then((user)=>{
          const userID = user._id;
          module.exports.userID = userID;
          
     })
     .catch((err)=>{
          console.log(err);
          res.redirect('/homepage');
     });
     userDatabase.findOne({phoneNo : userPhoneNo})
     .then((user)=>{

          userDatabase.findOne({_id : mongoose.Types.ObjectId(user._id)})
          .then((userDetails)=>{
               if(userDetails.password == userPassword){
                    req.session.isLoggedIn = true;                    
                    res.redirect('/homepage');
               }else{
                    res.redirect('/homepage');
               }
          })
          .catch((err)=>{
               console.log(err);
               res.redirect('/homepage');
          });
     })
     .catch((err)=>{
          console.log(err);
          res.redirect('/homepage');
     });
     // userDatabase.find({
     //      phoneNo : userPhoneNo,
     //      password : userPassword
     // })
     // .then((result)=>{
     //      req.session.isLoggedIn = true;
     //      console.log(req.session.isLoggedIn);
     //      res.redirect('/homepage');         
     // })
     // .catch(err =>{
     //      console.log('unauthorized access');
     //      req.session.isLoggedIn = false;
     //      res.redirect('/homepage');
     // });
     
});
module.exports = router;
 