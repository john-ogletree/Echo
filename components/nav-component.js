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
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
                root@
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

    // Highlight current page in sidebar
    function highlightCurrentPage() {
        const sidebar = document.getElementById('top-bar-sidebar');
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
