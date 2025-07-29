const AWS = require('aws-sdk');

// Configure AWS SDK to use environment variables and ECS task role
AWS.config.update({ 
  region: process.env.AWS_REGION || 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;