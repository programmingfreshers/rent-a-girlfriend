const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
     name :{
          type : String,
          required : true
     },
     phoneNo : {
          type : String,
          unique : true,
          required : true
     },
     password : {
          type : String,
          required : true
     },
     age : {
          type :String,
          required : true
     },
     bookings : {
          type : [{
               name : {
                    type : String,
                    required : false
               },
               rent : {
                    type : String,
                    required : false
               },
               date : {
                    type : String,
                    required : false
               },
               id : {
                    type : String,
                    required : false
               },
               photoURL :{
                    type: String,
                    required : false
               }
          }],
          required : true
     }
});
module.exports = mongoose.model('userDatabase',userSchema);
