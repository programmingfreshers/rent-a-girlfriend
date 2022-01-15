const path = require('path');
const express = require('express');
const router = express.Router();
router.use('/registration',(req,res)=>{
     res.render('registration',{buttonTitle : 'Submit'});
});
module.exports = router;