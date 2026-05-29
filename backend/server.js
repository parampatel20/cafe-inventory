const crypto = require('crypto');
global.crypto = crypto;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'https://cafe-inventory-omega.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));

// Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/inventory',  require('./routes/inventory'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/bills',      require('./routes/bills'));
app.use('/api/staff',      require('./routes/staff'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
