// Конфигурация API
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  DEFAULT_DELAY: 500,
  NETWORK_ERROR_CHANCE: 0.05,
};

// Mock данные
const mockMenuItems = [
  {
    id: '1',
    name: 'Эспрессо',
    description: 'Классический крепкий кофе из отборных арабских зерен',
    price: 180,
    category: 'coffee',
    isBestseller: true,
    allergens: 'кофеин',
    imageUrl: '/images/coffee/espresso.jpg'
  },
  {
    id: '2',
    name: 'Капучино',
    description: 'Нежный кофе с молочной пенкой и рисунком на поверхности',
    price: 220,
    category: 'coffee',
    isBestseller: true,
    imageUrl: '/images/coffee/cappuccino.jpg'
  },
  {
    id: '3',
    name: 'Латте с сиропом',
    description: 'Кофе с молоком и выбором сиропа (ваниль, карамель, клен)',
    price: 250,
    category: 'coffee',
    imageUrl: '/images/coffee/latte.jpg'
  },
  {
    id: '4',
    name: 'Американо',
    description: 'Черный кофе с добавлением горячей воды',
    price: 160,
    category: 'coffee',
    imageUrl: '/images/coffee/americano.jpg'
  },
  {
    id: '5',
    name: 'Раф кофе',
    description: 'Нежный кофейный напиток со сливками и ванилью',
    price: 280,
    category: 'coffee',
    isBestseller: true,
    imageUrl: '/images/coffee/raf.jpg'
  },
  {
    id: '6',
    name: 'Тирамису',
    description: 'Классический итальянский десерт с кофейной пропиткой',
    price: 280,
    category: 'desserts',
    isBestseller: true,
    allergens: 'глютен, лактоза',
    imageUrl: '/images/desserts/tiramisu.jpg'
  },
  {
    id: '7',
    name: 'Чизкейк Нью-Йорк',
    description: 'Нежный чизкейк с ягодным соусом',
    price: 260,
    category: 'desserts',
    imageUrl: '/images/desserts/cheesecake.jpg'
  },
  {
    id: '8',
    name: 'Веганский брауни',
    description: 'Шоколадный брауни без продуктов животного происхождения',
    price: 200,
    category: 'desserts',
    isVegan: true,
    imageUrl: '/images/desserts/brownie.jpg'
  },
  {
    id: '9',
    name: 'Морковный торт',
    description: 'Пряный торт с морковью и грецкими орехами',
    price: 240,
    category: 'desserts',
    imageUrl: '/images/desserts/carrot-cake.jpg'
  },
  {
    id: '10',
    name: 'Английский завтрак',
    description: 'Яичница, бекон, фасоль, грибы и тосты',
    price: 350,
    category: 'breakfast',
    allergens: 'глютен, лактоза, яйца',
    imageUrl: '/images/breakfast/english.jpg'
  },
  {
    id: '11',
    name: 'Сырники',
    description: 'Домашние сырники со сметаной и ягодным джемом',
    price: 280,
    category: 'breakfast',
    isBestseller: true,
    imageUrl: '/images/breakfast/syrniki.jpg'
  },
  {
    id: '12',
    name: 'Овсяная каша',
    description: 'Каша с ягодами, орехами и медом',
    price: 220,
    category: 'breakfast',
    isVegan: true,
    imageUrl: '/images/breakfast/oatmeal.jpg'
  },
  {
    id: '13',
    name: '1984',
    description: 'Джордж Оруэлл - антиутопия о тоталитарном обществе',
    price: 450,
    category: 'books',
    author: 'Джордж Оруэлл',
    imageUrl: '/images/books/1984.jpg'
  },
  {
    id: '14',
    name: 'Мастер и Маргарита',
    description: 'Михаил Булгаков - мистический роман о добре и зле',
    price: 420,
    category: 'books',
    author: 'Михаил Булгаков',
    isBestseller: true,
    imageUrl: '/images/books/master-margarita.jpg'
  },
  {
    id: '15',
    name: 'Маленький принц',
    description: 'Антуан де Сент-Экзюпери - философская сказка для взрослых и детей',
    price: 380,
    category: 'books',
    author: 'Антуан де Сент-Экзюпери',
    imageUrl: '/images/books/little-prince.jpg'
  },
  {
    id: '16',
    name: 'Преступление и наказание',
    description: 'Федор Достоевский - психологический роман о преступлении и морали',
    price: 400,
    category: 'books',
    author: 'Федор Достоевский',
    imageUrl: '/images/books/crime-punishment.jpg'
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
    imageUrl: '/images/events/author-meeting.jpg'
  }
];

