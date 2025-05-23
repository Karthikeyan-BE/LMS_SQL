const express = require("express");
const router = express.Router();
const reservationController = require("../Controller/reservationController");

router.post("/", reservationController.createReservation);
router.get("/", reservationController.getAllReservations);
router.get("/user/:userId", reservationController.getReservationsByUser);
router.get("/book/:bookId", reservationController.getReservationsByBook);
router.put("/:reservationId", reservationController.updateReservationStatus);
router.delete("/:reservationId", reservationController.deleteReservation);
// router.delete("/reservations/:reservationId", reservationController.deleteReservation);

module.exports = router;
