const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
    trim: true,
    maxlength: [100, 'Имя не может быть длиннее 100 символов']
  },
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: [true, 'Тема сообщения обязательна'],
    enum: {
      values: ['booking', 'events', 'cooperation', 'feedback', 'other'],
      message: 'Тема должна быть: booking, events, cooperation, feedback или other'
    }
  },
  message: {
    type: String,
    required: [true, 'Сообщение обязательно'],
    maxlength: [2000, 'Сообщение не может быть длиннее 2000 символов']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  adminNotes: {
    type: String,
    maxlength: [500, 'Заметки не могут быть длиннее 500 символов']
  }
}, {
  timestamps: true
});

// Индексы
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ subject: 1 });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);