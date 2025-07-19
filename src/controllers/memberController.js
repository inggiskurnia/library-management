const memberService = require('../services/memberService');

exports.createMember = async (req, res) => {
    try {
        const result = await memberService.createMember(req.body);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}