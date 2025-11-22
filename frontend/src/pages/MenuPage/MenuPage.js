import React, { useState, useEffect } from 'react';
import { getMenuItems } from '/../services/api';
import './MenuPage.css';

// Mock данные меню
const mockMenuItems = [
  {
    id: '1',
    name: 'Эспрессо',
    description: 'Классический крепкий кофе из отборных арабских зерен',
    price: 180,
    category: 'coffee',
    isBestseller: true,
    allergens: 'кофеин'
  },
  {
    id: '2',
    name: 'Капучино',
    description: 'Нежный кофе с молочной пенкой и рисунком на поверхности',
    price: 220,
    category: 'coffee',
    isBestseller: true
  },
  {
    id: '3',
    name: 'Латте с сиропом',
    description: 'Кофе с молоком и выбором сиропа (ваниль, карамель, клен)',
    price: 250,
    category: 'coffee'
  },
  {
    id: '4',
    name: 'Тирамису',
    description: 'Классический итальянский десерт с кофейной пропиткой',
    price: 280,
    category: 'desserts',
    isBestseller: true,
    allergens: 'глютен, лактоза'
  },
  {
    id: '5',
    name: 'Чизкейк Нью-Йорк',
    description: 'Нежный чизкейк с ягодным соусом',
    price: 260,
    category: 'desserts'
  },
  {
    id: '6',
    name: 'Веганский брауни',
    description: 'Шоколадный брауни без продуктов животного происхождения',
    price: 200,
    category: 'desserts',
    isVegan: true
  },
  {
    id: '7',
    name: 'Английский завтрак',
    description: 'Яичница, бекон, фасоль, грибы и тосты',
    price: 350,
    category: 'breakfast',
    allergens: 'глютен, лактоза, яйца'
  },
  {
    id: '8',
    name: 'Сырники',
    description: 'Домашние сырники со сметаной и ягодным джемом',
    price: 280,
    category: 'breakfast',
    isBestseller: true
  },
  {
    id: '9',
    name: '1984',
    description: 'Джордж Оруэлл - антиутопия о тоталитарном обществе',
    price: 450,
    category: 'books',
    author: 'Джордж Оруэлл'
  },
  {
    id: '10',
    name: 'Мастер и Маргарита',
    description: 'Михаил Булгаков - мистический роман о добре и зле',
    price: 420,
    category: 'books',
    author: 'Михаил Булгаков',
    isBestseller: true
  }
];

// Mock функция API


const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'coffee', name: 'Кофе', icon: '☕' },
    { id: 'desserts', name: 'Десерты', icon: '🍰' },
    { id: 'breakfast', name: 'Завтраки', icon: '🥐' },
    { id: 'books', name: 'Книги', icon: '📚' }
  ];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const data = await getMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  if (loading) {
    return <div className="loading">Загрузка меню...</div>;
  }

  return (
    <div className="menu-page">
      <div className="container">
        <div className="menu-header">
          <h1 className="page-title">Наше меню</h1>
          <p className="page-subtitle">Выберите категорию и откройте для себя наши предложения</p>
        </div>
        
        <div className="categories-nav">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="menu-content">
          <div className="category-header">
            <h2 className="category-title">
              <span className="category-icon">{currentCategory?.icon}</span>
              {currentCategory?.name}
            </h2>
            <p className="category-count">{filteredItems.length} позиций</p>
          </div>

          <div className="menu-items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-item">
                <div className="item-image">
                  <div className="image-placeholder">
                    <span>{item.name}</span>
                  </div>
                  {item.isVegan && <span className="vegan-badge">Vegan</span>}
                  {item.isBestseller && <span className="bestseller-badge">Хит</span>}
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-price">{item.price} ₽</div>
                  </div>
                  <p className="item-description">{item.description}</p>
                  {item.allergens && (
                    <div className="item-allergens">
                      <span>Аллергены: {item.allergens}</span>
                    </div>
                  )}
                  <div className="item-actions">
                    <button className="btn btn-primary">Добавить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>В этой категории пока нет позиций</h3>
              <p>Скоро мы добавим новые items в меню</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;