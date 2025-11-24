import React from 'react';
import './ContactsPage.css';

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <div className="container">
        <h1 className="page-title">Контакты</h1>
        <div className="contact-info">
          <p>8-956-123-00-05</p>
          <p>email: Knigi@mail.ru</p>
          <p>г. Тула ул. Тихорецкая 25</p>
          <p>пн, вт, ср, чт, пт: 9:00 - 18:00, сб, вс: 9:00 - 15:00</p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;