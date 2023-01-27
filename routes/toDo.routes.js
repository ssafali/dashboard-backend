const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../models/ToDo.model");

// Get all todos
router.get('/todos/:_id', async (req, res) => {
    const _id = req.params._id
    const todos = await Todo.find({user: _id});
    res.json(todos);
})

// Add a new todo
router.post('/todos/new', (req, res, next) => {
    const {content, user} = req.body;
    Todo
    .create({content, user: mongoose.Types.ObjectId(user)})
    .then((data) => {
        console.log("Added successfully!")
        res.status(201).json(data);
    })
    .catch((err) => console.log('Error', err));
})

// Edit completed
router.post('/todos/edit', (req, res, next) => {
    const {id , completed} = req.body
    Todo.findByIdAndUpdate(id, {completed}, {new:true} )
        .then((changedTodo) => res.json(changedTodo))
        .catch((err) => console.log(err));
    })

// Delete a to do
router.delete('/todos/delete/:id', (req, res, next) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: "Specified id is not valid"})
    }
    Todo.findByIdAndDelete(id)
        .then(() => res.json({message: `Todo with ${id} has been removed successfully`}))
        .catch((err) => console.log(err));
    })


    // router.post("/search-results", (req, res, next) => {
    //     const search = req.body.search;
    //     console.log(search)
    //     let matchingProducts = [];
    //     Product.find({})
    //     .then((productsFromDB) => {
    //       console.log(productsFromDB)
    //       //const newArray = productsFromDB.filter(element => element.title.includes(searchKey))
    //       for(let data of productsFromDB) {
    //         if(data.title.toLowerCase().search(search.toLowerCase()) != -1) {
    //           matchingProducts.push(data);
    //         }
    //       }
    //       res.render('products/search-results.hbs', {products: matchingProducts, search})
    //     })
    //   })
module.exports = router;