const Book = require('../models/Book');
const { ObjectId } = require("mongodb");
const client = require('../utils/db');


exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      createdBy: req.user,
      createdAt: new Date().toISOString()
    });
    await newBook.save();
    res.status(200).json({ message: 'Book added successfully', book: newBook });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

}



exports.getBook = async (req, res) => {

  try {
    const { page = 1, limit = 5, author, genre } = req.query;

    const query = {};
    if (author) query.author = new RegExp(author, 'i'); // case-insensitive
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: books,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err });
  }
};


exports.getBookById = async (req, res) => {

  const id = req.params.id;
  try {
    const booksbyId = await Book.findById(id);
    if (!booksbyId) return res.status(404).json({ message: "Book not found" });
    res.json(booksbyId);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.updateBook = async (req, res) => {
  const documentId = req.params.id;
  const { title, author, genre } = req.body;

  try {

    const booksUpdatebyId = await Book.findByIdAndUpdate(
      documentId,
      { title, author, genre },
      { new: true } // return the updated document
    );
    if (!booksUpdatebyId) return res.status(404).json({ message: "Book not found" });
    res.json(booksUpdatebyId);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  try {

    const result = await Book.findByIdAndDelete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}