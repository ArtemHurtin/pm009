import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../../services/api'; 
import './HomePage.css';

const HomePage = () => {
  const [featuredData, setFeaturedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedData();
  }, []);

  const loadFeaturedData = async () => {
    try {
      const data = await getMenuItems(); // получаем все элементы меню
      // Фильтруем featured меню (isBestseller) и книги (категория books и isBestseller)
      const featuredMenu = data.filter(item => item.isBestseller).slice(0, 4);
      const featuredBooks = data.filter(item => item.category === 'books' && item.isBestseller).slice(0, 3);
      setFeaturedData({ featuredMenu, featuredBooks });
    } catch (error) {
      console.error('Error loading featured items:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <section className="hero-section">
          <h1>Добро пожаловать в BestBooks Café</h1>
          <p>Место, где встречаются любовь к книгам и вкусному кофе</p>
          <button className="btn btn-primary">Посмотреть меню</button>
        </section>

        {featuredData && (
          <>
            <section className="featured-section">
              <h2>Рекомендуемые книги</h2>
              <div className="books-grid">
                {featuredData.featuredBooks.map(book => (
                  <div key={book.id} className="book-card">
                    <h3>{book.name}</h3>
                    <p className="author">{book.author}</p>
                    <p className="description">{book.description}</p>
                    <div className="price">{book.price} ₽</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="featured-section">
              <h2>Популярные позиции</h2>
              <div className="menu-grid">
                {featuredData.featuredMenu.map(item => (
                  <div key={item.id} className="menu-item-card">
                    <h3>{item.name}</h3>
                    <p className="description">{item.description}</p>
                    <div className="price">{item.price} ₽</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;