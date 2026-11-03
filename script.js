// Mobile Menu Auto-Close & Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('change', () => {
      if (menuToggle.checked) {
        navLinks.classList.add('active');
      } else {
        navLinks.classList.remove('active');
      }
    });

    navAnchors.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.checked = false;
        navLinks.classList.remove('active');
      });
    });
  }

  // Initialize ScrollReveal
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      distance: '35px',
      duration: 800,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      reset: false
    });

    sr.reveal('.navbar', { origin: 'top', distance: '15px', duration: 600 });
    sr.reveal('.hero-left', { origin: 'left', delay: 150 });
    sr.reveal('.hero-right', { origin: 'right', delay: 250 });
    sr.reveal('.about-img', { origin: 'left', delay: 150 });
    sr.reveal('.about-content', { origin: 'right', delay: 200 });
    sr.reveal('.experience-card', { origin: 'bottom', interval: 150 });
    sr.reveal('.skills-section', { origin: 'bottom', delay: 100 });
    sr.reveal('.project-card', { origin: 'bottom', interval: 150 });
    sr.reveal('.contact-section', { origin: 'bottom', delay: 100 });
  }
});

// WhatsApp Message Handler
function sendWhatsApp() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  let formattedMessage = '';
  if (name || email || message) {
    formattedMessage = `Hi Amol,\n\nName: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nMessage: ${message || 'Would love to connect!'}`;
  } else {
    formattedMessage = `Hi Amol! 👋 I visited your Android Developer portfolio and would love to connect with you.`;
  }

  const phone = '918806827021';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(formattedMessage)}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Contact Form AJAX Submission Handler
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : '<i class="fas fa-paper-plane"></i> Send Email';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please complete all required fields.');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  }

  const formData = new FormData(form);
  const formAction = form.action || 'https://formsubmit.co/amolbagul947@gmail.com';

  fetch(formAction, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        alert('Thank you! Your email has been sent successfully.');
        form.reset();
      } else {
        alert('Could not submit form directly. Please reach out via WhatsApp at +91-8806827021 or email amolbagul947@gmail.com.');
      }
    })
    .catch(() => {
      alert('Network issue encountered. Please message directly on WhatsApp.');
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
}
