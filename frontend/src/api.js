// services/api.js

/**
 * Enhanced API Service for Best Books Cafe
 * Supports both mock data and real backend with smooth switching
 */

// Configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  DEFAULT_DELAY: 500,
  TIMEOUT: 10000,
};

// Error types
const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT',
};

// Custom API Error class
class ApiError extends Error {
  constructor(message, code = ERROR_CODES.SERVER_ERROR, details = null) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Enhanced mock data
const mockData = {
  menuItems: [
    {
      id: '1',
      name: 'Эспрессо',
      description: 'Классический крепкий кофе из отборных арабских зерен',
      price: 180,
      category: 'coffee',
      isBestseller: true,
      allergens: 'кофеин',
      imageUrl: '/images/coffee/espresso.jpg',
      nutritionalInfo: { calories: 5, protein: 0, carbs: 1, fat: 0 },
      available: true
    },
    {
      id: '2',
      name: 'Капучино',
      description: 'Нежный кофе с молочной пенкой и рисунком на поверхности',
      price: 220,
      category: 'coffee',
      isBestseller: true,
      imageUrl: '/images/coffee/cappuccino.jpg',
      nutritionalInfo: { calories: 120, protein: 8, carbs: 12, fat: 4 },
      available: true
    },
    {
      id: '3',
      name: 'Латте с сиропом',
      description: 'Кофе с молоком и выбором сиропа (ваниль, карамель, клен)',
      price: 250,
      category: 'coffee',
      imageUrl: '/images/coffee/latte.jpg',
      nutritionalInfo: { calories: 180, protein: 9, carbs: 25, fat: 6 },
      available: true
    },
    {
      id: '4',
      name: 'Американо',
      description: 'Черный кофе с добавлением горячей воды',
      price: 160,
      category: 'coffee',
      imageUrl: '/images/coffee/americano.jpg',
      nutritionalInfo: { calories: 10, protein: 0, carbs: 2, fat: 0 },
      available: true
    },
    {
      id: '5',
      name: 'Раф кофе',
      description: 'Нежный кофейный напиток со сливками и ванилью',
      price: 280,
      category: 'coffee',
      isBestseller: true,
      imageUrl: '/images/coffee/raf.jpg',
      nutritionalInfo: { calories: 210, protein: 4, carbs: 18, fat: 14 },
      available: true
    },
    {
      id: '6',
      name: 'Тирамису',
      description: 'Классический итальянский десерт с кофейной пропиткой',
      price: 280,
      category: 'desserts',
      isBestseller: true,
      allergens: 'глютен, лактоза',
      imageUrl: '/images/desserts/tiramisu.jpg',
      nutritionalInfo: { calories: 320, protein: 8, carbs: 45, fat: 12 },
      available: true
    },
    {
      id: '7',
      name: 'Чизкейк Нью-Йорк',
      description: 'Нежный чизкейк с ягодным соусом',
      price: 260,
      category: 'desserts',
      imageUrl: '/images/desserts/cheesecake.jpg',
      nutritionalInfo: { calories: 380, protein: 9, carbs: 35, fat: 22 },
      available: true
    },
    {
      id: '8',
      name: 'Веганский брауни',
      description: 'Шоколадный брауни без продуктов животного происхождения',
      price: 200,
      category: 'desserts',
      isVegan: true,
      imageUrl: '/images/desserts/brownie.jpg',
      nutritionalInfo: { calories: 280, protein: 4, carbs: 38, fat: 12 },
      available: true
    },
    {
      id: '9',
      name: 'Морковный торт',
      description: 'Пряный торт с морковью и грецкими орехами',
      price: 240,
      category: 'desserts',
      imageUrl: '/images/desserts/carrot-cake.jpg',
      nutritionalInfo: { calories: 310, protein: 5, carbs: 42, fat: 14 },
      available: true
    },
    {
      id: '10',
      name: 'Английский завтрак',
      description: 'Яичница, бекон, фасоль, грибы и тосты',
      price: 350,
      category: 'breakfast',
      allergens: 'глютен, лактоза, яйца',
      imageUrl: '/images/breakfast/english.jpg',
      nutritionalInfo: { calories: 520, protein: 25, carbs: 45, fat: 28 },
      available: true
    },
    {
      id: '11',
      name: 'Сырники',
      description: 'Домашние сырники со сметаной и ягодным джемом',
      price: 280,
      category: 'breakfast',
      isBestseller: true,
      imageUrl: '/images/breakfast/syrniki.jpg',
      nutritionalInfo: { calories: 380, protein: 18, carbs: 35, fat: 16 },
      available: true
    },
    {
      id: '12',
      name: 'Овсяная каша',
      description: 'Каша с ягодами, орехами и медом',
      price: 220,
      category: 'breakfast',
      isVegan: true,
      imageUrl: '/images/breakfast/oatmeal.jpg',
      nutritionalInfo: { calories: 280, protein: 8, carbs: 45, fat: 9 },
      available: true
    },
    {
      id: '13',
      name: '1984',
      description: 'Джордж Оруэлл - антиутопия о тоталитарном обществе',
      price: 450,
      category: 'books',
      author: 'Джордж Оруэлл',
      isBestseller: true,
      imageUrl: '/images/books/1984.jpg',
      available: true
    },
    {
      id: '14',
      name: 'Мастер и Маргарита',
      description: 'Михаил Булгаков - мистический роман о добре и зле',
      price: 420,
      category: 'books',
      author: 'Михаил Булгаков',
      isBestseller: true,
      imageUrl: '/images/books/master-margarita.jpg',
      available: true
    },
    {
      id: '15',
      name: 'Маленький принц',
      description: 'Антуан де Сент-Экзюпери - философская сказка для взрослых и детей',
      price: 380,
      category: 'books',
      author: 'Антуан де Сент-Экзюпери',
      imageUrl: '/images/books/little-prince.jpg',
      available: true
    },
    {
      id: '16',
      name: 'Преступление и наказание',
      description: 'Федор Достоевский - психологический роман о преступлении и морали',
      price: 400,
      category: 'books',
      author: 'Федор Достоевский',
      imageUrl: '/images/books/crime-punishment.jpg',
      available: true
    }
  ],

  events: [
    {
      id: '1',
      title: 'Творческое занятие «Создание книжного амулета»',
      description: 'Создать оригинальный оберег из бумаги своими руками',
      date: '2024-11-04',
      displayDate: '4 ноября',
      time: '12:00',
      maxParticipants: 30,
      registeredUsers: [
        { name: 'Анна', email: 'anna@mail.com', phone: '+79991234567', registeredAt: '2024-10-20' },
        { name: 'Иван', email: 'ivan@mail.com', phone: '+79991234568', registeredAt: '2024-10-21' }
      ],
      location: 'Кофейня "Книжный дом"',
      price: 0,
      imageUrl: '/images/events/poetry-evening.jpg',
      tags: ['творчество', 'рукоделие', 'бесплатно'],
      status: 'upcoming'
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
        { name: 'Мария', email: 'maria@mail.com', phone: '+79991234569', registeredAt: '2024-10-22' }
      ],
      location: 'Кофейня "Книжный дом"',
      price: 500,
      imageUrl: '/images/events/latte-art.jpg',
      tags: ['рисование', 'творчество'],
      status: 'upcoming'
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
        { name: 'Петр', email: 'petr@mail.com', phone: '+79991234570', registeredAt: '2024-10-19' },
        { name: 'Ольга', email: 'olga@mail.com', phone: '+79991234571', registeredAt: '2024-10-20' },
        { name: 'Сергей', email: 'sergey@mail.com', phone: '+79991234572', registeredAt: '2024-10-21' }
      ],
      location: 'Кофейня "Кофейный дом"',
      price: 0,
      imageUrl: '/images/events/book-club.jpg',
      tags: ['рукоделие', 'мастер-класс', 'бесплатно'],
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Встреча с автором',
      description: 'Встреча с известным современным писателем и обсуждение его новой книги.',
      date: '2024-03-05',
      displayDate: '5 марта',
      time: '19:30',
      maxParticipants: 25,
      registeredUsers: [],
      location: 'Кофейня "Кофейный дом"',
      price: 300,
      imageUrl: '/images/events/author-meeting.jpg',
      tags: ['литература', 'встреча', 'автор'],
      status: 'past'
    }
  ],

  reviews: [
    {
      id: '1',
      authorName: 'Еремей',
      email: 'erya@example.com',
      text: 'Приятное уютное местечко, идеальное для любителей кофе и книг одновременно. Атмосфера здесь спокойная и располагающая к чтению или работе над проектами. Бариста внимательные, готовят вкусный капучино и латте. Единственный минус — немного тесновато внутри, особенно в часы пик. Но в целом рекомендую!',
      rating: 5,
      createdAt: '2024-01-15',
      status: 'approved',
      isFeatured: true,
      verified: true
    },
    {
      id: '2',
      authorName: 'Мирон',
      email: 'mirol@example.com',
      text: 'Посещаю эту кофейню регулярно, потому что обожаю атмосферу книжного магазина с запахом свежезаваренного кофе. Здесь приятно посидеть вечером с чашечкой горячего напитка и любимой книгой. Ассортимент кофе разнообразный, цены доступные. Правда, хотелось бы больше выбора десертов и выпечки. В остальном все отлично!',
      rating: 4,
      createdAt: '2024-01-20',
      status: 'approved',
      verified: true
    },
    {
      id: '3',
      authorName: 'Алексей',
      email: 'eakseksei@example.com',
      text: 'Это моя любимая кофейня в городе! Интерьер выполнен стильно и минималистично, много полок с интересными книгами, создающими особенную атмосферу. Часто проводятся встречи писателей и поэтов, литературные вечера. Напитки вкусные, порции большие. Только одно пожелание — расширить ассортимент чая. Все остальное идеально подходит для тихого отдыха и чтения.',
      rating: 5,
      createdAt: '2024-01-25',
      status: 'approved',
      isFeatured: true,
      verified: true
    },
    {
      id: '4',
      authorName: 'Марина',
      email: 'mary@example.com',
      text: 'Кофейня с уникальным концептом, сочетающим две мои страсти — чтение и хороший кофе. Прекрасное пространство для тех, кому хочется отдохнуть от суеты города и погрузиться в мир литературы. Цены вполне приемлемые, обслуживание быстрое и вежливое. Иногда возникают проблемы с парковкой поблизости, но оно того стоит. Однозначно советую посетить хотя бы раз каждому любителю кофе и книг!',
      rating: 5,
      createdAt: '2024-01-30',
      status: 'approved',
      verified: true
    }
  ],

  bookings: [],
  contactMessages: []
};

