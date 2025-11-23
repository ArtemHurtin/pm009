// Базовый URL для API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
    date: '4 ноября',
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
    date: '6 ноября',
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
    date: '7 ноября ',
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
    authorName: 'Анна',
    email: 'anna@example.com',
    text: 'Прекрасное место! Кофе отличный, книги интересные, атмосфера уютная. Обязательно вернусь снова.',
    rating: 5,
    createdAt: '2024-01-15',
    status: 'approved',
    isFeatured: true
  },
  {
    id: '2',
    authorName: 'Михаил',
    email: 'mikhail@example.com',
    text: 'Отличная кофейня для работы. Тихая музыка, удобные столы, быстрый Wi-Fi. Кофе всегда свежий и вкусный.',
    rating: 4,
    createdAt: '2024-01-20',
    status: 'approved'
  },
  {
    id: '3',
    authorName: 'Екатерина',
    email: 'ekaterina@example.com',
    text: 'Обожаю их тирамису! А выбор книг просто прекрасный. Провела здесь весь вечер за чтением.',
    rating: 5,
    createdAt: '2024-01-25',
    status: 'approved',
    isFeatured: true
  },
  {
    id: '4',
    authorName: 'Дмитрий',
    email: 'dmitry@example.com',
    text: 'Уютное место с прекрасной атмосферой. Персонал очень внимательный и дружелюбный.',
    rating: 5,
    createdAt: '2024-01-30',
    status: 'approved'
  },
  {
    id: '5',
    authorName: 'Светлана',
    email: 'svetlana@example.com',
    text: 'Замечательная кофейня! Особенно понравились вечера поэзии - очень душевно и интересно.',
    rating: 5,
    createdAt: '2024-02-05',
    status: 'approved'
  }
];

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Общая функция для API запросов
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    console.log(`Making API request to: ${url}`, config);
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Menu API
export const getMenuItems = async () => {
  try {
    // Реальный API вызов (раскомментировать когда бэкенд готов)
    // const response = await apiRequest('/menu');
    // return response.data;
    
    await delay(800);
    return mockMenuItems;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const getMenuItemsByCategory = async (category) => {
  try {
    // Реальный API вызов
    // const response = await apiRequest(`/menu/category/${category}`);
    // return response.data;
    
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
    // Реальный API вызов
    // const response = await apiRequest(`/menu/${id}`);
    // return response.data;
    
    await delay(300);
    const item = mockMenuItems.find(item => item.id === id);
    if (!item) {
      throw new Error('Menu item not found');
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
    // Реальный API вызов
    // const response = await apiRequest('/bookings', {
    //   method: 'POST',
    //   body: bookingData
    // });
    // return response;
    
    await delay(1500);
    console.log('Booking data received:', bookingData);
    
    // Имитация случайных ошибок (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Ошибка при бронировании. Попробуйте еще раз.');
    }
    
    const booking = {
      id: 'BK' + Date.now(),
      ...bookingData,
      status: 'confirmed',
      bookingCode: 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
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
    // Реальный API вызов (для админки)
    // const response = await apiRequest('/bookings');
    // return response.data;
    
    await delay(800);
    return [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const checkAvailability = async (date, time, guests) => {
  try {
    // Реальный API вызов
    // const response = await apiRequest(`/bookings/check-availability?date=${date}&time=${time}&guests=${guests}`);
    // return response.data;
    
    await delay(600);
    
    // Имитация проверки доступности
    const isAvailable = Math.random() > 0.3; // 70% chance available
    
    return {
      isAvailable,
      message: isAvailable 
        ? 'Столик доступен для бронирования' 
        : 'На это время нет свободных столиков. Пожалуйста, выберите другое время.'
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

// Events API
export const getEvents = async () => {
  try {
    // Реальный API вызов
    // const response = await apiRequest('/events');
    // return response.data;
    
    await delay(700);
    return mockEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    // Реальный API вызов
    // const response = await apiRequest(`/events/${id}`);
    // return response.data;
    
    await delay(400);
    const event = mockEvents.find(event => event.id === id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

export const getUpcomingEvents = async () => {
  try {
    // Реальный API вызов
    // const response = await apiRequest('/events/upcoming');
    // return response.data;
    
    await delay(500);
    const today = new Date();
    return mockEvents.filter(event => new Date(event.date) >= today);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

export const registerForEvent = async (eventId, registrationData) => {
  try {
    // Реальный API вызов
    // const response = await apiRequest(`/events/${eventId}/register`, {
    //   method: 'POST',
    //   body: registrationData
    // });
    // return response;
    
    await delay(1200);
    console.log('Event registration:', eventId, registrationData);
    
    // Находим событие
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) {
      throw new Error('Мероприятие не найдено');
    }
    
    // Проверяем доступность мест
    if (event.registeredUsers.length >= event.maxParticipants) {
      throw new Error('К сожалению, все места на это мероприятие уже заняты');
    }
    
    // Проверяем, не зарегистрирован ли уже пользователь
    const isAlreadyRegistered = event.registeredUsers.some(
      user => user.email === registrationData.email
    );
    
    if (isAlreadyRegistered) {
      throw new Error('Вы уже зарегистрированы на это мероприятие');
    }
    
    // Добавляем участника
    event.registeredUsers.push({
      ...registrationData,
      registeredAt: new Date().toISOString()
    });
    
    return {
      success: true,
      message: 'Регистрация на мероприятие прошла успешно!',
      participantsCount: event.registeredUsers.length,
      availableSpots: event.maxParticipants - event.registeredUsers.length
    };
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    // Реальный API вызов (для админки)
    // const response = await apiRequest('/events', {
    //   method: 'POST',
    //   body: eventData
    // });
    // return response.data;
    
    await delay(1000);
    const newEvent = {
      id: 'EV' + Date.now(),
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
    // Реальный API вызов
    // const response = await apiRequest('/reviews');
    // return response.data;
    
    await delay(600);
    return mockReviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const getApprovedReviews = async () => {
  try {
    // Реальный API вызов
    // const response = await apiRequest('/reviews/approved');
    // return response.data;
    
    await delay(500);
    return mockReviews.filter(review => review.status === 'approved');
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    throw error;
  }
};

export const getFeaturedReviews = async () => {
  try {
    // Реальный API вызов
    // const response = await apiRequest('/reviews/featured');
    // return response.data;
    
    await delay(400);
    return mockReviews.filter(review => review.isFeatured);
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    // Реальный API вызов
    // const response = await apiRequest('/reviews', {
    //   method: 'POST',
    //   body: reviewData
    // });
    // return response;
    
    await delay(1000);
    console.log('Review data received:', reviewData);
    
    // Имитация случайных ошибок (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Ошибка при отправке отзыва. Попробуйте еще раз.');
    }
    
    const newReview = {
      id: 'RV' + Date.now(),
      ...reviewData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending' // Отзыв ожидает модерации
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
    // Реальный API вызов
    // const response = await apiRequest('/contacts', {
    //   method: 'POST',
    //   body: messageData
    // });
    // return response;
    
    await delay(800);
    console.log('Contact message received:', messageData);
    
    // Имитация случайных ошибок (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Ошибка при отправке сообщения. Попробуйте еще раз.');
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
    // Реальный API вызов (для админки)
    // const response = await apiRequest('/contacts');
    // return response.data;
    
    await delay(700);
    return [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }
};

// Admin API functions (for future use)
export const updateBookingStatus = async (bookingId, status) => {
  try {
    // Реальный API вызов
    // const response = await apiRequest(`/bookings/${bookingId}/status`, {
    //   method: 'PUT',
    //   body: { status }
    // });
    // return response.data;
    
    await delay(600);
    return { success: true, message: `Статус бронирования изменен на "${status}"` };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const updateReviewStatus = async (reviewId, status) => {
  try {
    // Реальный API вызов
    // const response = await apiRequest(`/reviews/${reviewId}/status`, {
    //   method: 'PUT',
    //   body: { status }
    // });
    // return response.data;
    
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

// Экспорт всех функций
export default {
  // Menu
  getMenuItems,
  getMenuItemsByCategory,
  getMenuItem,
  
  // Bookings
  createBooking,
  getBookings,
  checkAvailability,
  updateBookingStatus,
  
  // Events
  getEvents,
  getEvent,
  getUpcomingEvents,
  registerForEvent,
  createEvent,
  
  // Reviews
  getReviews,
  getApprovedReviews,
  getFeaturedReviews,
  createReview,
  updateReviewStatus,
  
  // Contact
  sendContactMessage,
  getContactMessages
};