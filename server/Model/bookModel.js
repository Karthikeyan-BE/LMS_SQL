module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookAuthor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    borrowedByUsers: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    tableName: "Books",
    timestamps: false
  });

  Book.associate = (models) => {
    Book.hasMany(models.BookBorrowing, { foreignKey: "bookId", as: "borrowings" });
    Book.hasMany(models.Reservation, { foreignKey: "bookId", as: "reservations" });
    Book.hasMany(models.Fine, { foreignKey: "bookId", as: "fines" });
  };

  return Book;
};
