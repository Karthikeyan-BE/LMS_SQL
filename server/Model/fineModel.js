module.exports = (sequelize, DataTypes) => {
    const Fine = sequelize.define("Fine", {
      fineId: {
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
      fineAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      fineReason: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: "Fines",
      timestamps: false
    });
  
    Fine.associate = (models) => {
      Fine.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Fine.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
    };
  
    return Fine;
  };
  