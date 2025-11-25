// Search functionality
const sidebarSearch = document.getElementById('sidebarSearch');
sidebarSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.trim().toLowerCase();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}\nThis would filter the navigation menu in a full implementation.`);
        }
    }
});

// Sidebar toggle functionality (if needed in the future)
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeSidebar = document.getElementById('closeSidebar');

function toggleSidebar() {
    if (sidebar && overlay) {
        sidebar.classList.toggle('translate-x-0');
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

// Initialize event listeners if elements exist
if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', toggleSidebar);
}

if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
}

// Command system functionality (if needed in the future)
const commandInput = document.getElementById('commandInput');

if (commandInput) {
    commandInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            this.value = '';
            
            switch(command) {
                case 'help':
                    alert('Available commands:\n- portfolio\n- about\n- contact\n- projects\n- resume\n- clear\n- menu');
                    break;
                case 'menu':
                    toggleSidebar();
                    break;
                case 'portfolio':
                    window.location.href = '/projects.html';
                    break;
                case 'about':
                    window.location.href = '/about.html';
                    break;
                case 'contact':
                    window.location.href = '/contact.html';
                    break;
                case 'clear':
                    // Clear terminal (you could implement this)
                    break;
                default:
                    if(command) {
                        alert(`Command not found: ${command}\nType 'help' for available commands.`);
                    }
            }
        }
    });

    // Focus command input on load
    commandInput.focus();
}

// Hero button functionality (if needed in the future)
const heroButtons = document.querySelectorAll('.hero-terminal button');
if (heroButtons.length > 0) {
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('initiate_project')) {
                window.location.href = '/contact.html';
            } else if (text.includes('access_console')) {
                toggleSidebar();
            }
        });
    });
}

// Particle system (if needed in the future)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle', 'absolute', 'w-1', 'h-1', 'bg-primary', 'rounded-full', 'shadow-glow', 'animate-float');
            
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
}

// Initialize particles when page loads (if needed)
window.addEventListener('load', function() {
    createParticles();
});

// Filter functionality for services and projects (if needed in the future)
const filterTags = document.querySelectorAll('.service-catagory-overview .filter-tag');
const serviceCards = document.querySelectorAll('.service-card');

if (filterTags.length > 0) {
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
}

const projectFilterTags = document.querySelectorAll('.projects-overview .filter-tag');
const projectCards = document.querySelectorAll('.project-card');

if (projectFilterTags.length > 0) {
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
}