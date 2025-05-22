const Book = require('../models/Book');
const { ObjectId } = require("mongodb");
const client = require('../utils/db');


exports.addBook = async (req, res) => {
  console.log("📥 Adding book route hit");
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
  console.log("📥 get book route hit");

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
  console.log("📥 get book by id route hit");

  const id = req.params.id;
  try {
    const booksbyId = await Book.db("book-Review").collection("books").find({ _id: ObjectId(id) }).toArray();
    if (!booksbyId) return res.status(404).json({ message: "Book not found" });
    res.json(booksbyId);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.updateBook = async (req, res) => {
  const documentId = req.params.id;
  console.log('id : ', documentId)
  const updateDocument = {
    $set: {
      title: req.params.title,
      author: req.params.author,
      genre: req.params.genre,
    },
  };

  try {
    const booksUpdatebyId = await Book.db("book-Review").collection("books").findOneAndUpdate({ _id: documentId }, updateDocument).toArray();
    if (!booksUpdatebyId) return res.status(404).json({ message: "Book not found" });
    res.json(booksUpdatebyId);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.deleteBook = async (req, res) => {
  try {
    const result = await Book.db("book-Review").collection("books").deleteOne({ _id: ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}