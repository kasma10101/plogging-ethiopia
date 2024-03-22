const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');
const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    description: {
        type: DataTypes.TEXT, 
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    }
}, {
    
});

module.exports = Blog;
