const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: [true, 'Имя автора обязательно'],
    trim: true,
    maxlength: [100, 'Имя не может быть длиннее 100 символов']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  text: {
    type: String,
    required: [true, 'Текст отзыва обязателен'],
    maxlength: [1000, 'Текст отзыва не может быть длиннее 1000 символов']
  },
  rating: {
    type: Number,
    required: [true, 'Рейтинг обязателен'],
    min: [1, 'Рейтинг не может быть меньше 1'],
    max: [5, 'Рейтинг не может быть больше 5']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminResponse: {
    text: String,
    respondedAt: Date
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Индексы
reviewSchema.index({ status: 1, createdAt: -1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Review', reviewSchema);