// Utility functions
const utils = {
  delay: (ms = API_CONFIG.DEFAULT_DELAY) => 
    new Promise(resolve => setTimeout(resolve, ms)),

  simulateNetworkError: (chance = 0.02) => {
    if (Math.random() < chance) {
      throw new ApiError('Сетевая ошибка. Пожалуйста, попробуйте еще раз.', ERROR_CODES.NETWORK_ERROR);
    }
  },

  withTimeout: (promise, timeout = API_CONFIG.TIMEOUT) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new ApiError('Превышено время ожидания', ERROR_CODES.TIMEOUT)), timeout)
      )
    ]);
  },

  generateId: (prefix = '') => 
    `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`,

  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError('Пожалуйста, введите корректный email', ERROR_CODES.VALIDATION_ERROR);
    }
  },

  validatePhone: (phone) => {
    const phoneRegex = /^\+?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
    if (!phoneRegex.test(phone)) {
      throw new ApiError('Пожалуйста, введите корректный номер телефона', ERROR_CODES.VALIDATION_ERROR);
    }
  },

  validateRequired: (fields, data) => {
    const missingFields = fields.filter(field => !data[field]?.toString().trim());
    if (missingFields.length > 0) {
      throw new ApiError(
        `Пожалуйста, заполните все обязательные поля: ${missingFields.join(', ')}`,
        ERROR_CODES.VALIDATION_ERROR,
        { missingFields }
      );
    }
  },

  formatResponse: (data, message = 'Success', success = true) => ({
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  })
};

