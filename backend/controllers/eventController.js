const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ date: 1, time: 1 })
      .select('-registeredUsers'); // Не возвращаем данные участников для публичного доступа

    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении мероприятий'
    });
  }
};

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
// @access  Public
exports.getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      isActive: true,
      date: { $gte: today }
    })
    .sort({ date: 1, time: 1 })
    .limit(6)
    .select('-registeredUsers');

    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении предстоящих мероприятий'
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select('-registeredUsers');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении мероприятия'
    });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Create event error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при создании мероприятия'
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Update event error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении мероприятия'
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено'
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Мероприятие удалено'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении мероприятия'
    });
  }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Public
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено'
      });
    }

    if (!event.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Мероприятие не активно'
      });
    }

    // Проверка доступности мест
    if (!event.hasAvailableSpots()) {
      return res.status(400).json({
        success: false,
        message: 'К сожалению, все места на это мероприятие уже заняты'
      });
    }

    const { name, email, phone } = req.body;

    // Проверка, не зарегистрирован ли уже пользователь
    if (event.isUserRegistered(email)) {
      return res.status(400).json({
        success: false,
        message: 'Вы уже зарегистрированы на это мероприятие'
      });
    }

    // Добавление участника
    event.registeredUsers.push({
      name,
      email,
      phone
    });

    await event.save();

    res.json({
      success: true,
      message: 'Регистрация на мероприятие прошла успешно!',
      participantsCount: event.registeredUsers.length,
      availableSpots: event.maxParticipants - event.registeredUsers.length
    });
  } catch (error) {
    console.error('Register for event error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при регистрации на мероприятие'
    });
  }
};