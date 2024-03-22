const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const Gallery = sequelize.define('Gallery', {
    imageUrl: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = Gallery;
