const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const UserUploadedData = sequelize.define('UserUploadedData', {
    name: {
        type: DataTypes.STRING
    },
    fileName: {
        type: DataTypes.STRING
    },
    fileType: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = UserUploadedData;
