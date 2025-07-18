const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const Member = require('./member');

const Borrowing = sequelize.define('Borrowing', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    book_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Member,
            key: 'id'
        }
    },
    borrow_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    return_date: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'BORROWED'
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
    tableName: 'borrowings',
    timestamps: false,
    indexes: [
        { fields: ['book_id'] },
        { fields: ['member_id'] }
    ]
});

module.exports = Borrowing;
