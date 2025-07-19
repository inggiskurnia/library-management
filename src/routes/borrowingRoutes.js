const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');

router.post('/', borrowingController.createBorrowing);

module.exports = router;