const mockReviews = [
  {
    id: '1',
    authorName: 'Еремей',
    email: 'erya@example.com',
    text: 'Приятное уютное местечко, идеальное для любителей кофе и книг одновременно. Атмосфера здесь спокойная и располагающая к чтению или работе над проектами. Бариста внимательные, готовят вкусный капучино и латте. Единственный минус — немного тесновато внутри, особенно в часы пик. Но в целом рекомендую!',
    rating: 5,
    createdAt: '2024-01-15',
    status: 'approved',
    isFeatured: true
  },
  {
    id: '2',
    authorName: 'Мирон',
    email: 'mirol@example.com',
    text: 'Посещаю эту кофейню регулярно, потому что обожаю атмосферу книжного магазина с запахом свежезаваренного кофе. Здесь приятно посидеть вечером с чашечкой горячего напитка и любимой книгой. Ассортимент кофе разнообразный, цены доступные. Правда, хотелось бы больше выбора десертов и выпечки. В остальном все отлично!',
    rating: 4,
    createdAt: '2024-01-20',
    status: 'approved'
  },
  {
    id: '3',
    authorName: 'Алексей',
    email: 'eakseksei@example.com',
    text: 'Это моя любимая кофейня в городе! Интерьер выполнен стильно и минималистично, много полок с интересными книгами, создающими особенную атмосферу. Часто проводятся встречи писателей и поэтов, литературные вечера. Напитки вкусные, порции большие. Только одно пожелание — расширить ассортимент чая. Все остальное идеально подходит для тихого отдыха и чтения.',
    rating: 5,
    createdAt: '2024-01-25',
    status: 'approved',
    isFeatured: true
  },
  {
    id: '4',
    authorName: 'Марина',
    email: 'mary@example.com',
    text: 'Кофейня с уникальным концептом, сочетающим две мои страсти — чтение и хороший кофе. Прекрасное пространство для тех, кому хочется отдохнуть от суеты города и погрузиться в мир литературы. Цены вполне приемлемые, обслуживание быстрое и вежливое. Иногда возникают проблемы с парковкой поблизости, но оно того стоит. Однозначно советую посетить хотя бы раз каждому любителю кофе и книг!',
    rating: 5,
    createdAt: '2024-01-30',
    status: 'approved'
  }
];

// Утилиты
const delay = (ms = API_CONFIG.DEFAULT_DELAY) => new Promise(resolve => setTimeout(resolve, ms));

const simulateNetworkError = (chance = API_CONFIG.NETWORK_ERROR_CHANCE) => {
  if (Math.random() < chance) {
    throw new Error('Сетевая ошибка. Пожалуйста, попробуйте еще раз.');
  }
};

const generateId = (prefix = '') => {
  return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[78][-(]?\d{3}[)-]?\d{3}-?\d{2}-?\d{2}$/;
  return phoneRegex.test(phone);
};

