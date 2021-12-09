const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Thanks Harry for this lovely project!';

// create a user using: POST "/api/auth/addUser"; No login required
router.post('/addUser', [
        body('name', 'Enter a valid name of minimum length 3').isLength({min:3}), 
        body('email', 'Enter a valid email id').isEmail(),
        body('password', 'Enter a valid password of minimum length 5').isLength({min:5})
    ], async (req, res)=>{

    // In case of errors return bad request along with error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        // Check with the user with this email exist already
        let user = await User.findOne({email: req.body.email});
        if (user){ return res.status(400).json({error: "A user with this email already exists!"});}
        
        const salt = await bcrypt.genSalt(10);
        const secPwd = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPwd,
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Encountered some error");
    }
})

module.exports = router;