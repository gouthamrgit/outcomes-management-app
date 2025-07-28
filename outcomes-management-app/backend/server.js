const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const outcomeRoutes = require('./routes/outcomes');
const measurementRoutes = require('./routes/measurements');

const app = express();

// Load environment variables (for safety logging)
const PORT = process.env.PORT || 8080;
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;
const REGION = process.env.AWS_REGION;

console.log(`Starting backend on port ${PORT}`);
console.log(`DynamoDB Table: ${TABLE_NAME}`);
console.log(`AWS Region: ${REGION}`);

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      origin.includes('amazonaws.com') ||
      origin.includes('elb.amazonaws.com') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('.locals') ||
      origin.includes('.local')
    ) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Body parser middleware
app.use(bodyParser.json());

// Root endpoint for ALB health checks
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Backend API', timestamp: new Date().toISOString() });
});

// General API info
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Outcomes Management API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      outcomes: '/api/outcomes',
      measurements: '/api/measurements'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/outcomes', outcomeRoutes);
app.use('/api/measurements', measurementRoutes);

// Optional: global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
