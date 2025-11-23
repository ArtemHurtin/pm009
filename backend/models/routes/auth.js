const express = require('express');
const router = express.Router();

// Mock данные пользователей
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password123', // В реальном приложении пароли должны быть хешированы
    name: 'Администратор'
  }
];

// POST /api/auth/login - вход пользователя
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Неверный email или пароль'
    });
  }
  
  // В реальном приложении здесь должен быть JWT токен
  res.json({
    success: true,
    message: 'Вход выполнен успешно',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

module.exports = router;