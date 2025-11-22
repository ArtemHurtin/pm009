const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Имя клиента обязательно'],
    trim: true,
    maxlength: [100, 'Имя не может быть длиннее 100 символов']
  },
  phone: {
    type: String,
    required: [true, 'Телефон обязателен'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  date: {
    type: Date,
    required: [true, 'Дата бронирования обязательна']
  },
  time: {
    type: String,
    required: [true, 'Время бронирования обязательно']
  },
  guestsCount: {
    type: Number,
    required: [true, 'Количество гостей обязательно'],
    min: [1, 'Минимум 1 гость'],
    max: [20, 'Максимум 20 гостей']
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Особые пожелания не могут быть длиннее 500 символов']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingCode: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Генерация уникального кода бронирования
bookingSchema.pre('save', async function(next) {
  if (!this.bookingCode) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingCode = `BK-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

// Индексы
bookingSchema.index({ date: 1, time: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Booking', bookingSchema);