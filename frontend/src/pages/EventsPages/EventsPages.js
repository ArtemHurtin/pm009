import React, { useState, useEffect } from 'react';
import { getEvents, registerForEvent } from 'services/api';
import './EventsPage.css';

// Mock данные для мероприятий
const mockEvents = [
  {
    id: '1',
    title: 'Вечер поэзии',
    description: 'Чтение стихов современных авторов при свечах. Приносите свои произведения!',
    date: '2024-02-15',
    time: '19:00',
    maxParticipants: 30,
    registeredUsers: 15,
    image: '/api/placeholder/400/300'
  },
  {
    id: '2',
    title: 'Мастер-класс по латте-арту',
    description: 'Научим создавать красивые рисунки на кофе. Для начинающих и продвинутых.',
    date: '2024-02-20',
    time: '15:00',
    maxParticipants: 15,
    registeredUsers: 8,
    image: '/api/placeholder/400/300'
  },
  {
    id: '3',
    title: 'Книжный клуб: современная проза',
    description: 'Обсуждение новейших литературных произведений за чашкой кофе.',
    date: '2024-02-25',
    time: '18:00',
    maxParticipants: 20,
    registeredUsers: 12,
    image: '/api/placeholder/400/300'
  }
];

// Mock функции API
const getEvents = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockEvents), 500);
  });
};

const registerForEvent = async (eventId, registrationData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Event registration:', eventId, registrationData);
      // Находим событие и увеличиваем счетчик участников
      const event = mockEvents.find(e => e.id === eventId);
      if (event) {
        event.registeredUsers += 1;
      }
      resolve({ success: true, message: 'Регистрация прошла успешно!' });
    }, 1000);
  });
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await registerForEvent(eventId, registrationForm);
      setShowRegistration(null);
      setRegistrationForm({ name: '', email: '', phone: '' });
      loadEvents(); // Reload to update participants count
    } catch (error) {
      alert('Ошибка регистрации. Попробуйте ещё раз.');
    }
  };

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  if (loading) {
    return <div className="loading">Загрузка мероприятий...</div>;
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
                    <span>{event.title}</span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-date-badge">
                    <span className="date-day">{new Date(event.date).getDate()}</span>
                    <span className="date-month">
                      {new Date(event.date).toLocaleString('ru-RU', { month: 'short' })}
                    </span>
                  </div>
                  <h3>{event.title}</h3>
                  <p className="event-time"> {event.time}</p>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <span className="participants">
                      👥 {event.registeredUsers}/{event.maxParticipants} участников
                    </span>
                    {event.registeredUsers < event.maxParticipants ? (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowRegistration(event.id)}
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
                        >
                          ×
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Ваше имя"
                            value={registrationForm.name}
                            onChange={(e) => setRegistrationForm(prev => ({
                              ...prev, name: e.target.value
                            }))}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Email"
                            value={registrationForm.email}
                            onChange={(e) => setRegistrationForm(prev => ({
                              ...prev, email: e.target.value
                            }))}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="tel"
                            placeholder="Телефон"
                            value={registrationForm.phone}
                            onChange={(e) => setRegistrationForm(prev => ({
                              ...prev, phone: e.target.value
                            }))}
                          />
                        </div>
                      </div>
                      <div className="modal-actions">
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleRegister(event.id)}
                        >
                          Подтвердить регистрацию
                        </button>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setShowRegistration(null)}
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
              <div className="empty-icon"></div>
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
                  <p className="event-date">
                    {new Date(event.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
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