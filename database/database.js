const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const girlsSchema = new Schema({
     name : {
          type : String,
          // required : true
     },
     age : {
          type : Number,
          // required : true
     },
     photoURL : {
          type : String,
          // required : true
     },
     phoneNo : {
          type : Number,
          unique : true,
          required  :true
     },
     password  : {
          type  : String,
          required : true
     },
     description : {
          type : String,
          // required : true
     },
     bookings : {
          type : [{
               date : {
                    type : String
               },
               customerID : {
                    type : String
               },
               rent : {
                    type : String
               }
          }],
          required : false
     },
     reviews  : {
          type : [{
               review : {
                    type : String,
                    required : false
               },
               customerID : {
                    type : String,
                    required : false
               }
          }],
          required  : false
     },
     ratings : {
          type : [{
               rating : {
                    type : String,
                    required : false
               },
               customerID : {
                    type : String,
                    required : false
               }
          }],
          required : false
     }
});

module.exports = mongoose.model('girlsDatabase',girlsSchema);
