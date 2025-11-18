// Main script file - Echo OS functionality
document.addEventListener('DOMContentLoaded', function() {
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

    // Initialize system time
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

    // System notification
    console.log(`
    ╔═══════════════════════════════════════╗
    ║            Echo OS v2.1.4             ║
    ║    Creative Operating System          ║
    ║        by John Ogletree               ║
    ║                                       ║
    ║  System initialized successfully      ║
    ║  All services running normally        ║
    ║  Ready for creative execution         ║
    ╚═══════════════════════════════════════╝
    `);
});
