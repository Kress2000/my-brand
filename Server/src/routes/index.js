const express = require('express');
const router = express.Router();

router.get('/api/mybrand', (req, res)=>{
    res.send('get all users now!')
})
module.exports = router;