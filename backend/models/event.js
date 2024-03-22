const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const Event = sequelize.define('Event', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    who: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },
    agreement: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.STRING
    }
});

module.exports = Event;
