const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const AdminEvent = sequelize.define('AdminEvent', {
    name: {
        type: DataTypes.STRING,
        allowNull: true, // Adjust according to your database design
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: true, // Consider using DataTypes.DATE for actual dates if applicable
    },
    place: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    // Sequelize model options (if any)
});

module.exports = AdminEvent;
