const express = require('express');
const router = express.Router();

// Define routes for managing measurements
router.get('/', (req, res) => {
  res.send('Get all measurements');
});

router.post('/', (req, res) => {
  res.send('Create a measurement');
});

module.exports = router;
