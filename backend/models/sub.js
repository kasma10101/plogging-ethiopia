const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const Sub = sequelize.define('Sub', {
    email: {
        type: DataTypes.STRING
    }
});

module.exports = Sub;
