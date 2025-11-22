const { body, validationResult } = require('express-validator');

// Валидация для создания бронирования
exports.validateBooking = [
  body('customerName')
    .notEmpty()
    .withMessage('Имя обязательно')
    .isLength({ max: 100 })
    .withMessage('Имя не может быть длиннее 100 символов'),
  
  body('phone')
    .notEmpty()
    .withMessage('Телефон обязателен'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Неверный формат email'),
  
  body('date')
    .notEmpty()
    .withMessage('Дата обязательна')
    .isISO8601()
    .withMessage('Неверный формат даты'),
  
  body('time')
    .notEmpty()
    .withMessage('Время обязательно'),
  
  body('guestsCount')
    .isInt({ min: 1, max: 20 })
    .withMessage('Количество гостей должно быть от 1 до 20'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Ошибки валидации',
        errors: errors.array()
      });
    }
    next();
  }
];