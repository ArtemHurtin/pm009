import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Homepage/HomePage';
import MenuPage from './pages/MenuPage/MenuPage';
import BookingPage from './pages/BookingPage/BookingPage';
import EventsPage from './pages/EventsPage/EventsPage';
import BlogPage from './pages/BlogPage/BlogPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;