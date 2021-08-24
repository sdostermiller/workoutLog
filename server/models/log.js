const { DataTypes } = require("sequelize");
const db = require("../db");

const WorkoutLog = db.define("workoutLog", {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = WorkoutLog;