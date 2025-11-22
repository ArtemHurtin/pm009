import React, { useState, useEffect } from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import Testimonials from '../../components/Testimonials/Testimonials';
import { getReviews, createReview, getEvents, getMenuItems } from '../../services/api';
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
        setMenuItems(menuData.filter(item => item.category === 'coffee').slice(0, 3));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const slides = [
    {
      id: 1,
      title: "Новый осенний кофе",
      description: "Попробуйте наш сезонный латте с кленовым сиропом и корицей",
      buttonText: "Посмотреть меню",
      buttonLink: "/menu",
      image: "/api/placeholder/1200/600"
    },
    {
      id: 2,
      title: "Вечер поэзии",
      description: "Каждую пятницу в 19:00 - чтение стихов при свечах",
      buttonText: "Узнать больше",
      buttonLink: "/events",
      image: "/api/placeholder/1200/600"
    },
    {
      id: 3,
      title: "Книжные новинки",
      description: "В нашу библиотеку поступили новые бестселлеры",
      buttonText: "Посмотреть книги",
      buttonLink: "/menu",
      image: "/api/placeholder/1200/600"
    }
  ];

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="home-page">
      <HeroSlider slides={slides} />
      
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Добро пожаловать в наш кофейный дом</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="about-intro">
                Наш кофейный дом — это уютное убежище, где каждая страница любимой книги раскрывается заново благодаря чарующему аромату свежезаваренного кофе и атмосфере абсолютного покоя.

              </p>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">☕</span>
                  <h3>Качественный кофе</h3>
                  <p>Отборные зерна от проверенных обжарщиков</p>
                </div>
                <div className="feature">
                  <span className="feature-icon"></span>
                  <h3>Библиотека</h3>
                  <p>Тщательно подобранная коллекция книг</p>
                </div>
                <div className="feature">
                  <span className="feature-icon"></span>
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
            <a href="/menu" className="btn btn-secondary">Всё меню</a>
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
                  <p className="event-time"> {event.time}</p>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <span>👥 {event.registeredUsers} участников</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/events" className="btn btn-secondary">Все мероприятия</a>
          </div>
        </div>
      </section>

      <Testimonials 
        reviews={reviews} 
        onReviewSubmit={createReview}
        onReviewAdded={() => getReviews().then(setReviews)}
      />
    </div>
  );
};

export default HomePage;