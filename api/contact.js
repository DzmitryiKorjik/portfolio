import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        console.log('Received data:', { name, email, message });

        // Vérifier les données du formulaire
        console.log('Form data received:', req.body);

        // Nodemailer configuration
        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.com', // SMTP-server Yandex
            port: 587, // 465 Port TLS
            secure: false, // true
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        try {
            // Envoi de l'email
            await transporter.sendMail({
                from: `"${name}" <${email}>`,
                to: 'dzmitryi@yandex.com',
                subject: 'Nouveau message du site',
                text: message,
            });

            // Vérifier si le message a bien été envoyé
            console.log('Message sent successfully');
            res.status(200).json({ message: 'Message envoyé avec succès!' });
        } catch (error) {
            console.error('Error during sending message:', error);
            res.status(500).json({
                error: "Erreur lors de l'envoi du message",
            });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
