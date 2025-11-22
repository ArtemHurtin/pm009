const Booking = require('../models/Booking');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const { date, status } = req.query;
    
    let filter = {};
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      filter.date = {
        $gte: startDate,
        $lt: endDate
      };
    }
    
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter).sort({ date: 1, time: 1 });
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении бронирований'
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private/Admin
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Бронирование не найдено'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении бронирования'
    });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
  try {
    // Проверка доступности времени
    const existingBooking = await Booking.findOne({
      date: req.body.date,
      time: req.body.time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'На это время уже есть бронирование. Пожалуйста, выберите другое время.'
      });
    }

    const booking = await Booking.create(req.body);
    
    // Здесь можно добавить отправку email подтверждения
    // await sendBookingConfirmation(booking);

    res.status(201).json({
      success: true,
      message: 'Бронирование успешно создано',
      data: booking,
      bookingCode: booking.bookingCode
    });
  } catch (error) {
    console.error('Create booking error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при создании бронирования'
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Неверный статус'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Бронирование не найдено'
      });
    }

    res.json({
      success: true,
      message: `Статус бронирования изменен на "${status}"`,
      data: booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении статуса бронирования'
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Бронирование не найдено'
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Бронирование удалено'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении бронирования'
    });
  }
};

// @desc    Check table availability
// @route   GET /api/bookings/check-availability
// @access  Public
exports.checkAvailability = async (req, res) => {
  try {
    const { date, time } = req.query;
    
    if (!date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Дата и время обязательны для проверки'
      });
    }

    const existingBooking = await Booking.findOne({
      date: new Date(date),
      time: time,
      status: { $in: ['pending', 'confirmed'] }
    });

    const isAvailable = !existingBooking;

    res.json({
      success: true,
      data: {
        date,
        time,
        isAvailable,
        message: isAvailable ? 'Время доступно для бронирования' : 'Время занято'
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при проверке доступности'
    });
  }
};