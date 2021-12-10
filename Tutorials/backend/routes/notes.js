const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all notes using: GET "/api/notes/fetchNotes"; Login required
router.get('/fetchNotes', fetchUser, async (req, res)=>{
    const myNotes = await Note.find({user: req.user.id});
    res.json(myNotes);
})

// ROUTE 2: Add a new note using: Post "/api/notes/addNote"; Login required
router.get('/addNote', fetchUser, [
        body('title', 'Enter a title of minimum length 3').isLength({min:3}), 
        body('description', 'Enter a description of minimum length 5').isLength({min:5})
    ], async (req, res)=>{
    
    // In case of errors return bad request along with error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {title, description, tag} = req.body;
        const myNote = await new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await myNote.save();
        res.json(savedNote);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Update an existing note using: Post "/api/notes/updateNote"; Login required
router.put('/updateNote/:id', fetchUser, async (req, res)=>{
    try{
        const {title, description, tag} = req.body;
        let newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        let myNote = await Note.findById(req.params.id);
        if(!myNote){ return res.status(401).send("Note not found")}
        if(myNote.user.toString()!==req.user.id){
            return res.status(401).send("Access Denied");
        }

        myNote = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({myNote});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 4: Delete an existing note using: Post "/api/notes/deleteNote"; Login required
router.delete('/deleteNote/:id', fetchUser, async (req, res)=>{
    try{
        let myNote = await Note.findById(req.params.id);
        if(!myNote){ return res.status(401).send("Note not found")}
        if(myNote.user.toString()!==req.user.id){
            return res.status(401).send("Access Denied");
        }

        myNote = await Note.findByIdAndDelete(req.params.id);
        res.json({"success":"note has been deleted", "note": myNote});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;