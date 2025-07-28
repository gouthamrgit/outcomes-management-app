const express = require('express');
const router = express.Router();

// Define routes for managing outcomes
router.get('/', (req, res) => {
  res.send('Get all outcomes');
});

router.post('/', (req, res) => {
  res.send('Create an outcome');
});

module.exports = router;
