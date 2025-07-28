const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

// Middleware to parse JSON bodies
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Set up DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

// POST: Add a new outcome
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  // Validate input
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const outcome = {
    OutcomeID: Date.now().toString(),  // Unique ID
    Title: title,
    Description: description
  };

  const params = {
    TableName: TABLE_NAME,
    Item: outcome
  };

  try {
    await dynamodb.put(params).promise();
    console.log('Outcome added:', outcome);
    res.status(201).json({
      message: 'Outcome added successfully',
      outcome
    });
  } catch (error) {
    console.error('DynamoDB PUT error:', error);
    res.status(500).json({ error: 'Failed to add outcome' });
  }
});

// GET: Fetch all outcomes
router.get('/', async (req, res) => {
  const params = {
    TableName: TABLE_NAME
  };

  try {
    const data = await dynamodb.scan(params).promise();
    console.log('Fetched outcomes:', data.Items);
    res.status(200).json(data.Items || []);
  } catch (error) {
    console.error('DynamoDB SCAN error:', error);
    res.status(500).json({ error: 'Failed to fetch outcomes' });
  }
});

module.exports = router;
