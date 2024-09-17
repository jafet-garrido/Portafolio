document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      // Here you would typically send the data to your server
      // For now, we'll just simulate a successful submission
      setTimeout(() => {
        confirmationMessage.textContent = "Jafet Garrido te responderá en breve";
        confirmationMessage.style.display = 'block';
        form.reset();
      }, 1000);
      fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        confirmationMessage.textContent = "Jafet Garrido te responderá en breve";
        confirmationMessage.style.display = 'block';
        form.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        confirmationMessage.textContent = "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.";
        confirmationMessage.style.display = 'block';
      });
    });
  });