import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.com", // Serveur SMTP
      port: "587", // Port
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Email
        pass: process.env.EMAIL_PASS, // Mot de passe
      },
      debug: true, // Active le mode débogage
      logger: true, // Journalise la connexion SMTP
    });

    try {
      // Envoi de l'email
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "dmardovitch@gmail.com", // Votre adresse email
        subject: "Nouveau message du site portfolio",
        text: message,
      });

      res.status(200).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Méthode ${req.method} non prise en charge`);
  }
}
