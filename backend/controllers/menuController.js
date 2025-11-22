const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    let filter = { isAvailable: true };
    
    if (category && ['coffee', 'desserts', 'breakfast', 'books'].includes(category)) {
      filter.category = category;
    }
    
    if (featured === 'true') {
      filter.isBestseller = true;
    }

    const menuItems = await MenuItem.find(filter).sort({ category: 1, price: 1 });
    
    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении меню'
    });
  }
};

// @desc    Get menu items by category
// @route   GET /api/menu/category/:category
// @access  Public
exports.getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!['coffee', 'desserts', 'breakfast', 'books'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Неверная категория'
      });
    }

    const menuItems = await MenuItem.find({ 
      category, 
      isAvailable: true 
    }).sort({ price: 1 });

    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении меню по категории'
    });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Позиция меню не найдена'
      });
    }

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении позиции меню'
    });
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    
    res.status(201).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при создании позиции меню'
    });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Позиция меню не найдена'
      });
    }

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении позиции меню'
    });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Позиция меню не найдена'
      });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Позиция меню удалена'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении позиции меню'
    });
  }
};const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    let filter = { isAvailable: true };
    
    if (category && ['coffee', 'desserts', 'breakfast', 'books'].includes(category)) {
      filter.category = category;
    }
    
    if (featured === 'true') {
      filter.isBestseller = true;
    }

    const menuItems = await MenuItem.find(filter).sort({ category: 1, price: 1 });
    
    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении меню'
    });
  }
};

// @desc    Get menu items by category
// @route   GET /api/menu/category/:category
// @access  Public
exports.getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!['coffee', 'desserts', 'breakfast', 'books'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Неверная категория'
      });
    }

    const menuItems = await MenuItem.find({ 
      category, 
      isAvailable: true 
    }).sort({ price: 1 });

    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении меню по категории'
    });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Позиция меню не найдена'
      });
    }

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении позиции меню'
    });
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    
    res.status(201).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при создании позиции меню'
    });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Позиция меню не найдена'
      });
    }

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении позиции меню'
    });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Позиция меню не найдена'
      });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Позиция меню удалена'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении позиции меню'
    });
  }
};