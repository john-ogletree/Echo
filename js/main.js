// Main application initialization
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Initializing Echo OS...');
    
    // Load all components
    await componentLoader.loadAllComponents();
    
    // Initialize navigation
    if (typeof initializeNavigation === 'function') {
        initializeNavigation();
    }
    
    // Initialize system functions
    initializeSystem();
    
    console.log('✅ Echo OS initialized successfully');
});

// System functions
function initializeSystem() {
    updateVersionNumbers();
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
    simulateTerminal();
    
    // System notification
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
}

// System utilities
function getCurrentDateVersion() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

function updateVersionNumbers() {
    const currentVersion = getCurrentDateVersion();
    
    const versionElements = [
        document.getElementById('version-number'),
        document.getElementById('nav-version'),
        document.getElementById('sidebar-version')
    ];
    
    versionElements.forEach(element => {
        if (element) element.textContent = currentVersion;
    });
}

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

function simulateTerminal() {
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

    if (commandInput) {
        setInterval(() => {
            commandInput.innerHTML = commands[currentCommand] + '<span class="animate-pulse">_</span>';
            currentCommand = (currentCommand + 1) % commands.length;
        }, 3000);
    }
}