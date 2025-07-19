const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/', bookController.create);
router.get('/', bookController.findPagination);

module.exports = router;
