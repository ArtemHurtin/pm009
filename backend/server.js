const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bestbooks-cafe', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Using mock data instead');
  }
};

connectDB();

// MongoDB Models
const MenuItem = mongoose.model('MenuItem', new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  available: { type: Boolean, default: true }
}));

const Booking = mongoose.model('Booking', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  guests: Number,
  notes: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

const Event = mongoose.model('Event', new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  displayDate: String,
  time: String,
  maxParticipants: Number,
  registeredUsers: [{
    name: String,
    email: String,
    phone: String,
    registeredAt: { type: Date, default: Date.now }
  }],
  location: String,
  price: Number,
  imageUrl: String
}));

const Review = mongoose.model('Review', new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
}));

// Routes
// Menu Routes
app.get('/api/menu', async (req, res) => {
  try {
    let menuItems;
    if (mongoose.connection.readyState === 1) {
      menuItems = await MenuItem.find({ available: true });
    } else {
      // Mock data if DB not connected
      menuItems = [
        {
          id: 1,
          name: 'Эспрессо',
          category: 'coffee',
          price: 180,
          description: 'Классический крепкий кофе',
          image: '/images/menu/espresso.jpg'
        },
        {
          id: 2,
          name: 'Капучино',
          category: 'coffee',
          price: 220,
          description: 'Кофе с молочной пенкой',
          image: '/images/menu/cappuccino.jpg'
        }
      ];
    }
    res.json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/menu/:category', async (req, res) => {
  try {
    const category = req.params.category;
    let menuItems;
    
    if (mongoose.connection.readyState === 1) {
      menuItems = await MenuItem.find({ category, available: true });
    } else {
      menuItems = [
        {
          id: 1,
          name: 'Эспрессо',
          category: 'coffee',
          price: 180,
          description: 'Классический крепкий кофе',
          image: '/images/menu/espresso.jpg'
        }
      ].filter(item => item.category === category);
    }
    
    res.json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings Routes
app.get('/api/bookings', async (req, res) => {
  try {
    let bookings;
    if (mongoose.connection.readyState === 1) {
      bookings = await Booking.find().sort({ createdAt: -1 });
    } else {
      bookings = [];
    }
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, notes } = req.body;
    
    let newBooking;
    if (mongoose.connection.readyState === 1) {
      newBooking = new Booking({
        name, email, phone, date, time, guests, notes
      });
      await newBooking.save();
    } else {
      newBooking = {
        id: Date.now().toString(),
        name, email, phone, date, time, guests, notes,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
    }
    
    res.json({
      success: true,
      message: 'Бронирование создано успешно!',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Events Routes
app.get('/api/events', async (req, res) => {
  try {
    let events;
    if (mongoose.connection.readyState === 1) {
      events = await Event.find();
    } else {
      events = [
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
        }
      ];
    }
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/events/register', async (req, res) => {
  try {
    const { eventId, name, email, phone } = req.body;
    
    if (mongoose.connection.readyState === 1) {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Мероприятие не найдено'
        });
      }
      
      if (event.registeredUsers.length >= event.maxParticipants) {
        return res.status(400).json({
          success: false,
          message: 'Все места уже заняты'
        });
      }
      
      const existingRegistration = event.registeredUsers.find(
        user => user.email === email
      );
      
      if (existingRegistration) {
        return res.status(400).json({
          success: false,
          message: 'Пользователь с таким email уже зарегистрирован'
        });
      }
      
      event.registeredUsers.push({ name, email, phone });
      await event.save();
    }
    
    res.json({
      success: true,
      message: 'Регистрация прошла успешно!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reviews Routes
app.get('/api/reviews', async (req, res) => {
  try {
    let reviews;
    if (mongoose.connection.readyState === 1) {
      reviews = await Review.find({ approved: true }).sort({ date: -1 });
    } else {
      reviews = [
        {
          id: 1,
          name: 'Анна',
          rating: 5,
          comment: 'Прекрасное место! Отличный кофе и уютная атмосфера.',
          date: '2024-10-15',
          approved: true
        }
      ];
    }
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    
    let newReview;
    if (mongoose.connection.readyState === 1) {
      newReview = new Review({
        name, rating, comment
      });
      await newReview.save();
    } else {
      newReview = {
        id: Date.now(),
        name, rating, comment,
        date: new Date().toISOString().split('T')[0],
        approved: false
      };
    }
    
    res.json({
      success: true,
      message: 'Отзыв отправлен на модерацию!',
      data: newReview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contacts Routes
app.get('/api/contacts', (req, res) => {
  const contacts = {
    address: 'г. Тула, ул. Тихорецкая 25',
    phone: '8-956-123-00-05',
    email: 'Knigi@mail.ru',
    schedule: [
      { days: 'пн, вт, ср, чт, пт', hours: '9:00 - 18:00' },
      { days: 'сб, вс', hours: '9:00 - 15:00' }
    ],
    social: {
      vk: 'https://vk.com/bestbookscafe',
      telegram: 'https://t.me/bestbookscafe',
    }
  };
  
  res.json({ success: true, data: contacts });
});

app.post('/api/contacts', (req, res) => {
  const { name, email, phone, message } = req.body;
  
  console.log('Новое сообщение от:', { name, email, phone, message });
  
  res.json({
    success: true,
    message: 'Сообщение отправлено успешно! Мы свяжемся с вами в ближайшее время.'
  });
});

// Initialize sample data
const initializeSampleData = async () => {
  if (mongoose.connection.readyState !== 1) return;
  
  const menuCount = await MenuItem.countDocuments();
  if (menuCount === 0) {
    await MenuItem.insertMany([
      {
        name: 'Эспрессо',
        category: 'coffee',
        price: 180,
        description: 'Классический крепкий кофе',
        image: '/images/menu/espresso.jpg'
      },
      {
        name: 'Капучино',
        category: 'coffee',
        price: 220,
        description: 'Кофе с молочной пенкой',
        image: '/images/menu/cappuccino.jpg'
      },
      {
        name: 'Латте',
        category: 'coffee',
        price: 240,
        description: 'Нежный кофе с большим количеством молока',
        image: '/images/menu/latte.jpg'
      },
      {
        name: 'Чизкейк',
        category: 'desserts',
        price: 280,
        description: 'Нежный чизкейк с ягодным соусом',
        image: '/images/menu/cheesecake.jpg'
      }
    ]);
    console.log('✅ Sample menu data initialized');
  }
  
  const eventsCount = await Event.countDocuments();
  if (eventsCount === 0) {
    await Event.insertMany([
      {
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
      }
    ]);
    console.log('✅ Sample events data initialized');
  }
};

// Call initialize after DB connection
mongoose.connection.once('open', () => {
  initializeSampleData();
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Best Books Cafe API',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    endpoints: {
      menu: '/api/menu',
      bookings: '/api/bookings',
      events: '/api/events',
      reviews: '/api/reviews',
      contacts: '/api/contacts'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Best Books Cafe API is ready!`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV}`);
  console.log(`🗄️  MongoDB: ${mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'}`);
});