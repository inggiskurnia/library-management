const bookService = require('../services/bookService');

exports.create = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.findPagination = async (req, res) => {
    try {
        const result = await bookService.getPaginatedBooks(req.query);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
