const express = require('express');
const router = express.Router();
const { addBook, getBook, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
// const { authMiddleware } = require('../middlewares/authMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/books', authMiddleware, addBook); // ✅ Add book
router.get('/books', getBook);                 // ✅ Get all books
router.get('/books/:id', getBookById);          // ✅ Get book by ID
router.put('/books/:id', authMiddleware, updateBook); // ✅ Update book
router.delete('/books/:id', authMiddleware, deleteBook); // ✅ Delete book

module.exports = router;
