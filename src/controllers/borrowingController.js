const borrowingService = require("../services/borrowingService");

exports.createBorrowing = async (req, res) => {
    try {
        const result = await borrowingService.createBorrowing(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

