const express = require('express');
const router = express.Router();

// Mock данные для меню
const menuItems = [
  {
    id: 1,
    name: 'Эспрессо',
    category: 'coffee',
    price: 180,
    description: 'Классический крепкий кофе',
    image: '/images/menu/espresso.jpg'
  },
  {
    id: 2,
    name: 'Капучино',
    category: 'coffee',
    price: 220,
    description: 'Кофе с молочной пенкой',
    image: '/images/menu/cappuccino.jpg'
  },
  {
    id: 3,
    name: 'Латте',
    category: 'coffee',
    price: 240,
    description: 'Нежный кофе с большим количеством молока',
    image: '/images/menu/latte.jpg'
  },
  {
    id: 4,
    name: 'Чизкейк',
    category: 'desserts',
    price: 280,
    description: 'Нежный чизкейк с ягодным соусом',
    image: '/images/menu/cheesecake.jpg'
  },
  {
    id: 5,
    name: 'Круассан',
    category: 'desserts',
    price: 150,
    description: 'Свежий французский круассан',
    image: '/images/menu/croissant.jpg'
  }
];

// GET /api/menu - получить все позиции меню
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: menuItems
  });
});

// GET /api/menu/:category - получить меню по категории
router.get('/:category', (req, res) => {
  const category = req.params.category;
  const filteredItems = menuItems.filter(item => item.category === category);
  
  res.json({
    success: true,
    data: filteredItems
  });
});

module.exports = router;