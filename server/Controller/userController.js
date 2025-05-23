const { User } = require("../Model");

// ✅ Create a new User with validation
const createUser = async (req, res) => {
  const { name, email, number, address } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing name" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid or missing email" });
  }
  if (!number || typeof number !== "string" || number.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing phone number" });
  }

  try {
    const user = await User.create({ name, email, number, address });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all Users
const allUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ✅ Get a single User with validation
const singleUser = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// ✅ Update a User with validation
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, number, address, balance } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      updatedData.email = email;
    }
    if (number) updatedData.number = number;
    if (address) updatedData.address = address;
    if (balance !== undefined) {
      if (typeof balance !== "number" || balance < 0) {
        return res.status(400).json({ error: "Invalid balance" });
      }
      updatedData.balance = balance;
    }

    await user.update(updatedData);

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// ✅ Delete a User with validation
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = { createUser, allUsers, singleUser, updateUser, deleteUser };
