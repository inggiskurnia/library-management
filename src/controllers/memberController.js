const memberService = require('../services/memberService');

exports.createMember = async (req, res) => {
    try {
        const result = await memberService.createMember(req.body);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getBorrowingHistory = async (req, res) => {
    try {
        const { status, page, limit } = req.query;
        const result = await memberService.getMemberBorrowings(req.params.id, { status, page, limit });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};