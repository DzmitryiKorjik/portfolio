import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Настройка SMTP (используйте свой сервер или бесплатный сервис, например, Mailtrap для тестирования)
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io', // Замените на ваш SMTP-хост
      port: 587, // Или другой порт, предоставленный вашим провайдером
      auth: {
        user: 'smtp@mailtrap.io', // Логин SMTP
        pass: '1db20f0ed2d604bf169e98bc84618c21', // Пароль SMTP
      },
    });

    // Настройка письма
    const mailOptions = {
      from: email, // Отправитель (указывается пользовательский email)
      to: 'dmardovitch@gmail.com', // Ваш email для получения сообщений
      subject: 'Nouveau message',
      text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
      // Попытка отправки письма
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Le message a été envoyé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' });
    }
  } else {
    // Если используется метод, отличный от POST
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}
