const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название мероприятия обязательно'],
    trim: true,
    maxlength: [200, 'Название не может быть длиннее 200 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание мероприятия обязательно'],
    maxlength: [1000, 'Описание не может быть длиннее 1000 символов']
  },
  date: {
    type: Date,
    required: [true, 'Дата мероприятия обязательна']
  },
  time: {
    type: String,
    required: [true, 'Время мероприятия обязательно']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Максимальное количество участников обязательно'],
    min: [1, 'Минимум 1 участник']
  },
  registeredUsers: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  location: {
    type: String,
    default: 'Кофейня "Лучшие книги"'
  },
  price: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Виртуальное поле для количества зарегистрированных
eventSchema.virtual('participantsCount').get(function() {
  return this.registeredUsers.length;
});

// Проверка доступности мест
eventSchema.methods.hasAvailableSpots = function() {
  return this.registeredUsers.length < this.maxParticipants;
};

// Проверка, зарегистрирован ли пользователь
eventSchema.methods.isUserRegistered = function(email) {
  return this.registeredUsers.some(user => user.email === email);
};

// Индексы
eventSchema.index({ date: 1, isActive: 1 });
eventSchema.index({ isActive: 1 });

module.exports = mongoose.model('Event', eventSchema);