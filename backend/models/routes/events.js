const express = require('express');
const router = express.Router();

// Mock данные для мероприятий
const events = [
  {
    id: '1',
    title: 'Творческое занятие «Создание книжного амулета»',
    description: 'Создать оригинальный оберег из бумаги своими руками',
    date: '2024-11-04',
    displayDate: '4 ноября',
    time: '12:00',
    maxParticipants: 30,
    registeredUsers: [
      { name: 'Анна', email: 'anna@mail.com', phone: '+79991234567' },
      { name: 'Иван', email: 'ivan@mail.com', phone: '+79991234568' }
    ],
    location: 'Кофейня "Кофейный дом"',
    price: 0,
    imageUrl: '/images/events/poetry-evening.jpg'
  },
  {
    id: '2',
    title: '«Рисуем осеннюю историю»',
    description: 'Участникам предоставляется материал для творчества',
    date: '2024-11-06',
    displayDate: '6 ноября',
    time: '16:00',
    maxParticipants: 15,
    registeredUsers: [
      { name: 'Мария', email: 'maria@mail.com', phone: '+79991234569' }
    ],
    location: 'Кофейня "Кофейный дом"',
    price: 500,
    imageUrl: '/images/events/latte-art.jpg'
  }
];

// GET /api/events - получить все мероприятия
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: events
  });
});

// POST /api/events/register - регистрация на мероприятие
router.post('/register', (req, res) => {
  const { eventId, name, email, phone } = req.body;
  
  const event = events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Мероприятие не найдено'
    });
  }
  
  if (event.registeredUsers.length >= event.maxParticipants) {
    return res.status(400).json({
      success: false,
      message: 'Все места уже заняты'
    });
  }
  
  // Проверяем, не зарегистрирован ли уже пользователь
  const existingRegistration = event.registeredUsers.find(
    user => user.email === email
  );
  
  if (existingRegistration) {
    return res.status(400).json({
      success: false,
      message: 'Пользователь с таким email уже зарегистрирован'
    });
  }
  
  // Добавляем регистрацию
  event.registeredUsers.push({ name, email, phone });
  
  res.json({
    success: true,
    message: 'Регистрация прошла успешно!'
  });
});

module.exports = router;