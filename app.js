const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || '0.0.0.0';
require('dotenv/config');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

// Import Routes
const metricsRoute = require('./routes/metrics');
app.use('/metrics', metricsRoute)

app.use(express.static(path.join(__dirname, './perfanalytics-dashboard/build')));
['/dashboard', '/dashboard/*'].forEach(p => {
  app.get(p, (req, res) => {
    res.sendFile(path.resolve(__dirname, './perfanalytics-dashboard', 'build', 'index.html'));
  });
});
app.get('/perfanalytics.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, './perfanalytics-js', 'bundle.js'));
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
  () => {
    console.log('Connected to DB!');
    console.log(mongoose.connection.readyState)
});

app.listen(port);