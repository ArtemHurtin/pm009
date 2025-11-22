const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public (returns approved only by default)
exports.getReviews = async (req, res) => {
  try {
    const { status, featured } = req.query;
    
    let filter = {};
    
    // По умолчанию показываем только одобренные отзывы
    if (!status) {
      filter.status = 'approved';
    } else if (status !== 'all') {
      filter.status = status;
    }
    
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении отзывов'
    });
  }
};

// @desc    Get approved reviews only
// @route   GET /api/reviews/approved
// @access  Public
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get approved reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении одобренных отзывов'
    });
  }
};

// @desc    Get featured reviews
// @route   GET /api/reviews/featured
// @access  Public
exports.getFeaturedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      status: 'approved', 
      isFeatured: true 
    })
    .sort({ rating: -1, createdAt: -1 })
    .limit(6);

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get featured reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении избранных отзывов'
    });
  }
};

// @desc    Create new review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Отзыв отправлен на модерацию. Спасибо!',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при создании отзыва'
    });
  }
};

// @desc    Update review status
// @route   PUT /api/reviews/:id/status
// @access  Private/Admin
exports.updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Неверный статус'
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Отзыв не найден'
      });
    }

    res.json({
      success: true,
      message: `Статус отзыва изменен на "${status}"`,
      data: review
    });
  } catch (error) {
    console.error('Update review status error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении статуса отзыва'
    });
  }
};

// @desc    Add admin response to review
// @route   PUT /api/reviews/:id/response
// @access  Private/Admin
exports.addReviewResponse = async (req, res) => {
  try {
    const { response } = req.body;
    
    if (!response) {
      return res.status(400).json({
        success: false,
        message: 'Текст ответа обязателен'
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { 
        adminResponse: {
          text: response,
          respondedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Отзыв не найден'
      });
    }

    res.json({
      success: true,
      message: 'Ответ добавлен к отзыву',
      data: review
    });
  } catch (error) {
    console.error('Add review response error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при добавлении ответа к отзыву'
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Отзыв не найден'
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Отзыв удален'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении отзыва'
    });
  }
};