const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const { readdirSync } = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map(route =>
  app.use('/api/v1', require('./routes/' + route))
);

// Serve frontend build files
app.use(express.static(path.join(__dirname, 'build')));

// Serve React app for any other route
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
