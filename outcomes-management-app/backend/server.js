const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const outcomeRoutes = require('./routes/outcomes'); // Import the outcomes route
const measurementRoutes = require('./routes/measurements');

const app = express();

app.use(cors({
  origin: 'http://outcom-publi-uqnbiso8jfxw-211120991.us-east-1.elb.amazonaws.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

app.use('/outcomes', outcomeRoutes); // Use the outcomes route
app.use('/measurements', measurementRoutes);

app.listen(8080, () => {
  console.log('Backend server running on port 8080');
});