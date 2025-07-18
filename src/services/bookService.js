const { Book } = require('../models');

const createBook = async (data) => {
    return Book.create(data);
};

const getAllBooks = async () => {
    return await Book.findAll();
};

const getBookById = async (id) => {
    return await Book.findByPk(id);
};

const updateBook = async (id, data) => {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');
    return await book.update(data);
};

const deleteBook = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');
    return await book.destroy();
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
