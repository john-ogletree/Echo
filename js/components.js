// Component Loader
class ComponentLoader {
    constructor() {
        this.components = {};
    }

    async loadComponent(name, containerId) {
        try {
            const response = await fetch(`components/${name}.html`);
            const html = await response.text();
            
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
                this.components[name] = html;
                console.log(`✅ Loaded component: ${name}`);
            }
        } catch (error) {
            console.error(`❌ Failed to load component ${name}:`, error);
        }
    }

    async loadAllComponents() {
        await this.loadComponent('nav', 'nav-container');
        await this.loadComponent('sidebar', 'sidebar-container');
        await this.loadSections();
    }

    async loadSections() {
        const sections = [
            'dashboard',
            'system-info', 
            'services',
            'projects',
            'blog',
            'resume',
            'pricing',
            'contact'
        ];

        const sectionsContainer = document.getElementById('sections-container');
        if (!sectionsContainer) return;

        let sectionsHTML = '';
        
        for (const section of sections) {
            try {
                const response = await fetch(`components/sections/${section}.html`);
                const html = await response.text();
                sectionsHTML += html;
                console.log(`✅ Loaded section: ${section}`);
            } catch (error) {
                console.error(`❌ Failed to load section ${section}:`, error);
                sectionsHTML += `<section id="${section}" class="page-section"><div class="p-4"><h2>${section.replace('-', ' ')}</h2><p>Content loading failed.</p></div></section>`;
            }
        }

        sectionsContainer.innerHTML = sectionsHTML;
    }
}

// Initialize component loader
const componentLoader = new ComponentLoader();