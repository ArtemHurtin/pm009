import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-icon"></span>
              <div>
                <h3>Кофейня "Лучшие книги"</h3>
                <p>Место, где встречаются кофе и литература</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">Telegram</a>
              <a href="#" className="social-link">VK</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="contact-info">
              <p>8-956-123-00-05</p>
              <p>email: Knigi@mail.ru</p>
              <p>Тула, ул. Тихорецкая 25</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>График работы</h4>
            <div className="working-hours">
              <p>пн, вт, ср, чт, пт: 9:00 - 18:00</p>
              <p>сб, вс: 9:00 - 15:00</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Навигация</h4>
            <div className="footer-links">
              <Link to="/menu" className="footer-link">Меню</Link>
              <Link to="/booking" className="footer-link">Бронирование</Link>
              <Link to="/events" className="footer-link">Мероприятия</Link>
              <Link to="/blog" className="footer-link">Блог</Link>
              <Link to="/contacts" className="footer-link">Контакты</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Кофейня "кофейный дом". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;