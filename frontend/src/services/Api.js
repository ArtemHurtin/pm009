// Mock данные для демонстрации работы приложения
const mockMenuItems = [
  {
    id: '1',
    name: 'Эспрессо',
    description: 'Классический крепкий кофе из отборных арабских зерен',
    price: 180,
    category: 'coffee',
    isBestseller: true,
    allergens: 'кофеин'
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
  },
  {
    id: '4',
    name: 'Тирамису',
    description: 'Классический итальянский десерт с кофейной пропиткой',
    price: 280,
    category: 'desserts',
    isBestseller: true,
    allergens: 'глютен, лактоза'
  },
  {
    id: '5',
    name: 'Чизкейк Нью-Йорк',
    description: 'Нежный чизкейк с ягодным соусом',
    price: 260,
    category: 'desserts'
  },
  {
    id: '6',
    name: 'Веганский брауни',
    description: 'Шоколадный брауни без продуктов животного происхождения',
    price: 200,
    category: 'desserts',
    isVegan: true
  },
  {
    id: '7',
    name: 'Английский завтрак',
    description: 'Яичница, бекон, фасоль, грибы и тосты',
    price: 350,
    category: 'breakfast',
    allergens: 'глютен, лактоза, яйца'
  },
  {
    id: '8',
    name: 'Сырники',
    description: 'Домашние сырники со сметаной и ягодным джемом',
    price: 280,
    category: 'breakfast',
    isBestseller: true
  },
  {
    id: '9',
    name: '1984',
    description: 'Джордж Оруэлл - антиутопия о тоталитарном обществе',
    price: 450,
    category: 'books',
    author: 'Джордж Оруэлл'
  },
  {
    id: '10',
    name: 'Мастер и Маргарита',
    description: 'Михаил Булгаков - мистический роман о добре и зле',
    price: 420,
    category: 'books',
    author: 'Михаил Булгаков',
    isBestseller: true
  }
];

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

const mockReviews = [
  {
    id: '1',
    authorName: 'Анна',
    text: 'Прекрасное место! Кофе отличный, книги интересные, атмосфера уютная. Обязательно вернусь снова.',
    rating: 5,
    createdAt: '2024-01-15',
    status: 'approved'
  },
  {
    id: '2',
    authorName: 'Михаил',
    text: 'Отличная кофейня для работы. Тихая музыка, удобные столы, быстрый Wi-Fi. Кофе всегда свежий и вкусный.',
    rating: 4,
    createdAt: '2024-01-20',
    status: 'approved'
  },
  {
    id: '3',
    authorName: 'Екатерина',
    text: 'Обожаю их тирамису! А выбор книг просто прекрасный. Провела здесь весь вечер за чтением.',
    rating: 5,
    createdAt: '2024-01-25',
    status: 'approved'
  }
];

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Menu API
export const getMenuItems = async () => {
  await delay(800);
  return mockMenuItems;
};

export const getMenuItemsByCategory = async (category) => {
  await delay(500);
  return mockMenuItems.filter(item => item.category === category);
};

// Bookings API
export const createBooking = async (bookingData) => {
  await delay(1500);
  console.log('Booking created:', bookingData);
  
  // Имитация случайных ошибок (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Ошибка при бронировании. Попробуйте еще раз.');
  }
  
  return { 
    success: true, 
    bookingId: 'BK' + Date.now(),
    message: 'Бронирование подтверждено. Подтверждение отправлено на email.' 
  };
};

// Events API
export const getEvents = async () => {
  await delay(700);
  return mockEvents;
};

export const registerForEvent = async (eventId, registrationData) => {
  await delay(1000);
  console.log('Event registration:', eventId, registrationData);
  
  // Находим событие и увеличиваем счетчик участников
  const event = mockEvents.find(e => e.id === eventId);
  if (event) {
    event.registeredUsers += 1;
  }
  
  return { success: true, message: 'Регистрация прошла успешно!' };
};

// Reviews API
export const getReviews = async () => {
  await delay(600);
  return mockReviews;
};

export const createReview = async (reviewData) => {
  await delay(1200);
  
  const newReview = {
    id: 'RV' + Date.now(),
    ...reviewData,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'pending' // Отзыв ожидает модерации
  };
  
  console.log('Review submitted:', newReview);
  
  // Имитация случайных ошибок (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Ошибка при отправке отзыва. Попробуйте еще раз.');
  }
  
  return { success: true, message: 'Отзыв отправлен на модерацию.' };
};

// Contact API
export const sendContactMessage = async (messageData) => {
  await delay(1000);
  console.log('Contact message:', messageData);
  
  return { success: true, message: 'Сообщение отправлено!' };
};

export default {
  getMenuItems,
  getMenuItemsByCategory,
  createBooking,
  getEvents,
  registerForEvent,
  getReviews,
  createReview,
  sendContactMessage
};