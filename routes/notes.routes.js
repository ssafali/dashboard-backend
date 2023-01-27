const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Notes = require("../models/Notes.model");

// Get all notes
router.get('/notes/:_id', async (req, res) => {
    const _id = req.params._id;
    const notes = await Notes.find({user: _id});
    res.json(notes); 
})

// Add a new note
router.post('/notes/new', (req, res, next) => {
    const {title, content, category, pinned, user} = req.body;
    Notes
    .create({title, content, category, pinned, user: mongoose.Types.ObjectId(user)})
    .then((data) => {
        console.log('Notes added successfully')
        res.status(201).json(data);
    })
    .catch((err) => console.log("Error", err))
})

// Edit Pinned
router.post('/notes/edit-pinned', (req, res, next) => {
    const {id, pinned} = req.body;
    Notes.findByIdAndUpdate(id, {pinned}, {new: true} )
    .then((changedNotes) => res.json(changedNotes))
    .catch((err) => console.log(err))
})

// Edit title and/or content
router.post('/notes/edit', (req, response, next) => {
    const {id, title, content, category, pinned} = req.body;
    //let myQuery = { _id: ObjectId(req.params.id) };
    let newValues = {
        $set: {
            title: title,
            content: content,
            category: category,
            pinned: pinned
        },
    };
    console.log(newValues)

    Notes.findByIdAndUpdate(id, newValues, function (err, res) {
    if (err) throw err;

    console.log(`Document updated ${newValues.data}`);
    response.json(res);
    });
})

// Delete a note
router.delete('/notes/delete/:id', (req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: 'Specified id is not valid'})
    }
    Notes.findByIdAndDelete(id)
    .then(() => res.json({message: `Note with ${id} has been removed successfully`}))
    .catch((err) => console.log(err));
})

module.exports = router;