// HTTP Client
const httpClient = {
  async request(endpoint, options = {}) {
    try {
      if (API_CONFIG.USE_MOCK_DATA) {
        await utils.delay();
        utils.simulateNetworkError();
        return await this.mockRequest(endpoint, options);
      }

      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
      }

      const response = await utils.withTimeout(fetch(url, config));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP error! status: ${response.status}`,
          ERROR_CODES.SERVER_ERROR,
          { status: response.status, ...errorData }
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error.message || 'Произошла непредвиденная ошибка',
        ERROR_CODES.NETWORK_ERROR,
        { originalError: error.message }
      );
    }
  },

  async mockRequest(endpoint, options = {}) {
    const method = options.method || 'GET';
    const body = options.body || {};

    // Mock handlers
    const handlers = {
      // Menu endpoints
      'GET /menu': () => utils.formatResponse(mockData.menuItems, 'Menu items fetched successfully'),
      'GET /menu/:category': ({ category }) => {
        const items = mockData.menuItems.filter(item => item.category === category && item.available);
        return utils.formatResponse(items, `${category} menu items fetched successfully`);
      },
      'GET /menu/item/:id': ({ id }) => {
        const item = mockData.menuItems.find(item => item.id === id && item.available);
        if (!item) throw new ApiError('Элемент меню не найден', ERROR_CODES.NOT_FOUND);
        return utils.formatResponse(item, 'Menu item fetched successfully');
      },

      // Events endpoints
      'GET /events': () => utils.formatResponse(mockData.events, 'Events fetched successfully'),
      'GET /events/:id': ({ id }) => {
        const event = mockData.events.find(event => event.id === id);
        if (!event) throw new ApiError('Мероприятие не найдено', ERROR_CODES.NOT_FOUND);
        return utils.formatResponse(event, 'Event fetched successfully');
      },
      'GET /events/upcoming': () => {
        const today = new Date().toISOString().split('T')[0];
        const upcomingEvents = mockData.events.filter(event => event.date >= today);
        return utils.formatResponse(upcomingEvents, 'Upcoming events fetched successfully');
      },
      'POST /events/register': (data) => {
        const { eventId, name, email, phone } = data;
        
        utils.validateRequired(['name', 'email', 'phone'], { name, email, phone });
        utils.validateEmail(email);

        const event = mockData.events.find(e => e.id === eventId);
        if (!event) throw new ApiError('Мероприятие не найдено', ERROR_CODES.NOT_FOUND);
        if (event.registeredUsers.length >= event.maxParticipants) {
          throw new ApiError('К сожалению, все места на это мероприятие уже заняты', ERROR_CODES.CONFLICT);
        }

        const isAlreadyRegistered = event.registeredUsers.some(user => user.email === email);
        if (isAlreadyRegistered) {
          throw new ApiError('Вы уже зарегистрированы на это мероприятие', ERROR_CODES.CONFLICT);
        }

        event.registeredUsers.push({
          name, email, phone,
          registeredAt: new Date().toISOString()
        });

        return utils.formatResponse(
          {
            participantsCount: event.registeredUsers.length,
            availableSpots: event.maxParticipants - event.registeredUsers.length,
            eventTitle: event.title
          },
          'Регистрация на мероприятие прошла успешно!'
        );
      },

      // Reviews endpoints
      'GET /reviews': () => {
        const approvedReviews = mockData.reviews.filter(review => review.status === 'approved');
        return utils.formatResponse(approvedReviews, 'Reviews fetched successfully');
      },
      'GET /reviews/featured': () => {
        const featuredReviews = mockData.reviews.filter(review => review.isFeatured && review.status === 'approved');
        return utils.formatResponse(featuredReviews, 'Featured reviews fetched successfully');
      },
      'POST /reviews': (data) => {
        const { authorName, email, text, rating } = data;
        
        utils.validateRequired(['authorName', 'email', 'text', 'rating'], data);
        utils.validateEmail(email);
        
        if (rating < 1 || rating > 5) {
          throw new ApiError('Рейтинг должен быть от 1 до 5', ERROR_CODES.VALIDATION_ERROR);
        }

        const newReview = {
          id: utils.generateId('RV'),
          authorName,
          email,
          text,
          rating,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'pending',
          verified: false
        };

        mockData.reviews.push(newReview);

        return utils.formatResponse(
          newReview,
          'Отзыв отправлен на модерацию. Спасибо за ваш отзыв!'
        );
      },

      // Bookings endpoints
      'GET /bookings': () => utils.formatResponse(mockData.bookings, 'Bookings fetched successfully'),
      'POST /bookings': (data) => {
        const { name, email, phone, date, time, guests, notes } = data;
        
        utils.validateRequired(['name', 'email', 'phone', 'date', 'time', 'guests'], data);
        utils.validateEmail(email);
        utils.validatePhone(phone);

        const newBooking = {
          id: utils.generateId('BK'),
          name,
          email,
          phone,
          date,
          time,
          guests: parseInt(guests),
          notes,
          status: 'confirmed',
          bookingCode: `BK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        mockData.bookings.push(newBooking);

        return utils.formatResponse(
          newBooking,
          'Бронирование подтверждено! Мы отправили подтверждение на вашу почту.'
        );
      },
      'GET /bookings/availability': (data) => {
        // Используем деструктуризацию для явного использования параметров
        const { date, time, guests } = data;
        
        // Используем параметры в логике
        const dateObj = new Date(date);
        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
        const isPeakTime = time >= '18:00' && time <= '21:00';
        
        let availabilityChance = 0.7; // Базовый шанс доступности
        
        // Учитываем факторы
        if (isWeekend) availabilityChance -= 0.2;
        if (isPeakTime) availabilityChance -= 0.3;
        if (guests > 4) availabilityChance -= 0.2;
        
        const isAvailable = Math.random() < Math.max(availabilityChance, 0.1);
        
        return utils.formatResponse({
          isAvailable,
          message: isAvailable 
            ? 'Столик доступен для бронирования' 
            : 'На это время нет свободных столиков. Пожалуйста, выберите другое время.',
          suggestedTimes: isAvailable ? [] : ['18:00', '19:30', '20:00'],
          availableTables: isAvailable ? Math.floor(Math.random() * 5) + 1 : 0,
          factors: {
            isWeekend,
            isPeakTime,
            partySize: guests
          }
        }, 'Availability checked successfully');
      },

      // Contacts endpoints
      'GET /contacts': () => utils.formatResponse({
        address: 'ул. Примерная, д. 123, Москва',
        phone: '+7 (495) 123-45-67',
        email: 'info@bestbookscafe.ru',
        schedule: [
          { days: 'Пн-Пт', hours: '08:00-22:00' },
          { days: 'Сб-Вс', hours: '09:00-23:00' }
        ],
        social: {
          vk: 'https://vk.com/bestbookscafe',
          telegram: 'https://t.me/bestbookscafe',
          instagram: 'https://instagram.com/bestbookscafe'
        }
      }, 'Contact info fetched successfully'),
      
      'POST /contacts': (data) => {
        const { name, email, message } = data;
        
        utils.validateRequired(['name', 'email', 'message'], data);
        utils.validateEmail(email);

        const newMessage = {
          id: utils.generateId('MSG'),
          name,
          email,
          message,
          createdAt: new Date().toISOString(),
          status: 'new'
        };

        mockData.contactMessages.push(newMessage);

        return utils.formatResponse(
          null,
          'Сообщение успешно отправлено! Мы ответим вам в ближайшее время.'
        );
      }
    };

    // Find matching handler
    for (const [pattern, handler] of Object.entries(handlers)) {
      const [patternMethod, patternPath] = pattern.split(' ');
      const pathParams = this.matchPath(patternPath, endpoint);
      
      if (patternMethod === method && pathParams) {
        return handler({ ...pathParams, ...body });
      }
    }

    throw new ApiError(`Маршрут не найден: ${method} ${endpoint}`, ERROR_CODES.NOT_FOUND);
  },

  matchPath(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    
    if (patternParts.length !== pathParts.length) return null;
    
    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const paramName = patternParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  }
};

