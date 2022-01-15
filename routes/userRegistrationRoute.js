const express = require('express');
const router = express.Router();
router.use('/userRegistration',(req,res)=>{
     res.render('userRegistration');
});
module.exports = router; 