const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// @route   GET /api/bookings
// @desc    Get all bookings (with filtering)
// @access  Private/Admin
router.get('/', bookingController.getBookings);

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private/Admin
router.get('/:id', bookingController.getBooking);

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Public
router.post('/', bookingController.createBooking);

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private/Admin
router.put('/:id/status', bookingController.updateBookingStatus);

// @route   DELETE /api/bookings/:id
// @desc    Delete booking
// @access  Private/Admin
router.delete('/:id', bookingController.deleteBooking);

// @route   GET /api/bookings/check-availability
// @desc    Check table availability
// @access  Public
router.get('/check-availability', bookingController.checkAvailability);

module.exports = router;