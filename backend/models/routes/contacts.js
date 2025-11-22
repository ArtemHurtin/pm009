const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// @route   GET /api/contacts
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', contactController.getContactMessages);

// @route   POST /api/contacts
// @desc    Create new contact message
// @access  Public
router.post('/', contactController.createContactMessage);

// @route   PUT /api/contacts/:id/status
// @desc    Update message status
// @access  Private/Admin
router.put('/:id/status', contactController.updateMessageStatus);

// @route   DELETE /api/contacts/:id
// @desc    Delete contact message
// @access  Private/Admin
router.delete('/:id', contactController.deleteContactMessage);

module.exports = router;