const {Op} = require("sequelize");
const { Book } = require('../models');

const createBook = async (data) => {
    const { title, author, publishedYear } = data;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Title is required and must be a non-empty string.');
    }

    if (!author || typeof author !== 'string' || author.trim() === '') {
        throw new Error('Author is required and must be a non-empty string.');
    }

    if (publishedYear && isNaN(publishedYear)) {
        throw new Error('Published year must be a number if provided.');
    }

    return await Book.create({
        title: title.trim(),
        author: author.trim(),
        publishedYear,
    });
};

const getPaginatedBooks = async (req) => {
    const {
        page = '1',
        limit = '10',
        title,
        author
    } = req || {};

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    const whereClause = {};

    if (title) {
        whereClause.title = {[Op.like]: `%${title}%`};
    }
    if (author) {
        whereClause.author = {[Op.like]: `%${author}%`};
    }

    const {count, rows} = await Book.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        oder:[['created_at', 'DESC']]
    })

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limitNum),
        currentPage: pageNum,
        items: rows,
    };
}

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
    getPaginatedBooks,
    getBookById,
    updateBook,
    deleteBook,
};
