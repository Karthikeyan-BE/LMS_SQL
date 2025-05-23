const { Fine, User, Book } = require("../Model");

// ✅ Add a new fine manually
const addFine = async (req, res) => {
    try {
        const { userId, bookId, fineAmount, fineReason } = req.body;

        if (!userId || !bookId || !fineAmount || !fineReason) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const fine = await Fine.create({ userId, bookId, fineAmount, fineReason });

        // Update User's Total Fine
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ totalFine: user.totalFine + fineAmount });
        }

        res.status(201).json({ message: "Fine added successfully", fine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add fine" });
    }
};

// ✅ Delete a fine
const deleteFine = async (req, res) => {
    try {
        const { id } = req.params;
        const fine = await Fine.findByPk(id);
        if (!fine) return res.status(404).json({ error: "Fine not found" });

        // Update User's Total Fine
        const user = await User.findByPk(fine.userId);
        if (user) {
            await user.update({ totalFine: user.totalFine - fine.fineAmount });
        }

        await fine.destroy();
        res.json({ message: "Fine deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete fine" });
    }
};

// ✅ Update a fine
const updateFine = async (req, res) => {
    try {
        const { id } = req.params;
        const { fineAmount, fineReason, isPaid } = req.body;

        const fine = await Fine.findByPk(id);
        if (!fine) return res.status(404).json({ error: "Fine not found" });

        const updatedData = {};
        if (fineAmount !== undefined) updatedData.fineAmount = fineAmount;
        if (fineReason) updatedData.fineReason = fineReason;
        if (isPaid !== undefined) updatedData.isPaid = isPaid;

        await fine.update(updatedData);
        res.json({ message: "Fine updated successfully", fine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update fine" });
    }
};

// ✅ Get all fines
const getAllFines = async (req, res) => {
    try {
        const fines = await Fine.findAll({
            include: [
                { model: User, as: "user", attributes: ["userId", "name", "email"] }, // FIX: Use userId
                { model: Book, as: "book", attributes: ["bookId", "bookName"] }
            ]
        });

        res.json(fines);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch fines" });
    }
};


// ✅ Pay a fine
const payFine = async (req, res) => {
    try {
        const { id } = req.params;

        const fine = await Fine.findByPk(id);
        if (!fine) return res.status(404).json({ error: "Fine not found" });

        if (fine.isPaid) return res.status(400).json({ error: "Fine is already paid" });

        await fine.update({ isPaid: true });

        // Update User's Total Fine
        const user = await User.findByPk(fine.userId);
        if (user) {
            await user.update({ totalFine: user.totalFine - fine.fineAmount });
        }

        res.json({ message: "Fine paid successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to pay fine" });
    }
};

module.exports = { addFine, deleteFine, updateFine, getAllFines, payFine };
