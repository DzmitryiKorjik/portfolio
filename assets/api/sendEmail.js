// Импортируем библиотеку nodemailer для отправки email
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Создаем транспортер для отправки почты (для Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Укажите ваш email
        pass: 'your-email-password', // Укажите ваш пароль
      },
    });

    // Настроим письмо
    const mailOptions = {
      from: email,  // Отправитель
      to: 'dmardovitch@gmail.com',  // Ваш email
      subject: 'Nouveau message',   // Тема письма
      text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,  // Тело письма
    };

    try {
      // Отправляем письмо
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Le message a été envoyé avec succès !' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'envoi d\'un message.', error });
    }
  } else {
    res.status(405).json({ message: 'Méthode d\'envoi incorrecte.' });
  }
}
