const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', menuController.getMenuItems);

// @route   GET /api/menu/category/:category
// @desc    Get menu items by category
// @access  Public
router.get('/category/:category', menuController.getMenuByCategory);

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get('/:id', menuController.getMenuItem);

// @route   POST /api/menu
// @desc    Create new menu item
// @access  Private/Admin
router.post('/', menuController.createMenuItem);

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private/Admin
router.put('/:id', menuController.updateMenuItem);

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private/Admin
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;