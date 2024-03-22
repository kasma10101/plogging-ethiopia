require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequilize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging:false, // Toggle logging if needed
});

module.exports = sequilize;
