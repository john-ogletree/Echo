// Sidebar Toggle Functionality
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

hamburger.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

// Filter functionality for services
const filterTags = document.querySelectorAll('.service-catagory-overview .filter-tag');
const serviceCards = document.querySelectorAll('.service-card');

filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
        filterTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        serviceCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Filter functionality for projects
const projectFilterTags = document.querySelectorAll('.projects-overview .filter-tag');
const projectCards = document.querySelectorAll('.project-card');

projectFilterTags.forEach(tag => {
    tag.addEventListener('click', function() {
        projectFilterTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Create floating particles for hero section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Add scroll effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
});