// Sélectionne le formulaire avec l'ID "contact-form" et ajoute un gestionnaire d'événement "submit"
document
    .getElementById('contact-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
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

            console.log(response);

            if (response.ok) {
                alert('Message envoyé avec succès !');
            } else {
                const errorData = await response.json();
                console.error(errorData);
                alert("Erreur lors de l'envoi du message.");
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
            alert("Erreur lors de l'envoi du message.");
        }
    });
