function learnMore(){
    alert("Welcome to FehmYanga Enterprise Farm!");
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        const button = form.querySelector('button[type="submit"]');
        const origText = button ? button.textContent : 'Send Message';
        if (button) { button.disabled = true; button.textContent = 'Sending...'; }

        try {
            const res = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                alert('Message sent — thank you!');
                form.reset();
            } else {
                alert('Failed to send message. Please try again later.');
                console.error(result);
            }
        } catch (err) {
            alert('Error sending message. See console for details.');
            console.error(err);
        } finally {
            if (button) { button.disabled = false; button.textContent = origText; }
        }
    });
});