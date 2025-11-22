import React, { useState } from 'react';
import { getEvents, registerForEvent } from 'services/api';
import './ContactsPage.css';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendContactMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contacts-page">
      <div className="container">
        <div className="contacts-header">
          <h1 className="page-title">Контакты</h1>
          <p className="page-subtitle">Свяжитесь с нами - мы всегда рады общению</p>
        </div>

        <div className="contacts-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon"></div>
              <div className="info-content">
                <h3>Адрес</h3>
                <p>г. Тула ул. Тихорецкая 25</p>
               
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon"></div>
              <div className="info-content">
                <h3>Телефон</h3>
                <a href="tel:8-956-123-00-05" className="contact-link">8-956-123-00-05</a>
                <p className="info-note">Ежедневно с 9:00 до 18:00</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon"></div>
              <div className="info-content">
                <h3>Email</h3>
                <a href="mailto:hello@bestbooks-cafe.ru" className="contact-link">
                  hello@bestbooks-cafe.ru
                </a>
                <p className="info-note">Для бронирования: email: Knigi@mail.ru</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon"></div>
              <div className="info-content">
                <h3>График работы</h3>
                <p>пн, вт, ср, чт, пт: 9:00 - 18:00</p>
                <p>сб, вс: 9:00 - 15:00</p>
              </div>
            </div>

            <div className="social-section">
              <h3>Мы в социальных сетях</h3>
              <div className="social-links">
                <a href="#" className="social-link">Telegram</a>
                <a href="#" className="social-link">VK</a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="form-card">
              <h2>Форма обратной связи</h2>
              <p>Есть вопросы или предложения? Напишите нам!</p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Ваше имя *</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Тема сообщения</label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                  >
                    <option value="">Выберите тему</option>
                    <option value="booking">Бронирование</option>
                    <option value="events">Мероприятия</option>
                    <option value="cooperation">Сотрудничество</option>
                    <option value="feedback">Отзыв</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Сообщение *</label>
                  <textarea
                    id="message"
                    rows="6"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    placeholder="Расскажите, чем мы можем вам помочь..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </button>

                {submitStatus === 'success' && (
                  <div className="success-message">
                     Сообщение отправлено! Мы ответим вам в ближайшее время.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="error-message">
                     Ошибка отправки. Пожалуйста, попробуйте ещё раз или позвоните нам.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="map-section">
          <h2 className="section-title">Мы на карте</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <h3>Кофейня "Лучшие книги"</h3>
                <p>г. Тула, ул. Тихорецкая 25</p>
                { <p>пн, вт, ср, чт, пт: 9:00 - 18:0 Сб-Вс: 9:00-23:00</p> }
                <div className="map-actions">
                  <button className="btn btn-secondary">Построить маршрут</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;