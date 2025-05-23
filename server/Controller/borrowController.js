const { Book, User, BookBorrowing, Fine } = require("../Model");
const { Op } = require("sequelize");

// ✅ Borrow a Book
const borrowBook = async (req, res) => {
    try {
        const { userId, bookId, returnDate } = req.body;

        // ✅ Validate Input
        if (!userId || isNaN(Number(userId))) return res.status(400).json({ error: "Invalid or missing userId" });
        if (!bookId || isNaN(Number(bookId))) return res.status(400).json({ error: "Invalid or missing bookId" });
        if (!returnDate) return res.status(400).json({ error: "Missing returnDate" });

        // ✅ Validate Return Date
        const dueDate = new Date(returnDate);
        if (isNaN(dueDate.getTime())) return res.status(400).json({ error: "Invalid returnDate format. Use YYYY-MM-DD." });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (dueDate <= today) return res.status(400).json({ error: "Return date must be in the future." });

        // ✅ Check if Book Exists and is Available
        const book = await Book.findOne({ where: { bookId, availability: true } });
        if (!book) return res.status(400).json({ error: "Book is not available or does not exist" });

        // ✅ Check if User Exists
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // ✅ Ensure `borrowedBooks` is a valid JSON array
        let borrowedBooks = [];
        try {
            borrowedBooks = user.borrowedBooks ? JSON.parse(user.borrowedBooks) : [];
        } catch (error) {
            borrowedBooks = [];
        }

        borrowedBooks.push({ bookId, bookName: book.bookName, returnDate });
        await user.update({ borrowedBooks: JSON.stringify(borrowedBooks) });

        // ✅ Ensure `borrowedByUsers` is a valid JSON array
        let borrowedByUsers = [];
        try {
            borrowedByUsers = book.borrowedByUsers ? JSON.parse(book.borrowedByUsers) : [];
        } catch (error) {
            borrowedByUsers = [];
        }

        borrowedByUsers.push({ userId, userName: user.name });
        await book.update({ borrowedByUsers: JSON.stringify(borrowedByUsers) });

        // ✅ Create Borrowing Record
        await BookBorrowing.create({ userId, bookId, borrowDate: new Date(), dueDate, status: "Borrowed" });

        // ✅ Mark Book as Unavailable
        await book.update({ availability: false });

        res.status(201).json({ message: "Book borrowed successfully", borrowedBooks, borrowedByUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to borrow book" });
    }
};

// ✅ Return a Book with Fine Calculation
const returnBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) {
            return res.status(400).json({ error: "Missing userId or bookId in request body" });
        }

        const borrowRecord = await BookBorrowing.findOne({ where: { userId, bookId, status: "Borrowed" } });

        if (!borrowRecord) {
            return res.status(404).json({ error: "Borrow record not found or already returned" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Ensure time is ignored
        const dueDate = new Date(borrowRecord.dueDate);
        dueDate.setHours(0, 0, 0, 0); // Ignore time part

        let fineAmount = 0;
        const finePerDay = 10;

        if (today > dueDate) { // ✅ Fine only if returned AFTER due date
            const overdueDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            fineAmount = overdueDays * finePerDay;

            await Fine.create({
                userId,
                bookId,
                fineAmount,
                fineReason: `Overdue by ${overdueDays} days`
            });

            const user = await User.findByPk(userId);
            await user.update({ totalFine: (user.totalFine || 0) + fineAmount });
        }

        await borrowRecord.update({ status: "Returned", returnDate: today });

        const book = await Book.findByPk(bookId);
        await book.update({ availability: true });

        const user = await User.findByPk(userId);

        let borrowedBooks = Array.isArray(user.borrowedBooks) ? user.borrowedBooks : [];
        borrowedBooks = borrowedBooks.filter(entry => entry.bookId !== bookId);
        await user.update({ borrowedBooks });

        let borrowedByUsers = Array.isArray(book.borrowedByUsers) ? book.borrowedByUsers : [];
        borrowedByUsers = borrowedByUsers.filter(entry => entry.userId !== userId);
        await book.update({ borrowedByUsers });

        res.json({
            message: "Book returned successfully",
            returnDate: today,
            fineAmount,
            borrowedBooks,
            borrowedByUsers
        });

    } catch (error) {
        console.error("Error in returnBook:", error);
        res.status(500).json({ error: "Failed to return book" });
    }
};

// ✅ Show All Borrowed Books
const showBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await BookBorrowing.findAll({
            where: { status: "Borrowed" },
            include: [
                { model: Book, as: "book", attributes: ["bookId", "bookName", "bookAuthor"] },
                { model: User, as: "user", attributes: ["userId", "name", "email"] }
            ]
        });
        res.json(borrowedBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch borrowed books" });
    }
};

// ✅ Show All Unreturned Books (Overdue)
const showUnreturnedBooks = async (req, res) => {
    try {
        const unreturnedBooks = await BookBorrowing.findAll({
            where: {
                status: "Borrowed",
                dueDate: { [Op.lt]: new Date() }
            },
            include: [
                { model: Book, as: "book", attributes: ["bookId", "bookName", "bookAuthor"] },
                { model: User, as: "user", attributes: ["userId", "name", "email"] }
            ]
        });
        res.json(unreturnedBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch unreturned books" });
    }
};

module.exports = { borrowBook, returnBook, showBorrowedBooks, showUnreturnedBooks };
  