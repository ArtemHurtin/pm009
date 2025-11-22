import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReviews, getEvents, getMenuItems } from '/../services/api';
import './HomePage.css';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [reviewsData, eventsData, menuData] = await Promise.all([
          getReviews(),
          getEvents(),
          getMenuItems()
        ]);
        setReviews(reviewsData);
        setEvents(eventsData);
        // Берем только кофе для превью
        setMenuItems(menuData.filter(item => item.category === 'coffee').slice(0, 3));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Кофейня "Лучшие книги"</h1>
            <p>Место, где встречаются ароматный кофе и увлекательные книги</p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-primary">Посмотреть меню</Link>
              <Link to="/booking" className="btn btn-secondary">Забронировать столик</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Добро пожаловать в нашу кофейню</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="about-intro">
                «кофейный дом» — это уникальное пространство, где аромат свежесваренного кофе 
                встречается с запахом старых переплетов. Мы создали место, где можно уединиться 
                с хорошей книгой, провести деловую встречу или просто насладиться моментом.
              </p>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">☕</span>
                  <h3>Качественный кофе</h3>
                  <p>Отборные зерна от проверенных обжарщиков</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">📚</span>
                  <h3>Библиотека</h3>
                  <p>Тщательно подобранная коллекция книг</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎭</span>
                  <h3>Мероприятия</h3>
                  <p>Литературные вечера и творческие встречи</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span>Изображение интерьера кофейни</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-preview">
        <div className="container">
          <h2 className="section-title">Популярные позиции</h2>
          <div className="menu-grid">
            {menuItems.map(item => (
              <div key={item.id} className="menu-item-card">
                <div className="item-image">
                  <div className="image-placeholder small">
                    <span>{item.name}</span>
                  </div>
                  {item.isBestseller && <span className="bestseller-badge">Хит</span>}
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="item-price">{item.price} ₽</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/menu" className="btn btn-secondary">Всё меню</Link>
          </div>
        </div>
      </section>

      <section className="events-preview">
        <div className="container">
          <h2 className="section-title">Ближайшие мероприятия</h2>
          <div className="events-grid">
            {events.slice(0, 3).map(event => (
              <div key={event.id} className="event-card">
                <div className="event-date">
                  <span className="date-day">{new Date(event.date).getDate()}</span>
                  <span className="date-month">
                    {new Date(event.date).toLocaleString('ru-RU', { month: 'short' })}
                  </span>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p className="event-time">🕒 {event.time}</p>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <span>👥 {event.registeredUsers.length} участников</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/events" className="btn btn-secondary">Все мероприятия</Link>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Отзывы наших гостей</h2>
          <div className="reviews-grid">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-author">
                    <span className="author-avatar">
                      {review.authorName.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <span className="author-name">{review.authorName}</span>
                      <div className="review-rating">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;