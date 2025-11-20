// Load navigation data from JSON and populate navigation elements
async function loadNavigation() {
    try {
        const response = await fetch('navigation.json');
        const navigationData = await response.json();
        
        // Populate sidebar navigation
        const sidebarNav = document.getElementById('sidebar-nav');
        if (sidebarNav) {
            sidebarNav.innerHTML = navigationData.pages.map(page => `
                <li><a href="${page.url}" title="${page.description}">${page.title}</a></li>
            `).join('');
        }
        
        // Populate footer navigation
        const footerNav = document.getElementById('footer-nav');
        if (footerNav) {
            footerNav.innerHTML = navigationData.footer.map(page => `
                <li><a href="${page.url}" data-i18n="">${page.title}</a></li>
            `).join('');
        }
        
        // Populate footer social links
        const footerSocial = document.getElementById('footer-social');
        if (footerSocial) {
            footerSocial.innerHTML = navigationData.social.map(social => `
                <a href="${social.url}" target="_blank" data-i18n="">${social.title}</a>
            `).join('');
        }
        
    } catch (error) {
        console.error('Error loading navigation data:', error);
        // Fallback to hardcoded navigation if JSON fails to load
        loadFallbackNavigation();
    }
}

// Fallback navigation in case JSON fails to load
function loadFallbackNavigation() {
    const sidebarNav = document.getElementById('sidebar-nav');
    if (sidebarNav) {
        sidebarNav.innerHTML = `
            <li><a href="/" title="Home">Home</a></li>
            <li><a href="/about.html" title="About Me">About Me</a></li>
            <li><a href="/services.html" title="Services">Services</a></li>
            <li><a href="/pricing.html" title="Pricing">Pricing</a></li>
            <li><a href="/projects.html" title="Projects">Projects</a></li>
            <li><a href="/resume.html" title="Resume">Resume</a></li>
            <li><a href="/contact.html" title="Contact Me">Contact Me</a></li>
            <li><a href="/blog.html" title="Blog">Blog</a></li>
            <li><a href="/fag.html" title="Frequently Asked Questions">Frequently Asked Questions</a></li>
            <li><a href="/vault.html" title="Vault">Vault</a></li>
        `;
    }
    
    const footerNav = document.getElementById('footer-nav');
    if (footerNav) {
        footerNav.innerHTML = `
            <li><a href="/" data-i18n="">Home</a></li>
            <li><a href="/about.html" data-i18n="">About Me</a></li>
            <li><a href="/services.html" data-i18n="">Services</a></li>
            <li><a href="/projects.html" data-i18n="">Projects</a></li>
            <li><a href="/resume.html" data-i18n="">Resume</a></li>
            <li><a href="/contact.html" data-i18n="">Contact Me</a></li>
        `;
    }
    
    const footerSocial = document.getElementById('footer-social');
    if (footerSocial) {
        footerSocial.innerHTML = `
            <a href="https://twitter.com/yourprofile" target="_blank" data-i18n="">Twitter</a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" data-i18n="">LinkedIn</a>
            <a href="https://github.com/yourprofile" target="_blank" data-i18n="">GitHub</a>
        `;
    }
}

// Sidebar Toggle Functionality
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
}

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
    if (!particlesContainer) return;
    
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

// Add scroll effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
});

// Initialize everything when page loads
window.addEventListener('load', function() {
    loadNavigation();
    createParticles();
});