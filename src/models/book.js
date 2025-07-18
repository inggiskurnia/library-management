const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    published_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'books',
    timestamps: false,
    indexes: [
        { fields: ['title'] },
        { fields: ['author'] },
        { unique: true, fields: ['isbn'] }
    ]
});

module.exports = Book;
