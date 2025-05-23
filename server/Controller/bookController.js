const { Book } = require("../Model");
const { Op } = require("sequelize");

// ✅ Show All Books
const showBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ message: "Books retrieved successfully", books });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books", details: error.message });
  }
};

// ✅ Get a Single Book by ID
const getSingleBook = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid or missing book ID" });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book retrieved successfully", book });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book", details: error.message });
  }
};

// ✅ Add a Book
const addBook = async (req, res) => {
  const { bookName, bookAuthor, availability = true } = req.body;

  // Validate input
  if (!bookName || typeof bookName !== "string" || bookName.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing bookName" });
  }
  if (!bookAuthor || typeof bookAuthor !== "string" || bookAuthor.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing bookAuthor" });
  }
  if (typeof availability !== "boolean") {
    return res.status(400).json({ error: "Availability must be true or false" });
  }

  try {
    const newBook = await Book.create({ bookName: bookName.trim(), bookAuthor: bookAuthor.trim(), availability });
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book", details: error.message });
  }
};

// ✅ Update a Book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { bookName, bookAuthor, availability } = req.body;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid or missing book ID" });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const updatedData = {};
    if (bookName && typeof bookName === "string") updatedData.bookName = bookName.trim();
    if (bookAuthor && typeof bookAuthor === "string") updatedData.bookAuthor = bookAuthor.trim();
    if (availability !== undefined) {
      if (typeof availability !== "boolean") {
        return res.status(400).json({ error: "Availability must be true or false" });
      }
      updatedData.availability = availability;
    }

    await book.update(updatedData);
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book", details: error.message });
  }
};

// ✅ Delete a Book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid or missing book ID" });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book", details: error.message });
  }
};

// Search Book
const searchBooks = async (req, res) => {
  try {
      const { query } = req.body; // Extract search query from JSON body

      if (!query) {
          return res.status(400).json({ error: "Search query is required" });
      }
      const whereCondition = {
          availability: true, // ✅ Only show available books
          [Op.or]: [
              { bookId: !isNaN(query) ? query : null }, // ✅ Search by bookId if it's a number
              { bookName: { [Op.like]: `%${query}%` } }, // ✅ Search by bookName
              { bookAuthor: { [Op.like]: `%${query}%` } } // ✅ Search by bookAuthor
          ]
      };

      const books = await Book.findAll({
          where: whereCondition,
          attributes: ["bookId", "bookName", "bookAuthor", "availability"]
      });

      res.json({ results: books });

  } catch (error) {
      console.error("Error in searchBooks:", error);
      res.status(500).json({ error: "Failed to search books" });
  }
};


module.exports = {
  showBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
  searchBooks
};
