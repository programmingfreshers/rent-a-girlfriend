const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const girlsDatabase = require('../database/database');
router.post('/new-registration',(req,res)=>{

     const candidate_name = req.body['name'];
     const age = req.body['age'];
     const photoURL = req.body['photoURL'];
     const phoneNo = req.body['phoneNo'];
     const password = req.body['password'];
     const description = req.body['description'];
     const applicant = new girlsDatabase({
          name:candidate_name,
          age:age,
          photoURL:photoURL,
          phoneNo : phoneNo,
          password : password,
          description:description,
          reviews : [{}],
          ratings  :[{}],
          bookings : [{}]
     });
     // girlsDatabase.validate(async)
     // girlsDatabase.countDocuments({phoneNo:'111'},(err,count)=>{
     //      console.log("total no of similar documents : "+count);
     // });
     applicant.save()
          .then(result =>{
               console.log('added successfully');
          })
          .catch(err =>{
               console.log(err);
          });
     res.redirect('/homepage');
});
module.exports = router;