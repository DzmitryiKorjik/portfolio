import nodemailer from 'nodemailer';

// Gestionnaire d'API pour gérer l'envoi d'e-mails
export default async function handler(req, res) {
  // Vérification que la méthode utilisée est POST
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io', // Hôte SMTP fourni par Mailtrap
      port: 587, // Port SMTP (par défaut recommandé)
      auth: {
        user: 'smtp@mailtrap.io', // Nom d'utilisateur SMTP
        pass: '1db20f0ed2d604bf169e98bc84618c21', // Mot de passe SMTP
      },
    });

    // Configuration des options de l'email
    const mailOptions = {
      from: email, // Adresse e-mail de l'expéditeur (celle saisie par l'utilisateur)
      to: 'dmardovitch@gmail.com', // Votre adresse e-mail pour recevoir les messages
      subject: 'Nouveau message', // Objet de l'e-mail
      text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`, // Contenu de l'e-mail
    };

    try {
      // Tentative d'envoi de l'e-mail
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Le message a été envoyé avec succès !' }); // Succès
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' }); // Erreur interne
    }
  } else {
    // Si la méthode HTTP n'est pas POST
    res.setHeader('Allow', ['POST']); // Autorise uniquement POST
    res.status(405).json({ message: 'Méthode non autorisée.' }); // Erreur 405 : méthode non autorisée
  }
}
