const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.post('/', memberController.createMember)

module.exports = router;