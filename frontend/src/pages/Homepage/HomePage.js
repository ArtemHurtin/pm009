import React, { useState, useEffect } from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import Testimonials from '../../components/Testimonials/Testimonials';
import './HomePage.css';

// Mock данные и функции
const mockMenuItems = [
  {
    id: '1',
    name: 'Эспрессо',
    description: 'Классический крепкий кофе из отборных арабских зерен',
    price: 180,
    category: 'coffee',
    isBestseller: true
  },
  {
    id: '2',
    name: 'Капучино',
    description: 'Нежный кофе с молочной пенкой и рисунком на поверхности',
    price: 220,
    category: 'coffee',
    isBestseller: true
  },
  {
    id: '3',
    name: 'Латте с сиропом',
    description: 'Кофе с молоком и выбором сиропа (ваниль, карамель, клен)',
    price: 250,
    category: 'coffee'
  }
];

const mockEvents = [
  {
    id: '1',
    title: 'Вечер поэзии',
    description: 'Чтение стихов современных авторов при свечах',
    date: '2024-02-15',
    time: '19:00',
    maxParticipants: 30,
    registeredUsers: 15
  },
  {
    id: '2',
    title: 'Мастер-класс по латте-арту',
    description: 'Научим создавать красивые рисунки на кофе',
    date: '2024-02-20',
    time: '15:00',
    maxParticipants: 15,
    registeredUsers: 8
  }
];

const mockReviews = [
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

// Mock API функции
const getReviews = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockReviews), 600));
};

const createReview = async (reviewData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Review submitted:', reviewData);
      resolve({ success: true, message: 'Отзыв отправлен на модерацию.' });
    }, 1200);
  });
};

const getEvents = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockEvents), 700));
};

const getMenuItems = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockMenuItems), 800));
};

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