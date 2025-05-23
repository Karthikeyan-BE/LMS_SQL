const express = require('express');
const { showBooks, updateBook, deleteBook, addBook, getSingleBook } = require('../Controller/bookController');

const Router = express.Router();

Router.get('/all',showBooks)
Router.get("/books/:id", getSingleBook)
Router.post('/create',addBook)
Router.patch('/update/:id',updateBook)
Router.delete('/delete/:id',deleteBook)

module.exports = Router;