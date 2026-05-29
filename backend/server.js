const crypto = require('crypto');
global.crypto = crypto;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
  origin: function(origin, callback) {
    const allowed = [
      'https://cafe-inventory-omega.vercel.app',
      'http://localhost:3000'
    ];
    if (!origin || allowed.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    app.listen(process.env.PORT || 5001, () =>
      console.log('Server running on port ' + (process.env.PORT || 5001))
    );
  })
  .catch(err => console.error(err));
