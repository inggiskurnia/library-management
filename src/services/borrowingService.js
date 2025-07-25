const {Borrowing, Book, Member} = require('../models');

const createBorrowing = async (data) => {
    const {bookId, memberId} = data;

    if (!bookId || !memberId) {
        throw new Error('All fields (bookId, memberId) are required.');
    }

    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Book not found.');
    if (book.stock <= 0) throw new Error('Book is out of stock.');

    const member = await Member.findByPk(memberId);
    if (!member) throw new Error('Member not found.');

    const activeBorrowings = await Borrowing.count({
        where: { member_id : memberId, return_date: null },
    });

    if (activeBorrowings >= 3) {
        throw new Error('Member has reached maximum active borrowings (3).');
    }

    const t = await Borrowing.sequelize.transaction();

    try {
        await book.update({ stock: book.stock - 1 }, { transaction: t });

        const borrowing = await Borrowing.create(
            {
                book_id : bookId,
                member_id : memberId,
                borrow_date: new Date(),
            },
            { transaction: t }
        );

        await t.commit();
        return borrowing;
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

const returnBook = async (borrowingId) => {
    const borrowing = await Borrowing.findByPk(borrowingId);

    if (!borrowing) {
        throw new Error('Borrowing record not found.');
    }

    if (borrowing.return_date) {
        throw new Error('Book has already been returned.');
    }

    const book = await Book.findByPk(borrowing.book_id);
    if (!book) {
        throw new Error('Book not found.');
    }

    const t = await Borrowing.sequelize.transaction();

    try {
        await borrowing.update(
            {
                return_date: new Date(),
                status: 'RETURNED',
            },
            { transaction: t }
        );

        await book.update(
            { stock: book.stock + 1 },
            { transaction: t }
        );

        await t.commit();
        return borrowing;
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

module.exports = {
    createBorrowing,
    returnBook,
}