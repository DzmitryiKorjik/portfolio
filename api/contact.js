const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Для разрешения CORS (если фронтенд и бэкенд на разных портах)
app.use(bodyParser.json()); // Для обработки JSON в теле запросов

// Настройка маршрута для отправки сообщения
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Настройка транспортира Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.com', // Параметры для Yandex SMTP
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER, // Вставь свой email
            pass: process.env.EMAIL_PASS, // Вставь свой пароль
        },
    });

    try {
        // Отправка email
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: 'dmardovitch@gmail.com', // Твой email, на который будут приходить сообщения
            subject: 'Новый запрос с сайта',
            text: message,
        });

        res.status(200).json({ message: 'Сообщение отправлено успешно!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при отправке сообщения' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
});
