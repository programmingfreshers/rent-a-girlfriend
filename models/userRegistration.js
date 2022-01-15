const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userDatabase = require('../database/userDatabase');
router.post('/userRegistration',(req,res)=>{
     const name = req.body['name'];
     const age = req.body['age'];
     const phoneNo = req.body['phoneNo'];
     const password = req.body['password'];
     const newUser = new userDatabase({
          name : name,
          age : age,
          phoneNo : phoneNo,
          password : password,
          bookings :  [{}]
     });
     newUser.save()
          .then(result =>{
               console.log('user added successfully');
          })
          .catch(err =>{
               console.log(err);
          });
     res.redirect('/homepage');
});
module.exports = router;
