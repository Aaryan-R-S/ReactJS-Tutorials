const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    myObj = {
        title:'Fetch Milk',
        description:'At 4.20 PM',
        tag:'General',
        date: Date.now()
    }
    res.json(myObj);
})

module.exports = router;