// Sélectionne le formulaire avec la classe "contact-form" et ajoute un gestionnaire d'événement "submit"
document.getElementById('contact-form').addEventListener('submit', async (e) => {
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
  
        if (response.ok) {
            alert('Сообщение отправлено!');
        } else {
            const errorData = await response.json();
            console.error(errorData);
            alert('Ошибка при отправке сообщения.');
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Ошибка при отправке сообщения.');
    }
  });
  
  
  