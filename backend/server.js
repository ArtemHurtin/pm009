const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bestbooks-cafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/events', require('./routes/events'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/contacts', require('./routes/contacts'));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Best Books Cafe API',
    version: '1.0.0',
    endpoints: {
      menu: '/api/menu',
      bookings: '/api/bookings',
      events: '/api/events',
      reviews: '/api/reviews',
      contacts: '/api/contacts'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Best Books Cafe API is ready!`);
  console.log(`🔗 http://localhost:${PORT}`);
});