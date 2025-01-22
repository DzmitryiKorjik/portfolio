document
    .getElementById('contact-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); // On attend que la réponse soit au format JSON

            if (response.ok) {
                alert('Message envoyé avec succès!');
            } else {
                console.error('Error from server:', data);
                alert("Erreur lors de l'envoi du message.");
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
            alert("Erreur lors de l'envoi du message.");
        }
    });
