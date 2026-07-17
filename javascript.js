// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu after tapping a link (mobile)
        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Contact form
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    // Uses the same host as the page when deployed together; falls back to
    // localhost:3000 for local development where frontend and backend are
    // served separately.
    const API_URL = window.location.hostname && window.location.hostname !== 'localhost'
        ? '/api/contact'
        : 'http://localhost:3000/api/contact';

    const setStatus = (message, type) => {
        if (!status) return;
        status.textContent = message;
        status.className = 'form-status' + (type ? ` ${type}` : '');
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        if (!data.name || !data.email || !data.message) {
            setStatus('Please fill in every field before sending.', 'error');
            return;
        }

        const button = form.querySelector('button[type="submit"]');
        const originalText = button ? button.textContent : 'Send message';
        if (button) {
            button.disabled = true;
            button.textContent = 'Sending...';
        }
        setStatus('', '');

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (result.success) {
                setStatus('Message sent — thank you! We\u2019ll get back to you soon.', 'success');
                form.reset();
            } else {
                setStatus('Something went wrong sending your message. Please try again.', 'error');
                console.error(result);
            }
        } catch (err) {
            setStatus('Could not reach the server. Please try again later.', 'error');
            console.error(err);
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = originalText;
            }
        }
    });
});
