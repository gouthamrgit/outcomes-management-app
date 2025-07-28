const express = require('express');
const bodyParser = require('body-parser');
const outcomeRoutes = require('./routes/outcomes');
const measurementRoutes = require('./routes/measurements');

const app = express();
app.use(bodyParser.json());

app.use('/outcomes', outcomeRoutes);
app.use('/measurements', measurementRoutes);

app.listen(8080, () => {
  console.log('Backend server running on port 8080');
});
