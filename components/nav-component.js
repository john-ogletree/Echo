// Load navigation component
document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation component
    fetch('components/nav-component.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-component').innerHTML = data;
            
            // Initialize navigation functionality after component is loaded
            initializeNavigation();
        })
        .catch(error => {
            console.error('Error loading navigation component:', error);
        });
});

// Initialize navigation functionality
function initializeNavigation() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('top-bar-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const breadcrumbNav = document.getElementById('breadcrumb-nav');
    
    // Check if current page is index/home page
    function isIndexPage() {
        const path = window.location.pathname;
        return path === '/' || path === '/index.html' || path.endsWith('/');
    }
    
    // Generate breadcrumb based on current page
    function generateBreadcrumb() {
        if (!breadcrumbNav) return;
        
        const path = window.location.pathname;
        const breadcrumbOl = breadcrumbNav.querySelector('ol');
        
        // Clear existing breadcrumb
        breadcrumbOl.innerHTML = '';
        
        // Always start with Home
        const homeLi = document.createElement('li');
        homeLi.className = 'inline-flex items-center';
        homeLi.innerHTML = `
            <a href="/" class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"/>
                </svg>
                Home
            </a>
        `;
        breadcrumbOl.appendChild(homeLi);
        
        // Add breadcrumb items based on current path
        const pathSegments = path.split('/').filter(segment => segment);
        
        pathSegments.forEach((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1);
            const segmentPath = '/' + pathSegments.slice(0, index + 1).join('/');
            
            // Add separator
            const separator = document.createElement('li');
            separator.innerHTML = `
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-4 h-4 text-fg-disabled mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                    ${isLast ? 
                        `<span class="ms-1 text-sm font-medium text-heading md:ms-2">${segmentName}</span>` :
                        `<a href="${segmentPath}" class="ms-1 text-sm font-medium text-body hover:text-fg-brand md:ms-2">${segmentName}</a>`
                    }
                </div>
            `;
            breadcrumbOl.appendChild(separator);
        });
        
        // Show breadcrumb if not on index page
        if (!isIndexPage()) {
            breadcrumbNav.classList.remove('hidden');
        }
    }
    
    // Generate breadcrumb
    generateBreadcrumb();
    
    // Toggle sidebar on mobile
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener('click', function() {
            const isOpen = !sidebar.classList.contains('-translate-x-full');
            
            if (isOpen) {
                // Close sidebar
                sidebar.classList.add('-translate-x-full');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                // Open sidebar
                sidebar.classList.remove('-translate-x-full');
                sidebarOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close sidebar when clicking on a link (mobile)
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 640) { // sm breakpoint
                    sidebar.classList.add('-translate-x-full');
                    if (sidebarOverlay) {
                        sidebarOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // Highlight current page in sidebar
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const sidebarLinks = sidebar.querySelectorAll('a');
        
        sidebarLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
                link.classList.add('bg-neutral-tertiary', 'text-fg-brand');
                link.classList.remove('text-body');
            }
        });
    }
    
    highlightCurrentPage();
}
