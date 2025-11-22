import React, { useState } from 'react';
import './BookingPage.css';

// Mock функция API
const createBooking = async (bookingData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Booking data:', bookingData);
      // Имитация случайных ошибок (10% chance)
      if (Math.random() < 0.1) {
        reject(new Error('Ошибка при бронировании. Попробуйте еще раз.'));
      } else {
        resolve({ 
          success: true, 
          bookingId: 'BK' + Date.now(),
          message: 'Бронирование подтверждено. Подтверждение отправлено на email.' 
        });
      }
    }, 1500);
  });
};

const BookingPage = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    date: '',
    time: '12:00',
    guestsCount: 2,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

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
      await createBooking(formData);
      setSubmitStatus('success');
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        date: '',
        time: '12:00',
        guestsCount: 2,
        specialRequests: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1 className="page-title">Бронирование столика</h1>
          <p className="page-subtitle">Забронируйте столик и обеспечьте себе уютный вечер с кофе и книгой</p>
        </div>

        <div className="booking-content">
          <div className="booking-form-section">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerName">Ваше имя *</label>
                  <input
                    type="text"
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleChange('customerName', e.target.value)}
                    required
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="8-956-123-00-05"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="ivan@example.com"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Дата *</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    min={today}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Время *</label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    required
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guestsCount">Количество гостей *</label>
                  <select
                    id="guestsCount"
                    value={formData.guestsCount}
                    onChange={(e) => handleChange('guestsCount', parseInt(e.target.value))}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Особые пожелания</label>
                <textarea
                  id="specialRequests"
                  rows="4"
                  value={formData.specialRequests}
                  onChange={(e) => handleChange('specialRequests', e.target.value)}
                  placeholder="Укажите особые пожелания, например, столик у окна, детский стульчик и т.д."
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Бронируем...
                  </>
                ) : (
                  'Забронировать стол'
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  ✅ Столик успешно забронирован! Ждём вас в кофейне. Подтверждение отправлено на вашу почту.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="error-message">
                  ❌ Произошла ошибка при бронировании. Пожалуйста, попробуйте ещё раз или позвоните нам.
                </div>
              )}
            </form>
          </div>

          <div className="booking-info">
            <div className="info-card">
              <h3> Бронирование по телефону</h3>
              <p>Если у вас возникли трудности с онлайн-бронированием, звоните:</p>
              <a href="tel:8-956-123-00-05" className="phone-link">8-956-123-00-05</a>
            </div>

            <div className="info-card">
              <h3>⏰ Правила бронирования</h3>
              <ul className="rules-list">
                <li>Столик сохраняется в течение 15 минут от указанного времени</li>
                <li>Для компаний более 6 человек звоните заранее</li>
                <li>Отмена бронирования - минимум за 2 часа</li>
                <li>Особые мероприятия требуют предварительного согласования</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>🎉 Особые случаи</h3>
              <p>Планируете праздник или деловую встречу? Мы поможем организовать:</p>
              <ul>
                <li>Дни рождения и праздники</li>
                <li>Деловые встречи</li>
                <li>Литературные вечера</li>
                <li>Свидания и особые моменты</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;