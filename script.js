// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('top-bar-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const breadcrumbNav = document.getElementById('breadcrumb-nav');
    
    // Check if current page is index/home page
    function isIndexPage() {
        // You can modify this logic based on your routing
        // For now, we'll assume index page is when pathname is '/' or '/index.html'
        const path = window.location.pathname;
        return path === '/' || path === '/index.html' || path.endsWith('/');
    }
    
    // Show breadcrumb only if not on index page
    if (breadcrumbNav && !isIndexPage()) {
        breadcrumbNav.classList.remove('hidden');
    }
    
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
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 640) { // sm breakpoint
                sidebar.classList.add('-translate-x-full');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});
