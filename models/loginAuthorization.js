const express = require('express');
const mongoose = require('mongoose');
const girlsDatabase = require('../database/database');
const router = express.Router();

router.post('/loginAuthorization',(req,res)=>{
     const applicant_phoneNo = req.body['phoneNo'];
     const applicant_password = req.body['password'];
     girlsDatabase.findOne({phoneNo : applicant_phoneNo})
     .then((prod)=>{
          girlsDatabase.findOne({_id : mongoose.Types.ObjectId(prod._id)})
          .then((product)=>{
               if(product.password == applicant_password){
                    const girlID = product._id;
                    module.exports.girlID = girlID;
                    res.render('update',{buttonTitle : "Update", product : product});
               }
               else{
                    res.redirect('/homepage');
               }          
          })
          .catch((err)=>{
               console.log(err);
               res.redirect('/homepage');
          })
     })
     .catch(err =>{
          console.log(err);
          res.redirect('/homepage');
     });
     // girlsDatabase.find({phoneNo:applicant_phoneNo})
     // .then((productAuth)=>{
     //           girlsDatabase.findById(mongoose.Types.ObjectId(productAuth._id))
     //           .then((product)=>{
     //                girlsDatabase.findById(mongoose.Types.ObjectId(productAuth._id))
     //                     .then((productInfo)=>{
     //                          console.log(mongoose.Types.ObjectId(productAuth._id));
     //                          res.render('update',{buttonTitle : "Update", product : productInfo});
     //                     })
     //                     .catch((err)=>{
     //                          res.redirect('/homepage');
     //                     });
     //                })
     //           .catch((err)=>{
     //                console.log('authorization unsuccessful');
     //           });
     //      });          
});
module.exports = router;