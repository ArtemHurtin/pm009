const express = require('express');
const router = express.Router();

// Mock данные для бронирований
let bookings = [];

// GET /api/bookings - получить все бронирования
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: bookings
  });
});

// POST /api/bookings - создать новое бронирование
router.post('/', (req, res) => {
  const { name, email, phone, date, time, guests, notes } = req.body;
  
  const newBooking = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    date,
    time,
    guests,
    notes,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  
  res.json({
    success: true,
    message: 'Бронирование создано успешно!',
    data: newBooking
  });
});

// DELETE /api/bookings/:id - отменить бронирование
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  bookings = bookings.filter(booking => booking.id !== id);
  
  res.json({
    success: true,
    message: 'Бронирование отменено'
  });
});

module.exports = router;