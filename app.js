const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = Number(process.env.PORT|| 3000);
require('dotenv/config');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

// Import Routes
const metricsRoute = require('./routes/metrics');
app.use('/metrics', metricsRoute)

app.get('/', (req, res) => {
    res.send('we are on home')
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
  () => {
    console.log('Connected to DB!');
    console.log(mongoose.connection.readyState)
});

app.listen(3000);