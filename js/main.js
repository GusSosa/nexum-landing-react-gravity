document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }


    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = button.innerHTML;

            // Disable button and show loading state
            button.disabled = true;
            button.innerHTML = '<span>Enviando...</span>';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '¡Mensaje enviado correctamente! Te contactaremos pronto.';
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';
                    }
                    formStatus.classList.add('error');
                }
            } catch (error) {
                formStatus.textContent = 'Hubo un error de conexión. Por favor, verifica tu internet.';
                formStatus.classList.add('error');
            } finally {
                button.disabled = false;
                button.innerHTML = originalBtnText;
            }
        });
    }
});
