// services/api.js
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  DEFAULT_DELAY: 500,
};

// Mock данные
const mockMenuItems = [
  {
    id: '1', name: 'Эспрессо', description: 'Классический крепкий кофе', price: 180, category: 'coffee', isBestseller: true,
    imageUrl: '/images/coffee/espresso.jpg'
  },
  {
    id: '2', name: 'Капучино', description: 'Кофе с молочной пенкой', price: 220, category: 'coffee', isBestseller: true,
    imageUrl: '/images/coffee/cappuccino.jpg'
  },
  {
    id: '3', name: 'Латте', description: 'Кофе с молоком', price: 240, category: 'coffee',
    imageUrl: '/images/coffee/latte.jpg'
  },
  {
    id: '4', name: 'Тирамису', description: 'Итальянский десерт', price: 280, category: 'desserts', isBestseller: true,
    imageUrl: '/images/desserts/tiramisu.jpg'
  }
];

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
    location: 'Кофейня "Кофейный дом"',
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
    location: 'Кофейня "Кофейный дом"',
    price: 500,
    imageUrl: '/images/events/latte-art.jpg'
  }
];

const mockReviews = [
  {
    id: '1',
    authorName: 'Еремей',
    email: 'erya@example.com',
    text: 'Приятное уютное местечко, идеальное для любителей кофе и книг одновременно...',
    rating: 5,
    createdAt: '2024-01-15',
    status: 'approved',
    isFeatured: true
  },
  {
    id: '2',
    authorName: 'Мирон',
    email: 'mirol@example.com',
    text: 'Посещаю эту кофейню регулярно...',
    rating: 4,
    createdAt: '2024-01-20',
    status: 'approved'
  }
];

// Утилиты
const delay = (ms = API_CONFIG.DEFAULT_DELAY) => new Promise(resolve => setTimeout(resolve, ms));
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Базовые API функции
const apiRequest = async (endpoint, options = {}) => {
  if (API_CONFIG.USE_MOCK_DATA) {
    await delay();
    return mockRequest(endpoint, options);
  }

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Mock обработчики
const mockRequest = async (endpoint, options = {}) => {
  const method = options.method || 'GET';
  const body = options.body;

  switch (endpoint) {
    // Menu endpoints
    case '/menu':
      return { success: true, data: mockMenuItems };
    
    case '/menu/coffee':
      return { success: true, data: mockMenuItems.filter(item => item.category === 'coffee') };
    
    case '/menu/desserts':
      return { success: true, data: mockMenuItems.filter(item => item.category === 'desserts') };

    // Events endpoints
    case '/events':
      return { success: true, data: mockEvents };
    
    case '/events/register':
      if (method === 'POST') {
        const { eventId, name, email, phone } = body;
        const event = mockEvents.find(e => e.id === eventId);
        
        if (!event) throw new Error('Мероприятие не найдено');
        if (event.registeredUsers.length >= event.maxParticipants) throw new Error('Все места заняты');
        if (event.registeredUsers.some(u => u.email === email)) throw new Error('Email уже зарегистрирован');
        
        event.registeredUsers.push({ name, email, phone });
        return { success: true, message: 'Регистрация прошла успешно!' };
      }
      break;

    // Reviews endpoints
    case '/reviews':
      return { success: true, data: mockReviews.filter(r => r.status === 'approved') };
    
    case '/reviews':
      if (method === 'POST') {
        const { authorName, email, text, rating } = body;
        if (!authorName || !email || !text || !rating) throw new Error('Заполните все поля');
        if (!isValidEmail(email)) throw new Error('Неверный email');
        
        const newReview = {
          id: generateId(),
          authorName,
          email,
          text,
          rating,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'pending'
        };
        
        mockReviews.push(newReview);
        return { success: true, message: 'Отзыв отправлен на модерацию', data: newReview };
      }
      break;

    // Bookings endpoints
    case '/bookings':
      if (method === 'POST') {
        const { name, email, phone, date, time, guests, notes } = body;
        if (!name || !email || !phone || !date || !time || !guests) throw new Error('Заполните все поля');
        if (!isValidEmail(email)) throw new Error('Неверный email');
        
        return {
          success: true,
          message: 'Бронирование подтверждено!',
          data: {
            id: generateId(),
            name, email, phone, date, time, guests, notes,
            status: 'confirmed',
            bookingCode: `BK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
            createdAt: new Date().toISOString()
          }
        };
      }
      return { success: true, data: [] };

    // Contacts endpoints
    case '/contacts':
      if (method === 'GET') {
        return {
          success: true,
          data: {
            address: 'ул. Примерная, д. 123, Москва',
            phone: '+7 (495) 123-45-67',
            email: 'info@bestbookscafe.ru',
            schedule: [
              { days: 'Пн-Пт', hours: '08:00-22:00' },
              { days: 'Сб-Вс', hours: '09:00-23:00' }
            ]
          }
        };
      }
      if (method === 'POST') {
        const { name, email, message } = body;
        if (!name || !email || !message) throw new Error('Заполните все поля');
        if (!isValidEmail(email)) throw new Error('Неверный email');
        
        return { success: true, message: 'Сообщение отправлено успешно!' };
      }
      break;

    default:
      throw new Error(`Unknown endpoint: ${endpoint}`);
  }
};

// Экспортируемые API функции
export const fetchEvents = async () => {
  const response = await apiRequest('/events');
  return response.data || response;
};

export const registerForEvent = async (eventId, registrationData) => {
  const response = await apiRequest('/events/register', {
    method: 'POST',
    body: { eventId, ...registrationData }
  });
  return response;
};

export const fetchMenu = async () => {
  const response = await apiRequest('/menu');
  return response.data || response;
};

export const fetchMenuByCategory = async (category) => {
  const response = await apiRequest(`/menu/${category}`);
  return response.data || response;
};

export const createBooking = async (bookingData) => {
  const response = await apiRequest('/bookings', {
    method: 'POST',
    body: bookingData
  });
  return response;
};

export const fetchBookings = async () => {
  const response = await apiRequest('/bookings');
  return response.data || response;
};

export const fetchReviews = async () => {
  const response = await apiRequest('/reviews');
  return response.data || response;
};

export const createReview = async (reviewData) => {
  const response = await apiRequest('/reviews', {
    method: 'POST',
    body: reviewData
  });
  return response;
};

export const fetchContacts = async () => {
  const response = await apiRequest('/contacts');
  return response.data || response;
};

export const sendContactMessage = async (messageData) => {
  const response = await apiRequest('/contacts', {
    method: 'POST',
    body: messageData
  });
  return response;
};

// Экспорт по умолчанию для обратной совместимости
const api = {
  fetchEvents,
  registerForEvent,
  fetchMenu,
  fetchMenuByCategory,
  createBooking,
  fetchBookings,
  fetchReviews,
  createReview,
  fetchContacts,
  sendContactMessage
};

export default api;