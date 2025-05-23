module.exports = (sequelize, DataTypes) => {
    const BookBorrowing = sequelize.define("BookBorrowing", {
      borrowId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM("Borrowed", "Returned"),
        defaultValue: "Borrowed"
      }
    }, {
      tableName: "BookBorrowings",
      timestamps: false
    });
  
    BookBorrowing.associate = (models) => {
      BookBorrowing.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      BookBorrowing.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
    };
  
    return BookBorrowing;
  };
  