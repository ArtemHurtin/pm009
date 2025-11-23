const express = require('express');
const router = express.Router();

// Mock данные для контактов
const contacts = {
address: ' г.Тула ул.Тихорецкая 25',
  phone: '8-956-123-00-05',
  email: 'Knigi@mail.ru',
  schedule: [
    { days: 'пн, вт, ср, чт, пт', hours: '9:00 - 18:00' },
    { days: 'сб, вс', hours: '9:00 - 15:00' }
  ],
  social: {
    vk: 'https://vk.com/bestbookscafe',
    telegram: 'https://t.me/bestbookscafe',

  }
};

// GET /api/contacts - получить контактную информацию
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: contacts
  });
});

// POST /api/contacts - отправить сообщение через форму обратной связи
router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;
  
  // В реальном приложении здесь была бы отправка email
  console.log('Новое сообщение от:', { name, email, phone, message });
  
  res.json({
    success: true,
    message: 'Сообщение отправлено успешно! Мы свяжемся с вами в ближайшее время.'
  });
});

module.exports = router;