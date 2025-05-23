const { Reservation, Book, User } = require("../Model");

// Create a new reservation

exports.createReservation = async (req, res) => {
  try {
    const { userId, bookId, borrowDate, returnDate } = req.body;

    // Validate input
    if (!userId || !bookId || !borrowDate || !returnDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if book exists
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found." });

    // Check availability
    if (!book.availability) {
      return res.status(400).json({ message: "Book is currently unavailable." });
    }

    // Create reservation
    const reservation = await Reservation.create({
      userId,
      bookId,
      borrowDate,
      returnDate,
      reservationDate: new Date(),
      status: "Reserved"
    });

    // Optionally mark book as unavailable
    book.availability = false;
    await book.save();

    return res.status(201).json({
      message: "Reservation created successfully.",
      reservation
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: Book, as: "book" },
        { model: User, as: "user" }
      ]
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get reservations by user
exports.getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Reservation.findAll({
      where: { userId },
      include: [{ model: Book, as: "book" }]
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get reservations by book
exports.getReservationsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reservations = await Reservation.findAll({
      where: { bookId },
      include: [{ model: User, as: "user" }]
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching book reservations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update reservation status (e.g., to "Borrowed", "Completed", "Cancelled")
exports.updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status, borrowDate, returnDate } = req.body;

    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    reservation.status = status || reservation.status;
    reservation.borrowDate = borrowDate || reservation.borrowDate;
    reservation.returnDate = returnDate || reservation.returnDate;

    await reservation.save();

    // If borrowed, update book availability
    if (status === "Borrowed") {
      const book = await Book.findByPk(reservation.bookId);
      book.availability = false;
      await book.save();
    }

    // If completed or cancelled, update book availability
    if (status === "Completed" || status === "Cancelled") {
      const book = await Book.findByPk(reservation.bookId);
      book.availability = true;
      await book.save();
    }

    res.status(200).json({ message: "Reservation updated", reservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Cancel a reservation
exports.cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    reservation.status = "Cancelled";
    await reservation.save();

    const book = await Book.findByPk(reservation.bookId);
    book.availability = true;
    await book.save();

    res.status(200).json({ message: "Reservation cancelled", reservation });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    // Find the reservation by ID
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Optionally update the book's availability if the reservation is active
    const book = await Book.findByPk(reservation.bookId);
    if (book && reservation.status !== "Completed" && reservation.status !== "Cancelled") {
      book.availability = true;
      await book.save();
    }

    // Delete the reservation
    await reservation.destroy();

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

