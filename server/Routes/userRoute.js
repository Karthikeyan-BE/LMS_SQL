const express = require('express');
const { createUser, allUsers, singleUser, updateUser, deleteUser } = require('../Controller/userController');


const router = express.Router();

router.post("/add", createUser);
router.get("/all", allUsers);
router.get("/:id", singleUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;