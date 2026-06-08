// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Show confirmation message
        const confirmMsg = document.createElement('p');
        confirmMsg.style.color = '#0066cc';
        confirmMsg.style.marginTop = '10px';
        confirmMsg.style.padding = '8px 12px';
        confirmMsg.style.backgroundColor = '#f0f0f0';
        confirmMsg.style.borderLeft = '3px solid #0066cc';
        confirmMsg.textContent = 'Thank you for subscribing! Check your email for confirmation.';
        
        this.parentElement.appendChild(confirmMsg);
        emailInput.value = '';
        
        // Remove message after 5 seconds
        setTimeout(() => confirmMsg.remove(), 5000);
    });
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const message = this.querySelector('#message').value;
        
        // Show confirmation message
        const confirmMsg = document.createElement('p');
        confirmMsg.style.color = '#0066cc';
        confirmMsg.style.marginTop = '15px';
        confirmMsg.style.padding = '10px 12px';
        confirmMsg.style.backgroundColor = '#f0f0f0';
        confirmMsg.style.borderLeft = '3px solid #0066cc';
        confirmMsg.textContent = 'Thank you for your message! We will get back to you soon.';
        
        this.parentElement.appendChild(confirmMsg);
        this.reset();
        
        // Remove message after 6 seconds
        setTimeout(() => confirmMsg.remove(), 6000);
    });
}

// Add active state to navigation based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '#0066cc';
        link.style.fontWeight = 'normal';
        const href = link.getAttribute('href');
        if (href === '#' + current) {
            link.style.color = '#004499';
            link.style.fontWeight = 'bold';
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Call on page load

// Accessibility: Focus management
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open elements if needed
        document.activeElement.blur();
    }
});

// Skip to main content link for accessibility
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.background = '#0066cc';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px 12px';
    skipLink.style.zIndex = '100';
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', addSkipLink);
