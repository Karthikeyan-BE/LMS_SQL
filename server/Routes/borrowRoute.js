const express = require("express");
const { borrowBook, returnBook, showBorrowedBooks, showUnreturnedBooks } = require("../Controller/borrowController");

const router = express.Router();

router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.get("/borrowed-books", showBorrowedBooks);
router.get("/overdue-books", showUnreturnedBooks);  // Fetch overdue books

module.exports = router;
