const express = require('express');
const router = express.Router();

// Mock данные для отзывов
let reviews = [
  {
    id: 1,
    name: 'Анна',
    rating: 5,
    comment: 'Прекрасное место! Отличный кофе и уютная атмосфера.',
    date: '2024-10-15',
    approved: true
  },
  {
    id: 2,
    name: 'Иван',
    rating: 4,
    comment: 'Очень понравились мероприятия, буду приходить ещё!',
    date: '2024-10-10',
    approved: true
  }
];

// GET /api/reviews - получить все одобренные отзывы
router.get('/', (req, res) => {
  const approvedReviews = reviews.filter(review => review.approved);
  res.json({
    success: true,
    data: approvedReviews
  });
});

// POST /api/reviews - создать новый отзыв
router.post('/', (req, res) => {
  const { name, rating, comment } = req.body;
  
  const newReview = {
    id: Date.now(),
    name,
    rating: parseInt(rating),
    comment,
    date: new Date().toISOString().split('T')[0],
    approved: false // Модерация перед публикацией
  };
  
  reviews.push(newReview);
  
  res.json({
    success: true,
    message: 'Отзыв отправлен на модерацию!',
    data: newReview
  });
});

module.exports = router;