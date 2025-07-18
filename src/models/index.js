const sequelize = require('../config/database');

const Book = require('./book');
const Member = require('./member');
const Borrowing = require('./borrowing');

Book.hasMany(Borrowing, { foreignKey: 'book_id' });
Borrowing.belongsTo(Book, { foreignKey: 'book_id' });

Member.hasMany(Borrowing, { foreignKey: 'member_id' });
Borrowing.belongsTo(Member, { foreignKey: 'member_id' });

module.exports = {
    sequelize,
    Book,
    Member,
    Borrowing
};
