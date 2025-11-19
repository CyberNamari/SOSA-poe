// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainTitle = document.getElementById('main-title');
const tagline = document.getElementById('tagline');
const exploreBtn = document.getElementById('explore-btn');
const storyBtn = document.getElementById('story-btn');
const joinBtn = document.getElementById('join-btn');
const newsletterForm = document.getElementById('newsletter-form');
const toast = document.getElementById('toast');
const particleContainer = document.getElementById('particle-container');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Show welcome toast
        setTimeout(() => {
            showToast('Welcome to SOSA! Embrace your imperfections.');
        }, 500);
        
        // Initialize animations
        initScrollAnimations();
        createParticles();
        initButtonInteractions();
    }, 2000);
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(stat => {
        observer.observe(stat);
    });
}

// Animate counter numbers
function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current);
    }, 16);
}

// Create floating particles
function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 5;
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}vw`;
    particle.style.background = color;
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${animationDelay}s`;
    
    particleContainer.appendChild(particle);
    
    // Remove particle after animation and create new one
    setTimeout(() => {
        particle.remove();
        createParticle();
    }, animationDuration * 1000);
}

// Button interactions
function initButtonInteractions() {
    // Explore button
    exploreBtn.addEventListener('click', () => {
        animateButton(exploreBtn);
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 500);
    });
    
    // Story button
    storyBtn.addEventListener('click', () => {
        animateButton(storyBtn);
        setTimeout(() => {
            window.location.href = 'about us.html';
        }, 500);
    });
    
    // Join button
    joinBtn.addEventListener('click', () => {
        animateButton(joinBtn);
        showToast('Welcome to the SOSA family!');
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (validateEmail(email)) {
            animateButton(newsletterForm.querySelector('button'));
            showToast('Thanks for subscribing!');
            newsletterForm.reset();
        } else {
            showToast('Please enter a valid email address', 'error');
        }
    });
}

// Button animation
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast';
    
    if (type === 'error') {
        toast.style.backgroundColor = '#e74c3c';
    } else if (type === 'success') {
        toast.style.backgroundColor = '#2ecc71';
    } else {
        toast.style.backgroundColor = '#1a1a1a';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateX(50px) translateY(${scrolled * 0.1}px)`;
    }
});

// Mouse move effect for header
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    const header = document.querySelector('.main-header');
    if (header) {
        header.style.backgroundPosition = `${x}% ${y}%`;
    }
});

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);