// Menu API
export const getMenuItems = async () => {
  try {
    await delay(800);
    simulateNetworkError(0.02);
    return [...mockMenuItems];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const getMenuItemsByCategory = async (category) => {
  try {
    await delay(500);
    const filteredItems = mockMenuItems.filter(item => item.category === category);
    return filteredItems;
  } catch (error) {
    console.error(`Error fetching menu items for category ${category}:`, error);
    throw error;
  }
};

export const getMenuItem = async (id) => {
  try {
    await delay(300);
    const item = mockMenuItems.find(item => item.id === id);
    if (!item) {
      throw new Error('Элемент меню не найден');
    }
    return item;
  } catch (error) {
    console.error(`Error fetching menu item ${id}:`, error);
    throw error;
  }
};

// Bookings API
export const createBooking = async (bookingData) => {
  try {
    await delay(1500);
    simulateNetworkError(0.1);

    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      throw new Error('Пожалуйста, заполните все обязательные поля');
    }

    if (!isValidEmail(bookingData.email)) {
      throw new Error('Пожалуйста, введите корректный email');
    }

    if (!isValidPhone(bookingData.phone)) {
      throw new Error('Пожалуйста, введите корректный номер телефона');
    }

    const booking = {
      id: generateId('BK'),
      ...bookingData,
      status: 'confirmed',
      bookingCode: `BK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Бронирование подтверждено! Мы отправили подтверждение на вашу почту.',
      data: booking,
      bookingCode: booking.bookingCode
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBookings = async () => {
  try {
    await delay(800);
    return [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const checkAvailability = async (date, time, guests) => {
  try {
    await delay(600);
    const isAvailable = Math.random() > 0.3;
    return {
      isAvailable,
      message: isAvailable 
        ? 'Столик доступен для бронирования' 
        : 'На это время нет свободных столиков. Пожалуйста, выберите другое время.',
      suggestedTimes: isAvailable ? [] : ['18:00', '19:30', '20:00']
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

// Events API
export const getEvents = async () => {
  try {
    await delay(700);
    return [...mockEvents];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    await delay(400);
    const event = mockEvents.find(event => event.id === id);
    if (!event) {
      throw new Error('Мероприятие не найдено');
    }
    return event;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

export const getUpcomingEvents = async () => {
  try {
    await delay(500);
    const today = new Date().toISOString().split('T')[0];
    return mockEvents.filter(event => event.date >= today);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

export const registerForEvent = async (eventId, registrationData) => {
  try {
    await delay(1200);

    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      throw new Error('Пожалуйста, заполните все обязательные поля');
    }

    if (!isValidEmail(registrationData.email)) {
      throw new Error('Пожалуйста, введите корректный email');
    }

    const event = mockEvents.find(e => e.id === eventId);
    if (!event) {
      throw new Error('Мероприятие не найдено');
    }

    if (event.registeredUsers.length >= event.maxParticipants) {
      throw new Error('К сожалению, все места на это мероприятие уже заняты');
    }

    const isAlreadyRegistered = event.registeredUsers.some(
      user => user.email === registrationData.email
    );

    if (isAlreadyRegistered) {
      throw new Error('Вы уже зарегистрированы на это мероприятие');
    }

    event.registeredUsers.push({
      ...registrationData,
      registeredAt: new Date().toISOString()
    });

    return {
      success: true,
      message: 'Регистрация на мероприятие прошла успешно!',
      participantsCount: event.registeredUsers.length,
      availableSpots: event.maxParticipants - event.registeredUsers.length,
      eventTitle: event.title
    };
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    await delay(1000);
    const newEvent = {
      id: generateId('EV'),
      ...eventData,
      registeredUsers: [],
      createdAt: new Date().toISOString()
    };
    mockEvents.push(newEvent);
    return newEvent;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Reviews API
export const getReviews = async () => {
  try {
    await delay(600);
    return [...mockReviews];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const getApprovedReviews = async () => {
  try {
    await delay(500);
    return mockReviews.filter(review => review.status === 'approved');
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    throw error;
  }
};

export const getFeaturedReviews = async () => {
  try {
    await delay(400);
    return mockReviews.filter(review => review.isFeatured);
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    await delay(1000);
    simulateNetworkError(0.05);

    if (!reviewData.authorName || !reviewData.email || !reviewData.text) {
      throw new Error('Пожалуйста, заполните все обязательные поля');
    }

    if (!isValidEmail(reviewData.email)) {
      throw new Error('Пожалуйста, введите корректный email');
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Рейтинг должен быть от 1 до 5');
    }

    const newReview = {
      id: generateId('RV'),
      ...reviewData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    mockReviews.push(newReview);

    return {
      success: true,
      message: 'Отзыв отправлен на модерацию. Спасибо за ваш отзыв!',
      data: newReview
    };
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Contact API
export const sendContactMessage = async (messageData) => {
  try {
    await delay(800);
    simulateNetworkError(0.05);

    if (!messageData.name || !messageData.email || !messageData.message) {
      throw new Error('Пожалуйста, заполните все обязательные поля');
    }

    if (!isValidEmail(messageData.email)) {
      throw new Error('Пожалуйста, введите корректный email');
    }

    return {
      success: true,
      message: 'Сообщение успешно отправлено! Мы ответим вам в ближайшее время.'
    };
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    await delay(700);
    return [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }
};

// Admin API functions
export const updateBookingStatus = async (bookingId, status) => {
  try {
    await delay(600);
    return { success: true, message: `Статус бронирования изменен на "${status}"` };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const updateReviewStatus = async (reviewId, status) => {
  try {
    await delay(500);
    const review = mockReviews.find(r => r.id === reviewId);
    if (review) {
      review.status = status;
    }
    return { success: true, message: `Статус отзыва изменен на "${status}"` };
  } catch (error) {
    console.error('Error updating review status:', error);
    throw error;
  }
};

// Создаем именованный объект для экспорта
const api = {
  getMenuItems,
  getMenuItemsByCategory,
  getMenuItem,
  createBooking,
  getBookings,
  checkAvailability,
  updateBookingStatus,
  getEvents,
  getEvent,
  getUpcomingEvents,
  registerForEvent,
  createEvent,
  getReviews,
  getApprovedReviews,
  getFeaturedReviews,
  createReview,
  updateReviewStatus,
  sendContactMessage,
  getContactMessages
};

// Экспортируем именованный объект по умолчанию
export default api;