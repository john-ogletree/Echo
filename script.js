// Main script file - Echo OS functionality
document.addEventListener('DOMContentLoaded', function() {
    // Generate current date version (YYYY.MM.DD format)
    function getCurrentDateVersion() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    // Update version numbers throughout the site
    function updateVersionNumbers() {
        const currentVersion = getCurrentDateVersion();
        
        // Update version in status bar
        const versionElement = document.getElementById('version-number');
        if (versionElement) {
            versionElement.textContent = currentVersion;
        }
        
        // Update version in navigation
        const navVersion = document.getElementById('nav-version');
        if (navVersion) {
            navVersion.textContent = currentVersion;
        }
        
        // Update version in sidebar
        const sidebarVersion = document.getElementById('sidebar-version');
        if (sidebarVersion) {
            sidebarVersion.textContent = currentVersion;
        }
    }

    // Update system time
    function updateSystemTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const systemTimeElement = document.getElementById('system-time');
        if (systemTimeElement) {
            systemTimeElement.textContent = timeString;
        }
    }

    // Initialize version numbers and system time
    updateVersionNumbers();
    updateSystemTime();
    setInterval(updateSystemTime, 1000);

    // Terminal command simulation
    const commands = [
        'system_info --status',
        'projects_list --active',
        'skills_db --query',
        'welcome_to_echo_os --boot',
        'recent_activity --monitor',
        'network_status --check',
        'storage_analytics --report',
        'performance_log --tail',
        'terminal_ready --prompt',
        'api_endpoints --list',
        'security_log --audit',
        'backup_status --verify',
        'system_update --check'
    ];

    let currentCommand = 0;
    const commandInput = document.getElementById('command-input');

    function simulateTerminal() {
        if (commandInput) {
            setInterval(() => {
                commandInput.innerHTML = commands[currentCommand] + '<span class="animate-pulse">_</span>';
                currentCommand = (currentCommand + 1) % commands.length;
            }, 3000);
        }
    }

    simulateTerminal();

    // Mobile-specific optimizations
    function handleMobileResize() {
        // Adjust layout for mobile
        if (window.innerWidth < 768) {
            // Mobile-specific adjustments
            document.body.style.minHeight = window.innerHeight + 'px';
        }
    }

    // Initial call and event listener
    handleMobileResize();
    window.addEventListener('resize', handleMobileResize);

    // System notification with current date version
    const currentVersion = getCurrentDateVersion();
    console.log(`
    ╔═══════════════════════════════════════╗
    ║            Echo OS ${currentVersion}           ║
    ║    Creative Operating System          ║
    ║        by John Ogletree               ║
    ║                                       ║
    ║  System initialized successfully      ║
    ║  All services running normally        ║
    ║  Ready for creative execution         ║
    ╚═══════════════════════════════════════╝
    `);
});
