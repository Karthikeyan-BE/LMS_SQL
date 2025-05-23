const express = require("express");
const router = express.Router();
const { addFine, deleteFine, updateFine, getAllFines, payFine } = require("../Controller/fineController");


router.post("/add-fine", addFine);
router.delete("/delete-fine/:id", deleteFine);
router.put("/update-fine/:id", updateFine);
router.get("/fines", getAllFines);
router.post("/pay-fine/:id", payFine);

module.exports = router;
  