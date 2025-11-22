const ContactMessage = require('../models/ContactMessage');

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private/Admin
exports.getContactMessages = async (req, res) => {
  try {
    const { status, subject } = req.query;
    
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (subject) {
      filter.subject = subject;
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении сообщений'
    });
  }
};

// @desc    Create new contact message
// @route   POST /api/contacts
// @access  Public
exports.createContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    
    // Здесь можно добавить отправку уведомления администратору
    // await sendNewMessageNotification(message);

    res.status(201).json({
      success: true,
      message: 'Сообщение успешно отправлено! Мы ответим вам в ближайшее время.',
      data: message
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при отправке сообщения'
    });
  }
};

// @desc    Update message status
// @route   PUT /api/contacts/:id/status
// @access  Private/Admin
exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Неверный статус'
      });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Сообщение не найдено'
      });
    }

    res.json({
      success: true,
      message: `Статус сообщения изменен на "${status}"`,
      data: message
    });
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении статуса сообщения'
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
exports.deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Сообщение не найдено'
      });
    }

    await ContactMessage.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Сообщение удалено'
    });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении сообщения'
    });
  }
};