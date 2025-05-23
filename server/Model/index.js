const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../Database/dbConnect");

const BookModel = require("./bookModel");
const UserModel = require("./userModel");
const BorrowModel = require("./borrowModel");
const FineModel = require("./fineModel");
const ReservationModel = require("./reservationModel"); // ✅ New

const Book = BookModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const BookBorrowing = BorrowModel(sequelize, DataTypes);
const Fine = FineModel(sequelize, DataTypes);
const Reservation = ReservationModel(sequelize, DataTypes); // ✅ New

const db = { sequelize, Book, User, BookBorrowing, Fine, Reservation };

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced successfully!"))
  .catch((err) => console.error("❌ Error syncing database:", err));

sequelize.authenticate()
  .then(() => console.log("✅ Successfully connected to the database."))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = db;
