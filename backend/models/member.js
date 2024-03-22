const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const Member = sequelize.define('Member', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    }
});

module.exports = Member;
