import React, { useState, useEffect } from 'react';
import './EventsPage.css';

// Mock данные для мероприятий
const mockEvents = [
  {
    id: '1',
    title: 'Встреча с Мариной Москвиной',
    description: '«Путешествие писателя сквозь детские мечты»',
    date: '2024-11-02',
    displayDate: '2 ноября',
    time: '15:00',
    maxParticipants: 30,
    registeredUsers: 15
  },
  {
    id: '2',
    title: 'Беседа с Дмитрием Глуховский',
    description: '«Будущее современной русской прозы»',
    date: '2024-11-03',
    displayDate: '3 ноября',
    time: '18:00',
    maxParticipants: 15,
    registeredUsers: 8
  },
  {
    id: '3',
    title: 'Творческое занятие «Создание книжного амулета»',
    description: 'Задача: Создать оригинальный оберег из бумаги своими руками',
    date: '2024-11-04',
    displayDate: '4 ноября',
    time: '12:00',
    maxParticipants: 20,
    registeredUsers: 12
  }
];

// Mock функции API
const fetchEvents = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockEvents), 500);
  });
};

const registerForEventAPI = async (eventId, registrationData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Event registration:', eventId, registrationData);
      // Находим событие и увеличиваем счетчик участников
      const event = mockEvents.find(e => e.id === eventId);
      if (event && event.registeredUsers < event.maxParticipants) {
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
    if (!registrationForm.name || !registrationForm.email || !registrationForm.phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      await registerForEventAPI(eventId, registrationForm);
      alert('Регистрация прошла успешно!');
      setShowRegistration(null);
      setRegistrationForm({ name: '', email: '', phone: '' });
      const updatedEvents = await fetchEvents();
      setEvents(updatedEvents);
    } catch (error) {
      alert('Ошибка регистрации. Попробуйте ещё раз.');
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(event => event.date >= today);
  const pastEvents = events.filter(event => event.date < today);

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
                    <span>{event.title.charAt(0)}</span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-date-badge">
                    <span className="date-day">{event.displayDate.split(' ')[0]}</span>
                    <span className="date-month">
                      {event.displayDate.split(' ')[1]}
                    </span>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-time">{event.displayDate} • {event.time}</p>
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
                          disabled={!registrationForm.name || !registrationForm.email || !registrationForm.phone}
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