const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

// Middleware to parse JSON bodies
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Set up DynamoDB with proper configuration
AWS.config.update({ 
  region: process.env.AWS_REGION || 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

console.log('DynamoDB Configuration:', {
  region: process.env.AWS_REGION,
  tableName: TABLE_NAME
});

// POST: Add a new outcome
router.post('/', async (req, res) => {
  console.log('POST /api/outcomes - Request body:', req.body);
  console.log('Environment variables:', {
    TABLE_NAME: process.env.DYNAMODB_TABLE_NAME,
    AWS_REGION: process.env.AWS_REGION
  });

  const { title, description } = req.body;

  // Validate input
  if (!title || !description) {
    console.log('Validation failed: missing title or description');
    return res.status(400).json({ error: 'Title and description are required' });
  }

  // Validate table name is set
  if (!TABLE_NAME) {
    console.error('DYNAMODB_TABLE_NAME environment variable is not set');
    return res.status(500).json({ error: 'Database configuration error' });
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

  console.log('DynamoDB put params:', params);

  try {
    await dynamodb.put(params).promise();
    console.log('Outcome added successfully:', outcome);
    res.status(201).json({
      message: 'Outcome added successfully',
      outcome
    });
  } catch (error) {
    console.error('DynamoDB PUT error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      retryable: error.retryable
    });
    res.status(500).json({ 
      error: 'Failed to add outcome', 
      details: error.message 
    });
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