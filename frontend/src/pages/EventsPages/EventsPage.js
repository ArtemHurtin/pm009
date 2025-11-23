import React, { useState, useEffect } from 'react';
import './EventsPage.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [registrationLoading, setRegistrationLoading] = useState(false);

  // Mock данные для мероприятий
  const mockEvents = [
    {
      id: '1',
      title: 'Творческое занятие «Создание книжного амулета»',
      description: 'Создать оригинальный оберег из бумаги своими руками',
      date: '2024-11-04',
      displayDate: '4 ноября',
      time: '12:00',
      maxParticipants: 30,
      registeredUsers: [
        { name: 'Анна', email: 'anna@mail.com', phone: '+79991234567' },
        { name: 'Иван', email: 'ivan@mail.com', phone: '+79991234568' }
      ],
      location: 'Кофейня "Книжный дом"',
      price: 0,
      imageUrl: '/images/events/poetry-evening.jpg'
    },
    {
      id: '2',
      title: '«Рисуем осеннюю историю»',
      description: 'Участникам предоставляется материал для творчества',
      date: '2024-11-06',
      displayDate: '6 ноября',
      time: '16:00',
      maxParticipants: 15,
      registeredUsers: [
        { name: 'Мария', email: 'maria@mail.com', phone: '+79991234569' }
      ],
      location: 'Кофейня "Книжный дом"',
      price: 500,
      imageUrl: '/images/events/latte-art.jpg'
    },
    {
      id: '3',
      title: 'Мастер-класс «Волшебная шкатулка художника»',
      description: 'Изготовление оригинальной шкатулки для хранения творческих сокровищ',
      date: '2024-11-07',
      displayDate: '7 ноября',
      time: '14:00',
      maxParticipants: 20,
      registeredUsers: [
        { name: 'Петр', email: 'petr@mail.com', phone: '+79991234570' },
        { name: 'Ольга', email: 'olga@mail.com', phone: '+79991234571' },
        { name: 'Сергей', email: 'sergey@mail.com', phone: '+79991234572' }
      ],
      location: 'Кофейня "Кофейный дом"',
      price: 0,
      imageUrl: '/images/events/book-club.jpg'
    }
  ];

  // Mock функции API
  const fetchEvents = async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockEvents), 500);
    });
  };

  const registerForEventAPI = async (eventId, registrationData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const event = mockEvents.find(e => e.id === eventId);
        if (!event) {
          reject(new Error('Мероприятие не найдено'));
          return;
        }
        
        if (event.registeredUsers.length >= event.maxParticipants) {
          reject(new Error('Все места уже заняты'));
          return;
        }
        
        const existingRegistration = event.registeredUsers.find(
          user => user.email === registrationData.email
        );
        
        if (existingRegistration) {
          reject(new Error('Пользователь с таким email уже зарегистрирован'));
          return;
        }
        
        event.registeredUsers.push({
          ...registrationData,
          registeredAt: new Date().toISOString()
        });
        
        resolve({ success: true, message: 'Регистрация прошла успешно!' });
      }, 1000);
    });
  };

  useEffect(() => {
    loadEvents();
  }, );

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!registrationForm.name.trim() || !registrationForm.email.trim() || !registrationForm.phone.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationForm.email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }

    setRegistrationLoading(true);

    try {
      await registerForEventAPI(eventId, registrationForm);
      alert('Регистрация прошла успешно!');
      setShowRegistration(null);
      setRegistrationForm({ name: '', email: '', phone: '' });
      const updatedEvents = await fetchEvents();
      setEvents(updatedEvents);
    } catch (error) {
      alert(`Ошибка регистрации: ${error.message}`);
    } finally {
      setRegistrationLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(event => event.date >= today);
  const pastEvents = events.filter(event => event.date < today);

  const formatPrice = (price) => {
    return price === 0 ? 'Бесплатно' : `${price} ₽`;
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="container">
          <div className="loading">Загрузка мероприятий...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="container">
        <div className="events-header">
          <h1 className="page-title">Мероприятия</h1>
          <p className="page-subtitle">Присоединяйтесь к нашим литературным вечерам и творческим встречам</p>
        </div>

        <section className="events-section">
          <h2 className="section-title">Предстоящие события</h2>
          <div className="events-grid">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <div className="image-placeholder">
                    <span>{event.title.charAt(0)}</span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-header">
                    <div className="event-date-badge">
                      <span className="date-day">{event.displayDate.split(' ')[0]}</span>
                      <span className="date-month">
                        {event.displayDate.split(' ')[1]}
                      </span>
                    </div>
                    <div className="event-price">{formatPrice(event.price)}</div>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-time">{event.displayDate} • {event.time}</p>
                  <p className="event-location">{event.location}</p>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <span className="participants">
                      👥 {event.registeredUsers.length}/{event.maxParticipants} участников
                    </span>
                    {event.registeredUsers.length < event.maxParticipants ? (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowRegistration(event.id)}
                        disabled={registrationLoading}
                      >
                        Зарегистрироваться
                      </button>
                    ) : (
                      <span className="full-badge">Мест нет</span>
                    )}
                  </div>
                </div>

                {showRegistration === event.id && (
                  <div className="registration-modal">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3>Регистрация на "{event.title}"</h3>
                        <button 
                          className="close-btn"
                          onClick={() => setShowRegistration(null)}
                          disabled={registrationLoading}
                        >
                          ×
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>Ваше имя</label>
                          <input
                            type="text"
                            placeholder="Введите ваше имя"
                            value={registrationForm.name}
                            onChange={(e) => setRegistrationForm(prev => ({
                              ...prev, name: e.target.value
                            }))}
                            disabled={registrationLoading}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            placeholder="Введите ваш email"
                            value={registrationForm.email}
                            onChange={(e) => setRegistrationForm(prev => ({
                              ...prev, email: e.target.value
                            }))}
                            disabled={registrationLoading}
                          />
                        </div>
                        <div className="form-group">
                          <label>Телефон</label>
                          <input
                            type="tel"
                            placeholder="Введите ваш телефон"
                            value={registrationForm.phone}
                            onChange={(e) => setRegistrationForm(prev => ({
                              ...prev, phone: e.target.value
                            }))}
                            disabled={registrationLoading}
                          />
                        </div>
                      </div>
                      <div className="modal-actions">
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleRegister(event.id)}
                          disabled={!registrationForm.name || !registrationForm.email || !registrationForm.phone || registrationLoading}
                        >
                          {registrationLoading ? 'Регистрация...' : 'Подтвердить регистрацию'}
                        </button>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setShowRegistration(null)}
                          disabled={registrationLoading}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>Ближайших мероприятий пока нет</h3>
              <p>Следите за обновлениями, мы скоро анонсируем новые события!</p>
            </div>
          )}
        </section>

        {pastEvents.length > 0 && (
          <section className="events-section">
            <h2 className="section-title">Прошедшие мероприятия</h2>
            <div className="past-events">
              {pastEvents.map(event => (
                <div key={event.id} className="past-event-card">
                  <h3>{event.title}</h3>
                  <p className="event-date">{event.displayDate}</p>
                  <p>{event.description}</p>
                  <div className="event-gallery">
                    <button className="gallery-btn">
                      📸 Смотреть фотоотчёт
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default EventsPage;