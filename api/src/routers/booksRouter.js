const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.get('/books', booksController.list)
router.get('/books/:id', booksController.detail)
router.post('/books', booksController.create)

module.exports = router