const express  = require('express');
const router = express.Router();
router.use('/userLogin',(req,res)=>{
     res.render('userlogin');
});
module.exports = router;