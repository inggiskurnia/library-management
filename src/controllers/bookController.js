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

exports.findOne = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const book = await bookService.updateBook(req.params.id, req.body);
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await bookService.deleteBook(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
