/**
 * SubNav Component
 *
 * Vertical side navigation with content panel.
 *
 * Features:
 * - Smooth transitions between sections
 * - Active state management
 * - Full light/dark mode support
 * - Accessible keyboard navigation
 *
 * @author Austin Steil
 * @version 1.0.0
 */

class SubNav {
    /**
     * Initialize the SubNav component
     * @param {Object} config - Configuration object
     * @param {string} config.containerId - ID of the container element
     * @param {Array} config.sections - Array of section objects with {id, title, content}
     * @param {string} config.defaultSection - ID of the default active section (optional)
     */
    constructor(config) {
        this.containerId = config.containerId;
        this.sections = config.sections || [];
        this.defaultSection = config.defaultSection || (this.sections[0]?.id);
        this.activeSection = this.defaultSection;
        
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`SubNav container with ID "${this.containerId}" not found`);
            return;
        }
        
        this.render();
        this.init();
    }
    
    /**
     * Render the SubNav HTML structure
     */
    render() {
        this.container.innerHTML = `
            <div class="subnav-wrapper">
                <!-- Side Navigation -->
                <nav class="subnav-sidebar" role="navigation" aria-label="Section navigation">
                    <ul class="subnav-list">
                        ${this.sections.map(section => `
                            <li class="subnav-item">
                                <button
                                    class="subnav-link ${section.id === this.activeSection ? 'active' : ''}"
                                    data-section="${section.id}"
                                    role="tab"
                                    aria-selected="${section.id === this.activeSection}"
                                    aria-controls="subnav-content-${section.id}">
                                    ${section.title}
                                </button>
                            </li>
                        `).join('')}
                    </ul>
                </nav>

                <!-- Content Panel -->
                <div class="subnav-content-panel">
                    ${this.sections.map(section => `
                        <div
                            id="subnav-content-${section.id}"
                            class="subnav-content ${section.id === this.activeSection ? 'active' : ''} ${section.noPadding ? 'no-padding' : ''}"
                            role="tabpanel"
                            aria-labelledby="subnav-link-${section.id}">
                            ${section.hideTitle ? '' : `<h2 class="subnav-content-title">${section.title}</h2>`}
                            <div class="subnav-content-body ${section.noPadding ? 'no-padding' : ''}">
                                ${typeof section.content === 'function' ? section.content() : section.content}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    /**
     * Initialize event listeners
     */
    init() {
        // Side navigation click handlers
        const sideNavLinks = this.container.querySelectorAll('.subnav-link');
        sideNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const sectionId = e.currentTarget.dataset.section;
                this.switchSection(sectionId);
            });
        });

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    /**
     * Switch to a specific section
     * @param {string} sectionId - ID of the section to activate
     */
    switchSection(sectionId) {
        if (this.activeSection === sectionId) return;

        // Update side navigation
        const sideNavLinks = this.container.querySelectorAll('.subnav-link');
        sideNavLinks.forEach(link => {
            const isActive = link.dataset.section === sectionId;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-selected', isActive);
        });

        // Update content panels
        const contentPanels = this.container.querySelectorAll('.subnav-content');
        contentPanels.forEach(panel => {
            const isActive = panel.id === `subnav-content-${sectionId}`;
            panel.classList.toggle('active', isActive);
        });

        this.activeSection = sectionId;

        // Emit custom event
        this.container.dispatchEvent(new CustomEvent('sectionchange', {
            detail: { sectionId }
        }));
    }
    
    /**
     * Setup keyboard navigation for accessibility
     */
    setupKeyboardNavigation() {
        const sideNavLinks = this.container.querySelectorAll('.subnav-link');
        
        sideNavLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                let targetIndex = index;
                
                switch(e.key) {
                    case 'ArrowUp':
                        targetIndex = index > 0 ? index - 1 : sideNavLinks.length - 1;
                        e.preventDefault();
                        break;
                    case 'ArrowDown':
                        targetIndex = index < sideNavLinks.length - 1 ? index + 1 : 0;
                        e.preventDefault();
                        break;
                    case 'Home':
                        targetIndex = 0;
                        e.preventDefault();
                        break;
                    case 'End':
                        targetIndex = sideNavLinks.length - 1;
                        e.preventDefault();
                        break;
                    default:
                        return;
                }
                
                sideNavLinks[targetIndex].focus();
                this.switchSection(sideNavLinks[targetIndex].dataset.section);
            });
        });
    }
    

    
    /**
     * Get the currently active section ID
     * @returns {string} Active section ID
     */
    getActiveSection() {
        return this.activeSection;
    }
    
    /**
     * Programmatically set the active section
     * @param {string} sectionId - ID of the section to activate
     */
    setActiveSection(sectionId) {
        this.switchSection(sectionId);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubNav;
}

