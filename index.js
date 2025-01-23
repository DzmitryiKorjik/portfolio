document
    .getElementById('contact-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        // Sélectionner l'élément pour afficher les messages d'état
        const statusMessage = document.getElementById('status-message');
        statusMessage.textContent = ''; // Réinitialiser le message

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); // Attendre que la réponse soit au format JSON
            console.log('Response:', data); // Log de la réponse
            
            if (response.ok) {
                // Affiche un message de succès
                statusMessage.textContent = 'Message envoyé avec succès!';
                statusMessage.style.color = 'green';

                // Réinitialise le formulaire
                e.target.reset();
            } else {
                // Affiche un message d'erreur (retour du serveur)
                console.error('Erreur du serveur:', data);
                statusMessage.textContent =
                    "Erreur lors de l'envoi du message.";
                statusMessage.style.color = 'red';
            }
        } catch (error) {
            // Affiche un message d'erreur réseau
            console.error('Erreur réseau :', error);
            statusMessage.textContent =
                "Erreur réseau lors de l'envoi du message.";
            statusMessage.style.color = 'red';
        }
    });
