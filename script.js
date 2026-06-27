// ===========================
// NAVBAR: Scroll shrink + hamburger
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.padding = '0.6rem 2.5rem';
    navbar.style.background = 'rgba(10,10,18,0.95)';
  } else {
    navbar.style.padding = '1rem 2.5rem';
    navbar.style.background = 'rgba(10,10,18,0.7)';
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===========================
// SMOOTH ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#a855f7';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

// ===========================
// SKILL BAR ANIMATION
// ===========================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===========================
// ADD REVEAL CLASS DYNAMICALLY
// ===========================
document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .section-title, .section-label, .contact-sub, .contact-wrapper, .stat'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===========================
// CONTACT FORM VALIDATION
// ===========================
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const error = document.getElementById('error');
  const btn = document.getElementById('submitBtn');

  // Reset
  error.className = '';
  error.style.display = 'none';

  if (name === '' || email === '' || message === '') {
    error.textContent = '⚠ Please fill in all fields before sending.';
    error.className = 'show-error';
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.textContent = '⚠ Please enter a valid email address.';
    error.className = 'show-error';
    return false;
  }

  // Success
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    error.textContent = '✓ Your message was sent successfully! I\'ll get back to you soon.';
    error.className = 'show-success';
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    document.getElementById('contactForm').reset();
  }, 1000);

  return false;
}
