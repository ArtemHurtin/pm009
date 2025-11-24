import React, { useState } from 'react';
import './ContactForm.css'; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    alert('Спасибо за ваше сообщение!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Свяжитесь с нами</h2>
      <label>
        Имя:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Электронная почта:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Сообщение:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default ContactForm;
