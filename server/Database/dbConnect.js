const { Sequelize } = require("sequelize");
const env = require("dotenv");

env.config();

const sequelize = new Sequelize(
  process.env.SQL_DATABASENAME,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD, // Fix typo: 'SQL_Password' → 'SQL_PASSWORD'
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Set true to debug SQL queries
  }
);
console.log("process.env.SQL_DATABASENAME");
// Test the connection
const connectDB = async () => {
  console.log(process.env.SQL_PASSWORD);
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB }; // Export both
