const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// @route   GET /api/reviews
// @desc    Get all reviews (approved only for public)
// @access  Public
router.get('/', reviewController.getReviews);

// @route   GET /api/reviews/approved
// @desc    Get approved reviews only
// @access  Public
router.get('/approved', reviewController.getApprovedReviews);

// @route   GET /api/reviews/featured
// @desc    Get featured reviews
// @access  Public
router.get('/featured', reviewController.getFeaturedReviews);

// @route   POST /api/reviews
// @desc    Create new review
// @access  Public
router.post('/', reviewController.createReview);

// @route   PUT /api/reviews/:id/status
// @desc    Update review status
// @access  Private/Admin
router.put('/:id/status', reviewController.updateReviewStatus);

// @route   PUT /api/reviews/:id/response
// @desc    Add admin response to review
// @access  Private/Admin
router.put('/:id/response', reviewController.addReviewResponse);

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private/Admin
router.delete('/:id', reviewController.deleteReview);

module.exports = router;