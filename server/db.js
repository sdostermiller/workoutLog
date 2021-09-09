const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:a248178e72b84764a6450f1ee42bf8d9@localhost:5432/workoutLog");

module.exports = sequelize;
