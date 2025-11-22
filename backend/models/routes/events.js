const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', eventController.getEvents);

// @route   GET /api/events/upcoming
// @desc    Get upcoming events
// @access  Public
router.get('/upcoming', eventController.getUpcomingEvents);

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', eventController.getEvent);

// @route   POST /api/events
// @desc    Create new event
// @access  Private/Admin
router.post('/', eventController.createEvent);

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private/Admin
router.put('/:id', eventController.updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private/Admin
router.delete('/:id', eventController.deleteEvent);

// @route   POST /api/events/:id/register
// @desc    Register for event
// @access  Public
router.post('/:id/register', eventController.registerForEvent);

module.exports = router;