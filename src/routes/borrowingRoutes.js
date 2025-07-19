const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');

router.post('/', borrowingController.createBorrowing);
router.put('/return/:id', borrowingController.returnBorrowing);


module.exports = router;