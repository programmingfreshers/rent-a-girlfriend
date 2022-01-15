const express = require('express');
const mongoose = require('mongoose');
const girlsDatabase = require('../database/database');
const userDatabase = require('../database/userDatabase');
const router = express.Router();
const girl = require('../models/loginAuthorization');
let date_ob = new Date();
router.post('/update',(req,res) =>{
     const id = req.body['id'];
     const phoneNo = req.body['phoneNo'];
     var pageData = '';
     const girlID = girl.girlID;
     console.log(mongoose.Types.ObjectId(girlID));
     if (id == 'new_bookings'){
          girlsDatabase.findOne({
               _id : girlID
          })
          .then((girl)=>{
               const girlData = girl.bookings;
               const userID = girlData[girlData.length - 1]['customerID'];
               userDatabase.findOne({
                    _id : mongoose.Types.ObjectId(userID)
               })
               .then((user)=>{
                    const userName = user.name;
                    const pageData  = {
                         'customerName' : userName,
                         'date' : girlData[girlData.length - 1]['date'], 
                         'rent' : girlData[girlData.length - 1]['rent'] 
                    }
                    res.render('page',{
                         pageTitle : 'New Bookings',
                         pageData : pageData
                    })
               })
               .catch((err)=>{
                    console.log(err);
                    res.redirect('/homepage')
               });
               // pageData = [

               // ]
               // res.render('page',
               // {
               //      pageTitle : 'New Bookings',
               //      pageData : pageData[pageData.length - 1] 
               // });               
          })
          .catch(err =>{
               console.log(err);
               res.redirect('/homepage');
          });
     }
     else if (id == 'check_balance'){
          girlsDatabase.findOne({
               _id : girl.girlID
          })
          .then((girl)=>{
               const girlData = girl.bookings;
               console.log(girlData);
               var totalIncome = 0;
               girlDatacopy = girlData.slice(0 , girlData.length - 2);
               girlDatacopy.forEach((booking) => {
                    totalIncome += parseInt(booking['rent']);
                    console.log(booking['rent']);
                    console.log(totalIncome);
               });
               var date = ("0" + date_ob.getDate()).slice(-2);
               var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
               var year = date_ob.getFullYear();
               const pageData  = {
                    'customerName' : girl.name,
                    'date' : (date + "-" + month + "-" + year).toString(), 
                    'rent' : totalIncome 
               }
               res.render('page',{pageTitle : 'Check Balance',pageData : pageData})
               
          })
          .catch((err)=>{
               console.log(err);
               res.redirect('/homepage');
          })
     }
     // else if (id == 'schedule'){
     //      res.render('page',{pageTitle : 'Schedule',pageData : 'asd'})
     // }     
     // else if (id == 'all_records'){
     //      res.render('page',{pageTitle : 'All Records',pageData : 'sda'})
     // }
     // else if(id == "delete_profile"){
     //      girlsDatabase.findOneAndUpdate(
     //           {  // filter condition
     //                _id : mongoose.Types.ObjectId(id)
     //           }, 
     //           {   // update condition
     //                name : req.body['name'],
     //                age : req.body['age'],
     //                phoneNo : req.body['phoneNo'],
     //                description : req.body['description'],
     //                photoURL : req.body['photoURL']
     //           }
     //           )
     //           .then((product)=>{
     //           })
     //           .catch((err)=>{
     //                console.log(err);
     //                res.redirect('/homepage');
     //           });
     //      girlsDatabase.findById({_id : mongoose.Types.ObjectId(id)})
     //           .then((productUpdated)=>{
     //                res.render('displaySingleProduct',{product:productUpdated})
     //           })
     //           .catch((err)=>{
     //                console.log(err);
     //           });
     // }
     else if(id == 'delete_profile'){
          girlsDatabase.findOneAndDelete({phoneNo : phoneNo})
               .then((product)=>{
                    res.redirect('/homepage');
               })
               .catch((err)=>{
                    console.log(err);
               });
     }
     else {
          girlsDatabase.findOneAndUpdate(
               {  // filter condition
                    _id : mongoose.Types.ObjectId(id)
               }, 
               {   // update condition
                    name : req.body['name'],
                    age : req.body['age'],
                    phoneNo : req.body['phoneNo'],
                    description : req.body['description'],
                    photoURL : req.body['photoURL']
               }
                    )
                    .then((product)=>{
                    })
                    .catch((err)=>{
                         console.log(err);
                         res.redirect('/homepage');
                    });
               girlsDatabase.findById({_id : mongoose.Types.ObjectId(id)})
                    .then((productUpdated)=>{
                         res.render('displaySingleProduct',{product:productUpdated})
                    })
                    .catch((err)=>{
                         console.log(err);
                    });
          }
     
});
module.exports = router;