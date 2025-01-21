import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

        // Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.com", // SMTP-server
            port: '465', // SSL port
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER, // email
                pass: process.env.EMAIL_PASS, // password
            },
            debug: true, // Включает отладочный режим
            logger: true, // Логирует SMTP-соединение
        });

        try {
            // Get mail
            await transporter.sendMail({
                from: `"${name}" <${email}>`,
                to: "dmardovitch@gmail.com", // Your email address
                subject: "Nouveau message du site portfolio",
                text: message,
            });

            res.status(200).json({ message: "Message envoyé!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur lors de l'envoi d'un message" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Méthode ${req.method} sans soutien`);
    }
}