// API Service functions
export const fetchEvents = async () => {
  const response = await httpClient.request('/events');
  return response.data;
};

export const fetchEvent = async (id) => {
  const response = await httpClient.request(`/events/${id}`);
  return response.data;
};

export const fetchUpcomingEvents = async () => {
  const response = await httpClient.request('/events/upcoming');
  return response.data;
};

export const registerForEvent = async (eventId, registrationData) => {
  const response = await httpClient.request('/events/register', {
    method: 'POST',
    body: { eventId, ...registrationData }
  });
  return response;
};

export const fetchMenu = async () => {
  const response = await httpClient.request('/menu');
  return response.data;
};

export const fetchMenuByCategory = async (category) => {
  const response = await httpClient.request(`/menu/${category}`);
  return response.data;
};

export const fetchMenuItem = async (id) => {
  const response = await httpClient.request(`/menu/item/${id}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await httpClient.request('/bookings', {
    method: 'POST',
    body: bookingData
  });
  return response;
};

export const fetchBookings = async () => {
  const response = await httpClient.request('/bookings');
  return response.data;
};

export const checkAvailability = async (availabilityData) => {
  const response = await httpClient.request('/bookings/availability', {
    method: 'GET',
    body: availabilityData
  });
  return response.data;
};

export const fetchReviews = async () => {
  const response = await httpClient.request('/reviews');
  return response.data;
};

export const fetchFeaturedReviews = async () => {
  const response = await httpClient.request('/reviews/featured');
  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await httpClient.request('/reviews', {
    method: 'POST',
    body: reviewData
  });
  return response;
};

export const fetchContacts = async () => {
  const response = await httpClient.request('/contacts');
  return response.data;
};

export const sendContactMessage = async (messageData) => {
  const response = await httpClient.request('/contacts', {
    method: 'POST',
    body: messageData
  });
  return response;
};

// Admin functions (for future use)
export const updateBookingStatus = async (bookingId, status) => {
  const response = await httpClient.request(`/bookings/${bookingId}`, {
    method: 'PATCH',
    body: { status }
  });
  return response;
};

export const updateReviewStatus = async (reviewId, status) => {
  const response = await httpClient.request(`/reviews/${reviewId}`, {
    method: 'PATCH',
    body: { status }
  });
  return response;
};

// Export API instance for default imports
const api = {
  // Events
  fetchEvents,
  fetchEvent,
  fetchUpcomingEvents,
  registerForEvent,
  
  // Menu
  fetchMenu,
  fetchMenuByCategory,
  fetchMenuItem,
  
  // Bookings
  createBooking,
  fetchBookings,
  checkAvailability,
  updateBookingStatus,
  
  // Reviews
  fetchReviews,
  fetchFeaturedReviews,
  createReview,
  updateReviewStatus,
  
  // Contacts
  fetchContacts,
  sendContactMessage,
  
  // Utility
  isUsingMockData: () => API_CONFIG.USE_MOCK_DATA,
  getBaseUrl: () => API_CONFIG.BASE_URL
};

export default api;