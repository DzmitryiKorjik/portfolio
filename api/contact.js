import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Vérifie si la méthode HTTP est POST
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Validation du champ "nom"
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({
                error: 'Le nom est obligatoire et doit être une chaîne de caractères.',
            });
        }

        // Validation du champ "email" avec une expression régulière pour vérifier le format
        if (
            !email ||
            typeof email !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return res
                .status(400)
                .json({ error: 'Saisir une adresse électronique valide.' });
        }

        // Validation du champ "message"
        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res.status(400).json({
                error: 'Le message est obligatoire et doit être une chaîne de caractères.',
            });
        }

        // Affiche les données reçues dans la console (utile pour le débogage)
        console.log('Received data:', { name, email, message });

        // Configuration de Nodemailer pour utiliser le serveur SMTP de Yandex
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // SMTP-server Gmail
            port: 587, // 465 Port TLS
            secure: false, // true
            auth: {
                user: process.env.EMAIL_USER, // Nom d'utilisateur (provenant des variables d'environnement)
                pass: process.env.EMAIL_PASS, // Mot de passe (provenant des variables d'environnement)
            },
        });

        try {
            // Envoi de l'email avec les informations fournies
            const info = await transporter.sendMail({
                from: `"${name}" <${email}>`, // Expéditeur
                to: 'dzmitryi@yandex.com', // Destinataire
                subject: 'Nouveau message du site', // Sujet du message
                text: message, // Contenu en texte brut
            });

            // Affiche l'ID du message envoyé (utile pour le suivi)
            console.log('Message sent successfully:', info.messageId);

            // Réponse en cas de succès
            res.status(200).json({ message: 'Message envoyé avec succès!' });
        } catch (error) {
            // Affiche l'erreur dans la console
            console.error('Error during sending message:', error);

            // Vérifie si une réponse spécifique est fournie par le serveur SMTP
            if (error.response && error.response.body) {
                res.status(500).json({
                    error: `Erreur de serveur: ${error.response.body}`,
                });
            } else {
                // Message générique en cas d'échec
                res.status(500).json({
                    error: `L'envoi du message a échoué. Vérifiez les paramètres SMTP.`,
                });
            }
        }
    } else {
        // Réponse en cas d'utilisation d'une méthode HTTP non autorisée
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
