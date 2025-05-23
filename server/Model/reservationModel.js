module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define("Reservation", {
      reservationId: {
        type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reservationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      borrowDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM("Reserved", "Borrowed", "Cancelled", "Completed"),
        defaultValue: "Reserved"
      }
    }, {
      tableName: "Reservations",
      timestamps: false
    });
  
    Reservation.associate = (models) => {
      Reservation.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Reservation.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
    };
  
    return Reservation;
  };
  