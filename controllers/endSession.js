const express = require('express');
const router = express.Router();
router.post('/endSession',(req,res)=>{
     req.session.destroy((err)=>{
          console.log(err);
     });
     res.redirect('/homepage');
});
module.exports = router;