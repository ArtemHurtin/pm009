const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Название обязательно'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание обязательно'],
    maxlength: [500, 'Описание не может быть длиннее 500 символов']
  },
  price: {
    type: Number,
    required: [true, 'Цена обязательна'],
    min: [0, 'Цена не может быть отрицательной']
  },
  category: {
    type: String,
    required: [true, 'Категория обязательна'],
    enum: {
      values: ['coffee', 'desserts', 'breakfast', 'books'],
      message: 'Категория должна быть: coffee, desserts, breakfast или books'
    }
  },
  imageUrl: {
    type: String,
    default: ''
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  allergens: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Индексы для быстрого поиска
menuItemSchema.index({ category: 1, isAvailable: 1 });
menuItemSchema.index({ isBestseller: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);