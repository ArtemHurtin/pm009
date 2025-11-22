import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const menuItems = [
    {
      id: '1',
      name: 'Эспрессо',
      description: 'Классический крепкий кофе из отборных арабских зерен',
      price: 180,
    },
    {
      id: '2',
      name: 'Капучино',
      description: 'Нежный кофе с молочной пенкой и рисунком на поверхности',
      price: 220,
    },
    {
      id: '3',
      name: 'Латте с сиропом',
      description: 'Кофе с молоком и выбором сиропа (ваниль, карамель, клен)',
      price: 250,
    }
  ];

  const events = [
    {
     id: '1',
    title: 'Встреча с Мариной Москвиной',
    description: 'Тема: «Путешествие писателя сквозь детские мечты».Открытость автора и интерактивная беседа с читателями',
    date: '2 ноября',
    time: '15:00',
    maxParticipants: 30,
    registeredUsers: 15
  },
  {
    id: '2',
    title: 'Беседа с Дмитрием Глуховским',
    description: 'Тема: «Будущее современной русской прозы» Предварительная запись обязательна',
    date: '3 ноября',
    time: '18:00',
    maxParticipants: 15,
    registeredUsers: 8
    }
  ];

  const reviews = [
   {
    id: '1',
    authorName: 'Еремей',
    text: 'Приятное уютное местечко, идеальное для любителей кофе и книг одновременно. Атмосфера здесь спокойная и располагающая к чтению или работе над проектами. Бариста внимательные, готовят вкусный капучино и латте. Единственный минус — немного тесновато внутри, особенно в часы пик. Но в целом рекомендую!',
    rating: 5,
    createdAt: '2024-01-15',
    status: 'approved'
  },
  {
    id: '2',
    authorName: 'Мирон',
    text: 'Посещаю эту кофейню регулярно, потому что обожаю атмосферу книжного магазина с запахом свежезаваренного кофе. Здесь приятно посидеть вечером с чашечкой горячего напитка и любимой книгой. Ассортимент кофе разнообразный, цены доступные. Правда, хотелось бы больше выбора десертов и выпечки. В остальном все отлично!',
    rating: 4,
    createdAt: '2024-01-20',
    status: 'approved'
  },
   {
    id: '3',
    authorName: 'Алексей',
    text: 'Это моя любимая кофейня в городе! Интерьер выполнен стильно и минималистично, много полок с интересными книгами, создающими особенную атмосферу. Часто проводятся встречи писателей и поэтов, литературные вечера. Напитки вкусные, порции большие. Только одно пожелание — расширить ассортимент чая. Все остальное идеально подходит для тихого отдыха и чтения.',
    rating: 4,
    createdAt: '2024-01-21',
    status: 'approved'
  },
   {
    id: '4',
    authorName: 'Марина',
    text: 'Кофейня с уникальным концептом, сочетающим две мои страсти — чтение и хороший кофе. Прекрасное пространство для тех, кому хочется отдохнуть от суеты города и погрузиться в мир литературы. Цены вполне приемлемые, обслуживание быстрое и вежливое. Иногда возникают проблемы с парковкой поблизости, но оно того стоит. Однозначно советую посетить хотя бы раз каждому любителю кофе и книг!',
    rating: 4,
    createdAt: '2024-01-22',
    status: 'approved'
   }
  ];

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
                «Лучшие книги» — это уникальное пространство, где аромат свежесваренного кофе 
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
                    <span>👥 {event.registeredUsers} участников</span>
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