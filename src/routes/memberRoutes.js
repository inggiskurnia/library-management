const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.post('/', memberController.createMember);
router.get('/:id/borrowings', memberController.getBorrowingHistory);

module.exports = router;