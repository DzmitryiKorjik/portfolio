<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Votre email
    $to = "dmardovitch@gmail.com"; 
    $subject = "Nouveau message";

    // Texte de la lettre
    $body = "Nom: $name\nEmail: $email\message:\n$message";

    // Rubriques
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envoi
    if (mail($to, $subject, $body, $headers)) {
        echo "Le message a été envoyé avec succès !";
    } else {
        echo "Erreur lors de l'envoi d'un message.";
    }
} else {
    echo "Méthode d'envoi incorrecte.";
}
?>
