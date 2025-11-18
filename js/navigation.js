// Navigation functionality
function initializeNavigation() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.getElementById('top-bar-sidebar');
    
    // Initialize section tracking
    initializeSectionTracking();
    
    // Sidebar toggle
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Mobile menu button
    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar on mobile link click
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    sidebar.classList.add('-translate-x-full');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Touch gestures
    initializeTouchGestures();
}

function toggleSidebar() {
    const sidebar = document.getElementById('top-bar-sidebar');
    if (!sidebar) return;
    
    const isOpen = !sidebar.classList.contains('-translate-x-full');
    
    if (isOpen) {
        sidebar.classList.add('-translate-x-full');
        document.body.style.overflow = 'auto';
    } else {
        sidebar.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden';
    }
}

function handleOrientationChange() {
    const sidebar = document.getElementById('top-bar-sidebar');
    if (!sidebar) return;
    
    if (window.innerWidth >= 768) {
        sidebar.classList.remove('-translate-x-full');
        document.body.style.overflow = 'auto';
    }
    
    updateActiveSection();
}

function initializeSectionTracking() {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('nav a, aside a');
    const breadcrumbNav = document.getElementById('breadcrumb-nav');
    
    function updateActiveSection() {
        let currentSection = 'dashboard';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('bg-neutral-tertiary', 'text-fg-brand');
            link.classList.add('text-body');
            
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('bg-neutral-tertiary', 'text-fg-brand');
                link.classList.remove('text-body');
            }
        });
        
        // Update breadcrumb
        updateBreadcrumb(currentSection);
    }
    
    function updateBreadcrumb(sectionId) {
        if (!breadcrumbNav) return;
        
        const sectionName = sectionId.replace('-', ' ');
        const breadcrumbOl = breadcrumbNav.querySelector('ol');
        
        breadcrumbOl.innerHTML = `
            <li class="inline-flex items-center">
                <a href="#dashboard" class="inline-flex items-center text-xs xs:text-sm font-medium text-body hover:text-fg-brand">
                    <svg class="w-3 h-3 xs:w-4 xs:h-4 me-1 xs:me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                    </svg>
                    root@
                </a>
            </li>
            <li>
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 xs:w-4 xs:h-4 text-fg-disabled mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                    <a href="#${sectionId}" class="ms-1 text-xs xs:text-sm font-medium text-body hover:text-fg-brand md:ms-2">system</a>
                </div>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 xs:w-4 xs:h-4 text-fg-disabled mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                    <span class="ms-1 text-xs xs:text-sm font-medium text-heading md:ms-2">${sectionName}</span>
                </div>
            </li>
        `;
        
        breadcrumbNav.classList.remove('hidden');
    }
    
    // Initialize
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
}

function initializeTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        const sidebar = document.getElementById('top-bar-sidebar');

        if (!sidebar) return;

        // Swipe right to open sidebar (only on mobile)
        if (swipeDistance > swipeThreshold && window.innerWidth < 768) {
            sidebar.classList.remove('-translate-x-full');
            document.body.style.overflow = 'hidden';
        }
        
        // Swipe left to close sidebar
        if (swipeDistance < -swipeThreshold && window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
            document.body.style.overflow = 'auto';
        }
    }

    // Add touch event listeners
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}