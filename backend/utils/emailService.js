const nodemailer = require('nodemailer');

// Создание транспортера для отправки email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Отправка подтверждения бронирования
exports.sendBookingConfirmation = async (booking) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Кофейня Лучшие книги" <${process.env.SMTP_FROM}>`,
      to: booking.email,
      subject: 'Подтверждение бронирования столика',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">Подтверждение бронирования</h2>
          <p>Уважаемый(ая) ${booking.customerName},</p>
          <p>Ваше бронирование в кофейне "Лучшие книги" подтверждено!</p>
          
          <div style="background: #f9f5f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #654321;">Детали бронирования:</h3>
            <p><strong>Код бронирования:</strong> ${booking.bookingCode}</p>
            <p><strong>Дата:</strong> ${new Date(booking.date).toLocaleDateString('ru-RU')}</p>
            <p><strong>Время:</strong> ${booking.time}</p>
            <p><strong>Количество гостей:</strong> ${booking.guestsCount}</p>
            ${booking.specialRequests ? `<p><strong>Особые пожелания:</strong> ${booking.specialRequests}</p>` : ''}
          </div>
          
          <p>Ждём вас в нашей кофейне!</p>
          <p>С уважением,<br>Команда кофейни "Лучшие книги"</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent to:', booking.email);
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
  }
};

// Отправка уведомления о новом сообщении
exports.sendNewMessageNotification = async (message) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Кофейня Лучшие книги" <${process.env.SMTP_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Новое сообщение с сайта',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">Новое сообщение с сайта</h2>
          
          <div style="background: #f9f5f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>От:</strong> ${message.name}</p>
            <p><strong>Email:</strong> ${message.email}</p>
            <p><strong>Тема:</strong> ${message.subject}</p>
            <p><strong>Сообщение:</strong></p>
            <p>${message.message}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('New message notification sent to admin');
  } catch (error) {
    console.error('Error sending new message notification:', error);
  }
};