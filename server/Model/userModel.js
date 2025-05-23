module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalFine: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    borrowedBooks: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    tableName: "Users",
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.BookBorrowing, { foreignKey: "userId", as: "borrowings" });
    User.hasMany(models.Fine, { foreignKey: "userId", as: "fines" });
    User.hasMany(models.Reservation, { foreignKey: "userId", as: "reservations" });
  };

  return User;
};
