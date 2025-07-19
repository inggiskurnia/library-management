const {Op} = require("sequelize");
const { Book } = require('../models');

const createBook = async (data) => {
    return Book.create(data);
};

const getPaginatedBooks = async (req) => {
    let {page = '1', limit = '10', title, author} = req;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (page - 1) * limit;

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
